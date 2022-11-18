import React from 'react';
import './index.scss';

interface IProps {
   id: number,
   title: string,
   onClick: (id: number) => void;
}

export const SearchItem: React.FC<IProps> = ({id, title, onClick}) => {
   return (
      <li 
         onClick={() => onClick(id)}
         className='search_item'
      >
         {title}
      </li>
   )
}