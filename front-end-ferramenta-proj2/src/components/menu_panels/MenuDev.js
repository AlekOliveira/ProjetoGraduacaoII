import React, { useState, useEffect } from 'react';
import { FaCodeBranch, FaRocket } from 'react-icons/fa';
import apiCICD from '../../services/apiCICD';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

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

function MenuDev() {
  const classes = useStyles();
  const [branches, setBranches] = useState([]);
  const [openModal, setOpenModal] = useState('');
  const [inputNewFeat, setInputnewFeat] = useState('');
  const [selectedBranch, setSelectedBranch] = useState(''); 

  useEffect(() => {
    apiCICD.get('repoBranches').then(res => {
      setBranches((res.data));
      setSelectedBranch((res.data[0]));
    })
  }, []);

  useEffect(() => {
    apiCICD.post('/switchBranch', { branchName: selectedBranch });
  }, [selectedBranch]);

  const handleClickSwitchBranch = async (branch) => {
    setSelectedBranch(branch);  
  }

  const handleClickNewFeat = async () => {
    await apiCICD.post('/newFeature', { featureName: inputNewFeat });
    await apiCICD.get('/openVscode');
    setOpenModal('');
  }

  const infoNewFeat = () => {
    return (
      <>
        <h2>Nova funcionalidade</h2>
        <input type="text" value={inputNewFeat} onChange={(e) => setInputnewFeat(e.target.value)} />
        <button onClick={handleClickNewFeat}>Criar nova funcioalidade</button>
      </>
    );
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
            openModal === 'newFeat' ?
              infoNewFeat() :
              null
          }
        </div>
      </Modal>
    )
  }

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

        <select 
          id="select-branch"
          onChange={ e => handleClickSwitchBranch(e.target.value) }
        >
          {
            branches.map(branch =>
              <option value={branch} key={branch}>{branch}</option>              
            )
          }
        </select>
      </>

      <>
        <br/>
        <button onClick={() => setOpenModal('newFeat')}>Nova Mudança</button>
        <br/>
        <button>Retirar para correção</button>
        <br/>
        <button>Enviar Mudanças</button>
        <br/>
      </>
      <p>Delegadis gente finis, bibendum egestas augue arcu ut est. Pra lá , depois divoltis porris, paradis. Casamentiss faiz malandris se pirulitá. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.</p>
      { renderModal() }
    </main>
  );
}

export default MenuDev;