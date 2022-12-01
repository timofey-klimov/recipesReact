import { Button, ButtonProps } from '@vechaiui/react';
import React from 'react';

interface IProps extends React.PropsWithChildren, ButtonProps {
}

export const PrimaryButton: React.FC<IProps> = ({children, style, color, ...props}) => {

   const buttonProps = color 
      ? { 
         style: {
            ...style,
            cursor: 'pointer',
            color: color,
            borderColor: color
         }
      }
      : {
         color: 'primary',
         style: {
            ...style,
            cursor: 'pointer'
         }
      }
   
   return (
      <Button {...props} {...buttonProps}>
         { children }
      </Button>
   )
} 