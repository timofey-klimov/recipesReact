import React, { useRef } from 'react';
import './Search.scss';
import { IoSearch } from "react-icons/io5";

interface IProps {
   onChange?: (value: string) => void;
   value?: string;
   onClick?: (search: string) => void;
}

export const Search: React.FC<IProps> = (props) => {
   const ref = useRef<HTMLInputElement>(null);

   const onChangeHandle = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) {
         props.onChange(e.target.value);
      }
   }

   const onClickHandler = () => {
      if (props.onClick) {
         props.onClick(ref.current?.value ?? '')
      }
   }

   return (
      <div 
         className='search' 
         onClick={() => ref.current?.focus()}
      >
         <input 
            placeholder='Поиск' 
            ref={ref}
            onChange={onChangeHandle}
            value={props.value}
         />
         <div onClick={onClickHandler}>
            <IoSearch color='#FFF'/>
         </div>
      </div>
   )
}