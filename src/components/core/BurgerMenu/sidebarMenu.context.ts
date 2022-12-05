import React from 'react';

interface SidebarMenuProps {
   toggle: () => void,
   isOpen: boolean,
   isMobile: boolean
} 

export const SidebarMenuContext = React.createContext<SidebarMenuProps>({
   toggle: () => {},
   isOpen: false,
   isMobile: false
})

