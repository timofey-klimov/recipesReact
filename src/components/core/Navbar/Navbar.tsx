import React, { useRef } from 'react';
import './Navbar.scss';
import { FiPlus } from "react-icons/fi";
import { NavLink, useNavigate } from 'react-router-dom';
import { SearchComponent } from '../SearchComponent';

export const Navbar: React.FC = () => {
   const enterButton = useRef<HTMLAnchorElement>(null);
   const createButton = useRef<HTMLAnchorElement>(null);
   const navigate = useNavigate();
   return (
      <div className='nav'>
         <div className='logo_wrapper'>
            <img 
               src='/mainlogo.png' 
               onClick={() => navigate('/')}
               className='logo_nav'
            />
         </div>
         
         <SearchComponent className='search_nav'/>

         <div className='actions_nav'>
            <div className='enter__button'>
                  <img src='/entericon.png' style={{
                     width: 40,
                     height: 40,
                     cursor: 'pointer'
                  }} onClick={() => enterButton.current?.click()}/>
               <NavLink to={''} ref={enterButton}>Войти</NavLink>
            </div>
            
            <div className='create__button'>
                  <FiPlus style={{
                     width: 40,
                     height: 40,
                     cursor: 'pointer',
                  }} onClick={() => createButton?.current?.click()}/>
                  
               <NavLink to={'/create'} ref={createButton}>Создать</NavLink>
            </div>
         </div>
      </div>
   )
}