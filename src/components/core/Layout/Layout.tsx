import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import './Layout.scss';

export const Layout: React.FC = () => {
   return (
      <>
      <Navbar/>
      <ToastContainer autoClose={2000}/>
      <Container className='main__container'>
         <Outlet/>
      </Container>
      </>
   )
}