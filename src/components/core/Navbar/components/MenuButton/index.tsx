import React, { useEffect, useState } from 'react';
import {MdOutlineExitToApp} from 'react-icons/md';
import {FcLike} from 'react-icons/fc';
import './index.scss'
import { Menu } from './Menu';

interface IProps {
   onLeave: () => void;
}

export const MenuNavButton: React.FC<IProps> = ({onLeave}) => {
   const [isOpen, setIsOpen] = useState(false);

   useEffect(() => {
      window.addEventListener('click', handler)

      function handler() {
         setIsOpen(false)
      }

      return () => {
         window.removeEventListener('click', handler);
      }
   },[])

   return (
      <div className='menu_button_wrapper'
         onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
         }}
      >
          <div className='menu_button'>
            <img src='/entericon.png' style={{
               width: 40,
               height: 40,
               cursor: 'pointer'
            }}/>
            <div>Меню</div>
         </div>
         <Menu isOpen={isOpen}/>
      </div>
   )
}