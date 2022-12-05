import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SideMenu from '../BurgerMenu/components/SideMenu';
import { SideBarMenuProvider } from '../BurgerMenu/sidebarMenu,provider';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import './Layout.scss';

export const Layout: React.FC = () => {
   return (
      <>
      <SideBarMenuProvider>
         <Navbar/>
         <ToastContainer autoClose={2000}/>
         <Container className='main__container'>
            <Outlet/>
         </Container>
      </SideBarMenuProvider>
      </>
   )
}