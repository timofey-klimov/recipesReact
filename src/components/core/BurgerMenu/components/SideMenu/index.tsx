import React, { useEffect } from 'react';
import Menu from '../Menu';
import './index.scss';

interface IProps {
   isOpen: boolean,
   close: () => void
}

const SideMenu: React.FC<IProps> = ({isOpen, close}) => {

   useEffect(() => {
      const element = document.body;
      if (isOpen) {
         element.style.overflow = 'hidden'
      } else {
         element.style.overflow = 'auto'
      }
   }, [isOpen])
   
   return (
      isOpen ? <div className='side_menu_wrapper' onClick={close}>
         <Menu 
            isOpen={isOpen}/>
      </div> : null
   )
}

export default SideMenu;

