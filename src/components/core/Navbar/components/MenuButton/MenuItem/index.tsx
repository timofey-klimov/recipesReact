import React, { ReactNode } from 'react';
import './index.scss';

interface IProps {
   icon: ReactNode,
   text: string,
   color?: string,
   onClick: () => void;
}

export const MenuItem: React.FC<IProps> = ({icon, text, color, onClick}) => {
   const itemColor = color ?? 'black';

   return (
      <div 
         className='menu_item' 
         style={{
            color: itemColor
         }}
         onClick={onClick}
      >
         {icon}
         <p style={{
            marginLeft: 5
         }}>{text}</p>
      </div>
   )
}