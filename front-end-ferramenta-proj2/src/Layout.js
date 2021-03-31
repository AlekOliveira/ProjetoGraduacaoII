import React, { useState, useEffect } from 'react';
import Aside from './Aside';
import Main from './Main';
import MenuDev from './components/menu_panels/MenuDev';
import apiCICD from './services/apiCICD';


function Layout({ setLocale }) {
  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);
  // const [page, setPage] = useState(0);
  const [menu_panel] = useState(1);

  
  
  /*********TESTE API ************************************************/
  // let result;
  // apiCICD.post('changePath', {
  //   path:'C:\\Users\\alexa\\Desktop\\Nodejs_auto_deploy-main'
  // }).then(res => {  
  // });
  // const [res, setProjects] = useState([]);

  // useEffect(() =>{ console.log('chamou api');
  //   apiCICD.post('changePath', {
  //     path:'C:\\Users\\alexa\\Desktop\\Nodejs_auto_deploy-main'
  //   }).then(response => {
  //     setProjects(response.data);
  //   });  
  // }, [])
  /*********TESTE API ************************************************/
  
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

  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''}`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        // setPage={setPage}
      />
      
      {/* <>
        { 
          page == 0 ? (<h1>page 0</h1>) : (page == 1 ? (<h1>page 1</h1>) : null)
        }
      </> */}

      <>
        <MenuDev />
      </>

      {/* <Main
        image={image}
        toggled={toggled}
        collapsed={collapsed}
        rtl={rtl}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleRtlChange={handleRtlChange}
        handleImageChange={handleImageChange}
      /> */}
    </div>
  );
}

export default Layout;