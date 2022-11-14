import React, { useRef } from 'react';
import './Search.scss';
import { IoSearch } from "react-icons/io5";
export const Search: React.FC = () => {
   const ref = useRef<HTMLInputElement>(null);

   return (
      <div className='search' onClick={() => ref.current?.focus()}>
         <input placeholder='Поиск' ref={ref}/>
         <div>
            <IoSearch color='#FFF'/>
         </div>
      </div>
   )
}