import React from 'react';
import { MenuItem } from '../MenuItem';
import {MdOutlineExitToApp} from 'react-icons/md';
import {FcLike} from 'react-icons/fc';
import './index.scss';
import { authService } from '../../../../../../core/services/authService';
import { useNavigate } from 'react-router';

interface IProps {
   isOpen: boolean;
}

export const Menu: React.FC<IProps> = ({isOpen}) => {
   const {clear} = authService();
   const navigate = useNavigate();

   const items = [
      {
         icon: <FcLike/>,
         text: 'Любимые рецепты',
         onclick: () => {}
      },
      {
         icon: <MdOutlineExitToApp/>,
         text: 'Выйти',
         color: 'red',
         onClick: () => {
            clear();
            navigate('/auth');
         }
      }
   ]

   
   return (
      isOpen ? <div className='nav_button_menu'>
         {
            items.map((item, index) => (
               <MenuItem 
                  {...item} 
                  key={index} 
                  onClick={item.onClick!}/>
            ))
         }
         
      </div> : null
   )
}