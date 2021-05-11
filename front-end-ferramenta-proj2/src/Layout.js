import React, { useState, useEffect } from 'react';
import Aside from './Aside';
import Main from './Main';
import MenuDev from './components/menu_panels/MenuDev';
import MenuCICD from './components/menu_panels/MenuCICD';
import StartPage from './components/menu_panels/StartPage';

// API'S
import apiCICD from './services/apiCICD';

function Layout({ setLocale }) {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);
  const [page, setPage] = useState('page-start');
  const [menu_panel] = useState(1);
  
  /*********EXEMPLO DE CONSUMO DA API ************************************************/
  // let result;
  // apiCICD.post('changePath', {
  //   path:'C:\\Users\\alexa\\Desktop\\Nodejs_auto_deploy-main'
  // }).then(res => {  
  // });
  
  const [res, setProjects] = useState([]);

  // useEffect(() =>{ console.log('chamou api');
  //   apiCICD.post('changePath', {
  //     path:'C:\\Users\\alexa\\Desktop\\Nodejs_auto_deploy-main'
  //   }).then(response => {
  //     setProjects(response.data);
  //   });  
  // }, [])
  /*********EXEMPLO DE CONSUMO DA API ************************************************/
  
  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
    setLocale(checked ? 'ar' : 'en');
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  function renderMenu() {
    switch (page) {
      case 'page-start':
        return <StartPage />;
      case 'menu-cicd':
        return <MenuCICD />;
      case 'menu-desenvolver':
        return <MenuDev />;
      default:
        return <StartPage />;
    }
  }
  
  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        setPage={setPage}
      />
      
      <>
        {renderMenu()}
      </>

    </div>
  );
}

export default Layout;