import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { CustomDialog, useDialog } from 'react-st-modal';

import apiCICD from '../../services/apiCICD';

function StartPage({ setPage }) {
  const [myRepos, setMyRepos] = useState([]);
  const [inputRepUrl, setInputRepUrl] = useState('');

  const handleClickClone = () => {
    const repositoryUrl = document.getElementById('repositoryUrl').value;
    console.log(repositoryUrl);
    apiCICD.post('clone', { repositoryUrl })
      .then(response => {
        console.log(response.data);
      });
  };

  const handleClickProject = (repo) => {
    //localStorage.setItem('project', repo);
    apiCICD.post('selectRepo', { repo });
    setPage('menu-desenvolver');
  }

  async function modalRepositorios() {

    const response = await apiCICD.get('myRepos');
    setMyRepos(response.data);

    const result = await CustomDialog(
      <>
        <ul>
          {myRepos.map(repo =>
            <>
              <li key={repo}><button onClick={ () => handleClickProject(repo) }>{repo}</button></li>
            </>
          )
          }
        </ul>
      </>,
        {
          title: 'Repositórios disponíveis',
          showCloseIcon: true,
          isBodyScrollLocked: true,
          replaceScrollBar: true,
        }
    );

    if (result) {
      // Сonfirmation confirmed
    } else {
      // Сonfirmation not confirmed
    }
  }

  async function modalClone() {
    const result = await CustomDialog(
      <>
        <input type="text" placeholder="" id="repositoryUrl" onChange={(e) => setInputRepUrl(e.target.value)}/>
        <button onClick={ handleClickClone }>Clonar!</button>
      </>,
        {
          title: 'Clonar Repositório',
          showCloseIcon: true,
          isBodyScrollLocked: true,
          replaceScrollBar: true,
        }
    );

    if (result) {
      // Сonfirmation confirmed
    } else {
      // Сonfirmation not confirmed
    }
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


      <button onClick={modalRepositorios}>Selecionar um repositório</button>
      <br/>
      <button onClick={modalClone}>Clonar repositório</button>

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



    </main>
  );
}
export default StartPage;
