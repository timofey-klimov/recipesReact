import React, { useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { NavLink, To } from 'react-router-dom';
import './index.scss';

interface IProps {
   path: To
}

export const CreateNavButton: React.FC<IProps> = ({ path }) => {
   const createButton = useRef<HTMLAnchorElement>(null);

   return (
      <div className='create__button'>
         <FiPlus style={{
                     width: 40,
                     height: 40,
                     cursor: 'pointer',
                  }} onClick={() => createButton?.current?.click()}/>
                  
         <NavLink to={path} ref={createButton}>Создать</NavLink>
      </div>
   )
}