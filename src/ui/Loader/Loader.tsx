import React from 'react';
import { BounceLoader, ClockLoader, DotLoader, HashLoader, MoonLoader } from 'react-spinners';
import './Loader.scss';

interface IProps {
   loading: boolean;
}

export const Loader: React.FC<IProps> = ({loading}) => {
   return (
      <div>
         <HashLoader color='#36d7b7' loading={loading} style={{
            top:'50%',
            left: '50%',
            position: 'fixed'
         }}/>
      </div>
   )
}