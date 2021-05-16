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
const reposPath = pathResolve.join(__dirname, '..\\repos');

// ROUTES
// app.post('/deleteLocalBranch', (request, response) => {
//   name = request.body.branchName;
//   shell.exec(`git branch -D ${name}`);
  
//   git branch -d currentBranch
//   git branch -D currentBranch -> force branch removal

//   return response.json();
// });

app.get('/myRepos', (req, res) => {
  if(!fs.existsSync(reposPath)) {
    shell.mkdir(reposPath);
  }
  shell.cd(reposPath);

  return res.json(shell.ls());
});

app.post('/switchBranch', (request, response) => {
  //validar caso tenha unstaged changes.
  //pode ser resolvido com um git discard || git commit.
  currentBranch = request.body.branchName;
  shell.exec(`git checkout ${currentBranch}`);

  return response.json();
});

app.get('/openVscode', (req, res) => {
  const cmd = 'code .';
  shell.exec(cmd);
  
  return res.json();
});

app.get('/configRepo', (request, response) => {  
  console.log(cwd);
  //add tudo na branch principal. na primeira config
  // add && push
  let command = '';  
  
  /**
   * 1-verifica qual gerenciador de dependencias o projeto utiliza
   * 2-instala o framework jest para npm ou yarn
   */  
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
  
  command = `copy ${workflowFilesPath} ${shell.dirs()}`;
  shell.exec(command);
  //config CI workflows 

  shell.cd(cwd);

  return response.json();
});

app.post('/clone', (request, response) => {
  shell.cd(reposPath);
  shell.exec(`git clone ${request.body.repositoryUrl}`);
  //entrar na pasta do repo clonado?  
  
  return response.json();
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
  /** 
   * * 'git branch -r' show all remote branchs 
   * *  when you don't have a remote branch in your project and uses the 
   * * 'git checkout +remoteBranchName' command, a new local branch is created 
   * *  and git sets up to track the existing remote branch. 
   * */

  shell.exec('git branch -r');
  let repos = shell.exec('git branch -r'); 
  repos = repos.replace(/  origin\//g, ''); //remove ' origin/' 
  repos = repos.split('\n'); //split the branches 
  repos.splice(0,1); //remove origin/HEAD -> origin/main string 
  repos.splice(-1,1); //remove element with empty string
  repos.reverse(); //put branch 'main' in first place
  
  return res.json(repos); 
});
// ROUTES

app.listen(3333, () => {
  console.log('🚀 Back-end started')
});