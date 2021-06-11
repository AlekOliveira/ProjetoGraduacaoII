const express = require('express');
const cors = require('cors');
const shell = require('shelljs');
const pathResolve = require('path');
const hasYarn = require('has-yarn');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//cwd - current working directory
let cwd = '';
let featureName = '';
let currentBranch = '';
let currentRepo = '';
const reposPath = pathResolve.join(__dirname, '..\\repos');

// ROUTES
// app.post('/deleteLocalBranch', (request, response) => {
//   name = request.body.branchName;
//   shell.exec(`git branch -D ${name}`);
  
//   git branch -d currentBranch
//   git branch -D currentBranch -> force branch removal

//   return response.json();
// });


app.post('/isRepoConfig', (req, res) => {
  const repoUrl = pathResolve.resolve(reposPath, currentRepo, '.github', 'workflows', 'config.json');
  res.send(fs.existsSync(repoUrl));
});

app.get('/myRepos', (req, res) => {
  if(!fs.existsSync(reposPath)) {
    shell.mkdir(reposPath);
  }
  shell.cd(reposPath);

  return res.json(shell.ls());
});

app.post('/switchBranch', (request, response) => {
  //validar caso tenha unstaged changes.
  //pode ser resolvido usando um stash ou stash com discard
  
  currentBranch = request.body.branchName;  
  shell.exec(`git checkout ${currentBranch}`);

  return response.json();
});

app.get('/openVscode', (req, res) => {
  const cmd = 'code .';
  shell.exec(cmd);

  return res.json();
});

app.post('/configRepo', async (request, response) => {  
  console.log(cwd);
  const { data } = request.body;
  //add tudo na branch principal. na primeira config
  // add && push
  let command = '';  
  
  /**
   * 1-verifica qual gerenciador de dependencias o projeto utiliza
   * 2-instala o framework jest para npm ou yarn
   */  
  await shell.cd(cwd);
  if(hasYarn(cwd)) {
    //console.log('este projeto utiliza yarn');
    shell.exec('yarn add jest -D');
  } else {
    //console.log('este projeto utiliza npm');
    shell.exec('npm i -D jest');
  }

  /**Cria um diretório com um teste de exemplo */
  shell.cd('src');
  shell.mkdir('_tests_');
  shell.cd('_tests_');
  const testFilesPath = pathResolve.join(__dirname, '..\\testFiles');
  command = `copy ${testFilesPath} ${shell.dirs()}`;
  shell.exec(command);
  /**Cria um diretório com um teste de exemplo */ 

  shell.cd(cwd);

  //config CI workflows  
  shell.mkdir('.github');
  shell.cd('.github');
  shell.mkdir('workflows'); 
  shell.cd('workflows');

  const workflowFilesPath =
    hasYarn(cwd) ?
      pathResolve.join(__dirname, '..\\workflowFiles\\yarn')
      :
      pathResolve.join(__dirname, '..\\workflowFiles\\npm');

  let cdFile = fs.readFileSync(pathResolve.resolve(__dirname, '../workflowFiles', 'autoDeploy', 'cd.yml')).toString();
  cdFile = cdFile.replace(/\$replaceDataHere/, JSON.stringify(data));
  cdFile = cdFile.replace(/\$replaceIPHere/, data.ip);

  fs.writeFileSync(pathResolve.resolve(shell.dirs()[0], 'cd.yml'), cdFile);
  fs.writeFileSync(pathResolve.resolve(shell.dirs()[0], '../config.json'), JSON.stringify({}));
  command = `copy ${workflowFilesPath} ${shell.dirs()}`; // NAO FUNCIONA NO LINUX 
  shell.exec(command);
  //config CI workflows 

  shell.cd(cwd);

  shell.exec('git add *');
  shell.exec('git commit -m "config repo"');
  shell.exec('git push origin master');

  return response.json();
});

app.post('/clone', (request, response) => {
  shell.cd(reposPath);
  shell.exec(`git clone ${request.body.repositoryUrl}`);
  //entrar na pasta do repo clonado?
  const repoNameSplit = request.body.repositoryUrl.split('/');
  const repoName = repoNameSplit[repoNameSplit.length - 1].replace(/.git/, '');
  cwd = pathResolve.join(__dirname, '..\\repos', repoName);
  return response.json({ repoName });
});

// app.post('/changePath', (request, response) => {   
//   cwd = request.body.path; //path = path.concat('\\.git');
//   shell.cd(cwd);

//   return response.json(shell.ls());
// });

app.post('/selectRepo', (req, res) => { 
  cwd = pathResolve.join(__dirname, '..\\repos', req.body.repo);
  shell.cd(cwd);

  return res.json(shell.ls());
});

app.post('/newFeature', (request, response) => {
  currentBranch = request.body.featureName;   
  shell.exec('git pull');
  shell.exec(`git checkout -b ${currentBranch}`);

  return response.json();
});

app.post('/sendChanges', (request, response) => {
  const commitMessage = request.body.commitMessage;
  //const description = request.body.description;  
  
  //git status
  shell.exec('git add -A');
  shell.exec(`git commit -m "${commitMessage}"`);
  shell.exec(`git push --set-upstream origin ${currentBranch}`);
  shell.exec(`gh pr create --title "${commitMessage}" --body "pull request body"`);
  shell.exec(`gh pr merge ${currentBranch} --auto -d -m`); 
  
  return response.json();
});

app.get('/repoBranches', (req, res) =>{
  // let repos = shell.exec('git branch -a');
  // repos = repos.replace(/remotes\/origin\/master/g, '')
  // .replace(/  origin\//g, '')
  // .replace(/  remotes\/origin\//g, '')
  // .replace(/HEAD -> origin\/master/g, '');
  // repos = repos.split('\n'); //split the branches
  // repos = repos.filter(r => r !== '');
  // repos.pop();

  // let repos = shell.exec('git branch -r');
  // repos = repos.replace(/  origin\//g, ''); //remove ' origin/' 
  // repos = repos.split('\n'); //split the branches 
  // repos.splice(0,1); //remove origin/HEAD -> origin/main string 
  // repos.pop(); //remove element with empty string
  // repos.reverse(); //put branch 'main' in first place

  let repos = shell.exec('git branch -a');
  repos = repos.replace(/ /g, '')
  .replace('*', '')
  .replace(/remotes\/origin\//g, '')
  .replace(/HEAD->origin\/master/g, '')
  .replace(/HEAD->origin\/main/g, '');

  repos = repos.split('\n'); //split the branches 
  repos = repos.filter(r => r !== '');
  repos = [...new Set(repos)];
  repos.reverse();
  
  return res.json(repos);
});

app.get('/auth', (req, res) =>{
  shell.exec('gh auth login -w');
  shell.exit(1);


  return res.json('OK');
});
// ROUTES

app.listen(3333, () => {
  console.log('🚀 Back-end started')
});