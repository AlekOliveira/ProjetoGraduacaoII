import React, { useState } from 'react';
import { FaCodeBranch, FaRocket } from 'react-icons/fa';

function MenuDev() {
  return(
    <main>
      <h1><FaRocket/> Desenvolver</h1>  
      <p>
        <b>
          Mussum Ipsum, cacilds vidis litro abertis. Praesent vel viverra nisi. 
          Mauris aliquet nunc non turpis scelerisque, eget. Suco de cevadiss deixa 
          as pessoas mais interessantis. Detraxit consequat et quo num tendi nada. 
          Interagi no mé, cursus quis, vehicula ac nisi.
        </b>
      </p>

      <>
        <p><b><FaCodeBranch/> Qual branch você deseja modificar?</b></p>
        <select name="" id="select-branch">
          <option value="">branch Main</option>
          <option value="">branch Testes</option>
          <option value="">branch 2.0</option>
        </select>
      </>
      
      <>  
        <br/>
        <button>Nova Mudança</button>
        <br/>
        <button>Retirar para correção</button>
        <br/>
        <button>Enviar Mudanças</button>
        <br/>
      </>
      <p>Delegadis gente finis, bibendum egestas augue arcu ut est. Pra lá , depois divoltis porris, paradis. Casamentiss faiz malandris se pirulitá. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.</p>
    </main>
    
  );
}

export default MenuDev;