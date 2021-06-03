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

  const handleClickClone = () => {
    apiCICD.post('clone', { repositoryUrl : inputRepUrl })
      .then(response => {
        console.log(response.data);
      });
  };

  const handleClickProject = (repo) => {
    //localStorage.setItem('project', repo);
    apiCICD.post('selectRepo', { repo });
    setPage('menu-desenvolver');
  }

  const handleClickRepository = async () => {
    const response = await apiCICD.get('myRepos');
    setMyRepos(response.data);

    setOpenModal('repos');
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
                <input type="text" placeholder="" id="repositoryUrl" value={inputRepUrl} onChange={(e) => setInputRepUrl(e.target.value)}/>
                <button onClick={ handleClickClone }>Clonar!</button>
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
          Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi.
          Mauris aliquet nunc non turpis scelerisque, eget. Suco de cevadiss deixa
          as pessoas mais interessantis. Detraxit consequat et quo num tendi nada.
          Interagi no mé, cursus quis, vehicula ac nisi.
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
