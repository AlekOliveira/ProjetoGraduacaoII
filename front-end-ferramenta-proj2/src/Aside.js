import React from 'react';

import { useIntl } from 'react-intl';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaCog, FaCodeBranch, FaCogs, FaRocket, FaHome } from 'react-icons/fa';
import sidebarBg from './assets/bg1.jpg';

const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar, setPage}) => {
  const intl = useIntl();

  async function handleMenuDesenvolver() { 
    setPage('menu-desenvolver');
  }

  async function handleMenuUsuario() {
    setPage('menu-usuario');
  }

  async function handleMenuCICD() {
    setPage('menu-cicd');
  }

  async function handleMenuDeploy() {
    setPage('menu-deploy');
  }

  async function handleHome() {
    setPage('home');
  }

  return (
    <ProSidebar
      //image={image ? sidebarBg : false}
      image={false}
      rtl={rtl}
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarHeader>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 18,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {intl.formatMessage({ id: 'sidebarTitle' })}
        </div>
      </SidebarHeader>

      <SidebarContent>

        <Menu>
          <MenuItem
            icon={ <FaHome /> }
            onClick={ handleHome }
          >
            Home
          </MenuItem>
          <MenuItem
            icon={<FaRocket />}
            onClick={handleMenuDesenvolver}
          >
            Desenvolver
          </MenuItem>

          {/* <SubMenu
            title='Ajustes'
            icon={<FaCog />}
          >
            <MenuItem onClick={handleMenuUsuario}>Usuário</MenuItem>
            <MenuItem onClick={handleMenuCICD}>CI/CD</MenuItem>
            <MenuItem onClick={handleMenuDeploy}>Deploy</MenuItem>
          </SubMenu> */}

        </Menu>        
      
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <a
            href="https://github.com/azouaoui-med/react-pro-sidebar"
            target="_blank"
            className="sidebar-btn"
            rel="noopener noreferrer"
          >
            <FaGithub />
            <span> {intl.formatMessage({ id: 'viewSource' })}</span>
          </a>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
