import React from 'react';
import { HashLoader } from 'react-spinners';
import './Loader.scss';

interface IProps {
   loading: boolean;
   fullScreen?: boolean;
}

export const Loader: React.FC<IProps> = ({loading, fullScreen}) => {

   const loader = (loading: boolean) => {
      return  <HashLoader color='#0d9488' loading={loading} style={{
         top:'50%',
         left: '50%',
         position: 'fixed'
      }}/>
   }

   return (
      <>
      {
         fullScreen && loading
         ? <div className='spinner_wrapper'>
            {loader(loading)}
            </div>
         : loader(loading)
      }
      </> )
}