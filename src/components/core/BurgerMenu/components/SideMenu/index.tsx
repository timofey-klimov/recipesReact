import React from 'react';
import Menu from '../Menu';
import './index.scss';

interface IProps {
   isOpen: boolean,
   close: () => void
}

const SideMenu: React.FC<IProps> = ({isOpen, close}) => {
   
   const classname = isOpen ? 'side_menu_wrapper' : 'side_menu_wrapper closed';

   return (
      <div className={classname} onClick={close}>
         <Menu 
            isOpen={isOpen}/>
      </div>
   )
}

export default SideMenu;

