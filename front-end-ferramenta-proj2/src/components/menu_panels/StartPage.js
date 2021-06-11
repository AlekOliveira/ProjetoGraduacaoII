import React, { useState } from 'react';
import { FaRocket } from 'react-icons/fa';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import apiCICD from '../../services/apiCICD';

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
  const [formConfigInfo, setFormConfigInfo] = useState({
    ip: '',
    first_time_commands: '',
    commands: '',
  });

  const handleClickClone = () => {
    apiCICD.post('clone', { repositoryUrl : inputRepUrl })
      .then(({ data }) => {
        console.log(data)
        apiCICD.post('isRepoConfig', { repoName: data.repoName }).then(({ data }) => {
          if(data) {
            setOpenModal('');
          }
          else {
            setOpenModal('config');
          }
        });
      });
  };

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
    const data = { ...formConfigInfo };
    data.repository = inputRepUrl;

    apiCICD.post('configRepo', { data }).then(({ data }) => {
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
                  <input id="ip" name="ip" onChange={ handleChangeConfig } value={ formConfigInfo.ip }/>
                  <input id="first_time_commands" name="first_time_commands" onChange={ handleChangeConfig } value={ formConfigInfo.first_time_commands }/>
                  <input id="commands" name="commands" onChange={ handleChangeConfig } value={ formConfigInfo.commands }/>
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
