import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import apiCICD from '../../services/apiCICD';
import cdFile from '../../assets/CI';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function StartPage({ setPage }) {
  const classes = useStyles();
  const [myRepos, setMyRepos] = useState([]);
  const [inputRepUrl, setInputRepUrl] = useState('');
  const [openModal, setOpenModal] = useState('');
  const [ciFileInput, setCiFileInput] = useState(cdFile);
  const [formConfigInfo, setFormConfigInfo] = useState({
    ip: '',
    first_time_commands: '',
    commands: '',
  });

  const handleClickClone = () => {
    apiCICD.post('clone', { repositoryUrl: inputRepUrl })
      .then(({ data }) => {
        console.log(data)
        apiCICD.post('isRepoConfig', { repoName: data.repoName }).then(({ data }) => {
          if (data) {
            setOpenModal('');
          }
          else {
            setOpenModal('config');
          }
        });
      });
    
    apiCICD.get('/auth');
  };

  useEffect(() => {
    let file = cdFile;
    file = file.replace(/\$replaceIPHere/, formConfigInfo.ip);
    file = file.replace(/\$repoHere/, inputRepUrl);
    file = file.replace(/\$firstHere/, JSON.stringify([formConfigInfo.first_time_commands]));
    file = file.replace(/\$commandsHere/, JSON.stringify([formConfigInfo.commands]));
    setCiFileInput(file);
  }, [formConfigInfo, inputRepUrl]);

  const handleClickProject = (repo) => {
    apiCICD.post('selectRepo', { repo });
    setPage('menu-desenvolver');
  };

  const handleClickRepository = async () => {
    const response = await apiCICD.get('myRepos');
    setMyRepos(response.data);

    setOpenModal('repos');
  };

  const handleChangeConfig = (({ target: { name, value }}) => {
    setFormConfigInfo((lastState) => ({...lastState, [name]: value}));
  });

  const handleClickConfigRepo = () => {
    apiCICD.post('configRepo', { data: ciFileInput }).then(({ data }) => {
      setOpenModal('');
    });
  }

  const renderModal = () => {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openModal}
        onClose={() => setOpenModal('')}
        className={classes.modal}
      >
        <div className={classes.paper}>
          {
            openModal === 'clone' ?
              <>
                <h2>Clonar repositório</h2>
                <input type="text" placeholder="Url repositório" id="repositoryUrl" value={inputRepUrl} onChange={(e) => setInputRepUrl(e.target.value)}/>
                <button onClick={ handleClickClone }>Clonar!</button>
              </>
              : ( openModal === 'config' ?
                <>
                  <h2>Configurar repositório</h2>
                  <TextareaAutosize value={ciFileInput} onChange={(e) => setCiFileInput(e.target.value)} style={{width: '600px'}} /><br/>
                  <input type="text" name="ip" value={formConfigInfo.ip} placeholder="IP (com pontuação) ou URL" onChange={ handleChangeConfig } />
                  <input type="text" name="first_time_commands" value={formConfigInfo.first_time_commands} placeholder="Prieiros comandos (separados por ,)" onChange={ handleChangeConfig } />
                  <input type="text" name="commands" value={formConfigInfo.commands} placeholder="Comandos (separados por ,)" onChange={ handleChangeConfig } />

                  <button onClick={ handleClickConfigRepo }>Configurar</button>
                </>
                :
                <>
                  <h2>Selecionar repositório</h2>
                  <ul>
                    {myRepos.map(repo =>
                      <>
                        <li key={repo}>
                          <button onClick={ () => handleClickProject(repo) }>{repo}</button>
                        </li>
                      </>
                    )
                    }
                  </ul>
                </>
              )
          }
        </div>
      </Modal>
    );
  }

  return(
    <main>
      <h1><FaRocket/> Bem vindo ao [DevTools]</h1>
      <p>
        <b>
          Você pode selecionar um repositório já existente
          ou clonar um diretamente do GitHub via HTTPS!
        </b>
      </p>


      <button onClick={handleClickRepository}>Selecionar um repositório</button>
      <br/>
      <button onClick={() => setOpenModal('clone')}>Clonar repositório</button>

      {/*
        Após abrir um projeto, verificar se o mesmo já está configurado.
            caso não, é inicializado o assistente de configuração.
        Estando configurado, o usuario é direcionado para a pagina de desenvolvimento.
      */}


      {/* <button
        onClick={async () => {
          const result = await CustomDialog(
            <CustomDialogContent />,
            {
              title: 'Custom Dialog',
              showCloseIcon: true,
              isBodyScrollLocked: false,
              replaceScrollBar: false,
            }
          );
        }}
      >
        Custom
      </button> */}

      { renderModal() }

    </main>
  );
}
export default StartPage;
