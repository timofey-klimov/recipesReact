import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '../Container/Container';
import { Navbar } from '../Navbar/Navbar';
import './Layout.scss';

export const Layout: React.FC = () => {
   return (
      <>
      <Navbar/>
      <Container className='main__container'>
         <Outlet/>
      </Container>
      </>
   )
}