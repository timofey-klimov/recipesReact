import { Button, ButtonProps } from '@vechaiui/react';
import React from 'react';

interface IProps extends React.PropsWithChildren, ButtonProps{
}

export const PrimaryButton: React.FC<IProps> = ({children, style, ...props}) => {
   return (
      <Button {...props} color='primary' style={{
         ...style,
         cursor: 'pointer'
      }}>
         {children}
      </Button>
   )
} 