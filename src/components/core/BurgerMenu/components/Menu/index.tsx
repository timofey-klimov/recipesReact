import React from 'react';
import './index.scss';
import {MdOutlineExitToApp} from 'react-icons/md';
import {FcLike} from 'react-icons/fc';
import { authService } from '../../../../../core/services/authService';
import { useNavigate } from 'react-router';
import { useMenu } from '../../useMenu';

interface IProps {
   isOpen: boolean;
}

const Menu:React.FC<IProps> = ({isOpen}) => {
   const classname = isOpen ? 'sidebar_menu' : 'sidebar_menu closed';
   const {clear} = authService();
   const navigate = useNavigate();
   const {toggle} = useMenu();

   return (
      <div className={classname} onClick={(e) => e.stopPropagation()}>
         <div className='sidebar_menu_items'>
            <div className='sidebar_menu_item'>
               <FcLike/>
               <p>Любимые рецепты</p>
            </div>
            <div className='sidebar_menu_item exit' onClick={() => {
               clear();
               toggle();
               navigate('/auth');
            }}>
               <MdOutlineExitToApp/>
               <p>Выйти</p>
            </div>
         </div>
      </div>
   )
}

export default Menu;