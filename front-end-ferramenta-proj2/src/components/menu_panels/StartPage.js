import React, { useState, useEffect } from 'react';
import { FaCodeBranch, FaRocket } from 'react-icons/fa';
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

  function test (){
    alert('olá mundo');
  }

  async function showModal() {
    const result = await CustomDialog(
      <>
        <ul>
          {myRepos.map(repo => 
              <>
                <li key={repo}><button>test</button> - {repo}</li>
              </>              
            )
          }
        </ul>
      </>,
        {
          title: 'Custom Dialog',
          showCloseIcon: false,
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

      
      <button onClick={showModal}>Abrir um projeto</button>
      <br/>
      <button onClick={test}>Clonar projeto</button>  
      
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
