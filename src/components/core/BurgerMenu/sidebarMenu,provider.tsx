import React, { useEffect, useState } from 'react';
import SideMenu from './components/SideMenu';
import { SidebarMenuContext } from './sidebarMenu.context';

interface IProps extends React.PropsWithChildren {

}

export const SideBarMenuProvider: React.FC<IProps> = ({children}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(false);

   useEffect(() => {
      const mediaWatcher = window.matchMedia("(max-width: 768px)")
      setIsMobile(mediaWatcher.matches);

      function updateIsMobile(e: any) {
         setIsMobile(e.matches);
      }

      mediaWatcher.addEventListener('change', updateIsMobile)

      return () => mediaWatcher.removeEventListener('change', updateIsMobile);

   }, [])

   return (
      <>
      <SidebarMenuContext.Provider value={{
         toggle: () => setIsOpen(!isOpen),
         isOpen: isOpen,
         isMobile: isMobile
      }}>
         <>
            {isMobile && <SideMenu 
               isOpen={isOpen}
               close={() => setIsOpen(false)}/>}
            {children}
         </>
      </SidebarMenuContext.Provider>
      </>
   )
}