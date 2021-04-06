import React, { useState } from 'react';
import { FaCodeBranch, FaRocket } from 'react-icons/fa';

function StartPage() {

  function test (){
    alert('aa');
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

      
      <button onClick={test}>Abrir um projeto</button>
      <br/>
      <button>Clonar projeto</button> 
      {/* 
        Após abrir um projeto, verifica se o mesmo já está configurado.
            caso não, é inicializado o assistente de configuração.
        Estando configurado, o usuario é direcionado para a pagina de desenvolvimento.
      */}



      <input type="file"  webkitdirectory="true" directory multiple/>
    </main>    
  );
}
export default StartPage;
