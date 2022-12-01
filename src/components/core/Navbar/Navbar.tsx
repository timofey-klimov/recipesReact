import React, { useRef } from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';
import { SearchComponent } from '../SearchComponent';
import { authService } from '../../../core/services/authService';
import { CreateNavButton } from './components/CreateButton';
import { AuthNavButton } from './components/AuthButton';
import { MenuNavButton } from './components/MenuButton';

export const Navbar: React.FC = () => {
   const navigate = useNavigate();
   const { isAuth } = authService();

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
            {
               !isAuth ?
               <AuthNavButton path={'/auth'}/>
               : <MenuNavButton/>
            }
            
           <CreateNavButton path={'/create'}/>
         </div>
      </div>
   )
}