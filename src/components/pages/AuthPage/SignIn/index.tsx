import { FormControl, FormLabel, Input, RequiredIndicator } from '@vechaiui/react';
import React from 'react';
import { PrimaryButton } from '../../../../ui/PrimaryButton/PrimaryButton';

export const SignIn: React.FC = () => {
   return (
      <form style={{
         padding: '0 20px'
      }}>
         <FormControl>
            <FormLabel>
               Логин<RequiredIndicator/>
            </FormLabel>
            <Input placeholder='Логин или email'/>
         </FormControl>
         <FormControl style={{
            marginTop: 30
         }}>
            <FormLabel>
               Пароль<RequiredIndicator/>
            </FormLabel>
            <Input placeholder='Введите пароль'/>
         </FormControl>

         <PrimaryButton 
               style={{
               width: '100%',
               marginTop: 30,
            }}
         >
            Войти
         </PrimaryButton>
      </form>
   )
}