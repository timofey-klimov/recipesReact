import React from 'react';

type Props = React.PropsWithChildren & React.AllHTMLAttributes<HTMLDivElement>

export const Container: React.FC<Props> = ({children, className, ...props}) => {
   return (
      <div className={className} {...props}>
         {children}
      </div>
   )
}