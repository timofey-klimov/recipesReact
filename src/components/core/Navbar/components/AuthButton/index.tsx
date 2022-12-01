import React, { useRef } from 'react';
import { NavLink, To } from 'react-router-dom';
import './index.scss';

interface IProps {
   path: To
}

export const AuthNavButton:React.FC <IProps>= ({path}) => {
   const enterButton = useRef<HTMLAnchorElement>(null);
   
   return (
      <div className='enter__button'>
         <img src='/entericon.png' style={{
            width: 40,
            height: 40,
            cursor: 'pointer'
         }} onClick={() => enterButton.current?.click()}/>
         <NavLink to={path} ref={enterButton}>Войти</NavLink>
      </div>
   )
}