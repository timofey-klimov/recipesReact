import React from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { SearchComponent } from '../SearchComponent';
import { authService } from '../../../core/services/authService';
import { CreateNavButton } from './components/CreateButton';
import { AuthNavButton } from './components/AuthButton';
import { MenuNavButton } from './components/MenuButton';
import { useMenu } from '../BurgerMenu/useMenu';
import Hamburger from 'hamburger-react'

export const Navbar: React.FC = () => {
   const navigate = useNavigate();
   const { isAuth, clear } = authService();
   const { isOpen, toggle, isMobile } = useMenu();

   const onLeave = () => {
      clear();
      navigate('/auth');
   }
   
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
            <CreateNavButton path={'/create'}/>
            {
               !isAuth ?
               <AuthNavButton path={'/auth'}/>
               : isMobile ? 
                  <div style={{
                     marginLeft: 15
                  }}>
                     <Hamburger toggled={isOpen} toggle={toggle} size={40}/>
                  </div> 
                  : <MenuNavButton onLeave={onLeave}/>
            }
         </div>
      </div>
   )
}