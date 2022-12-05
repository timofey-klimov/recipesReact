import { useContext } from "react"
import { SidebarMenuContext } from "./sidebarMenu.context";

export const useMenu = () => {
   return useContext(SidebarMenuContext);
}