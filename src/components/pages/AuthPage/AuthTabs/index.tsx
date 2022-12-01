import React, { ReactNode } from 'react';
import { Tab } from "@headlessui/react";
import './index.scss';

export interface IAuthTab {
   value: string,
   name: string,
   content: ReactNode,
}

interface IProps {
   tabs: IAuthTab[],
   className?: string
}

export const AuthTabs: React.FC<IProps> = ({tabs, className}) => {

   function classNames(...classes: string[]) {
      return classes.filter(Boolean).join(' ')
   }

   return (
         <Tab.Group>
            <Tab.List style={{
               display: 'flex',
               justifyContent: 'center'
            }}>
               {tabs.map((tab) => (
                  <Tab
                     key={tab.name}
                     className={({ selected }) =>
                           classNames('auth_tab_header', selected ? 'selected' : '')
                     }
                  >
                     {tab.value}
                  </Tab>
               ))}
            </Tab.List>
            <Tab.Panels style={{
               marginTop: 60,
            }}>
               <div style={{
                  display: 'flex',
                  justifyContent: 'center'
               }}>
                  {tabs.map((tab, idx) => (
                     <Tab.Panel
                        key={idx}
                        style={{
                           width: '350px'
                        }}
                     >
                        {tab.content}
                     </Tab.Panel>
                  ))}
               </div>
            </Tab.Panels>
         </Tab.Group>
   )
}