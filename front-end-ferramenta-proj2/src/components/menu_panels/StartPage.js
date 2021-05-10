import React, { useState, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';
import { CustomDialog, useDialog } from 'react-st-modal';

import apiCICD from '../../services/apiCICD';

function StartPage() {
  const [myRepos, setMyRepos] = useState([]);

  useEffect(() =>{ 
    apiCICD.get('myRepos').then(response => {  
      console.log(response.data);    
      setMyRepos(response.data);
    });
  }, [])

  async function modalRepositorios() {
    const result = await CustomDialog(
      <>
        <ul>
          {myRepos.map(repo =>
            <>
              <li key={repo}><button>{repo}</button></li>              
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
        <input type="text" placeholder=""/>
        <button>Clonar!</button>
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
