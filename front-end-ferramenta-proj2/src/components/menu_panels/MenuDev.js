import React, { useState, useEffect } from 'react';
import { FaBoxOpen, FaCodeBranch, FaRocket } from 'react-icons/fa';
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

  const handleClickEdit = async () => {
    await apiCICD.get('/openVscode');    
  }

  const handleClickSwitchBranch = async (branch) => {
    setSelectedBranch(branch);  
  }

  const handleClickNewFeat = async () => {
    await apiCICD.post('/newFeature', { featureName: inputNewFeat });
    await apiCICD.get('/openVscode');
    setOpenModal('');
  }

  const handleClickSend = async () => {
    await apiCICD.post('/sendChanges', { commitMessage: "test" });
    //setOpenModal('meuModal');    
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
            // openModal === 'sendChanges' ?
            //   infoNewFeat() :
            // null
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
          Você acabou de decolar!<br />
          Nesta seção você pode selecionar como e onde trabalhar.<br />
        </b>
      </p>

      <>
        <p><b><FaCodeBranch/> Seleção de branchs</b></p>        

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
        <p><b><FaBoxOpen/> Ações disponíveis</b></p>

        <br/>
        <button onClick={() => setOpenModal('newFeat')}>Nova Mudança</button>
        <br/>
        <button onClick={ handleClickEdit }>Editar com VSCode</button>
        <br/>
        <button onClick={ handleClickSend }>Enviar Mudanças</button>
        <br/>
      </>
      { renderModal() }
    </main>
  );
}

export default MenuDev;