import { Button, FormControl, FormErrorMessage, FormLabel, Input, RequiredIndicator } from '@vechaiui/react';
import React, { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { PrimaryButton } from '../../../../ui/PrimaryButton/PrimaryButton';
import { validateEmailSignUpAsync, validateLoginSignUpAsync } from '../validation';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoIosCheckmarkCircle } from 'react-icons/io';

interface SignUpValues {
   login: string,
   email: string,
   password: string
}

interface IProps {
   submit: (data: SignUpValues) => void;
   isLoading: boolean
}

export const SignUp: React.FC<IProps> = ({ submit, isLoading }) => {

   const { register, formState: { errors }, handleSubmit } = useForm<SignUpValues>({
      mode: 'onBlur'
   })

   const [loginValidate, setLoginValidate] = useState(false);
   const [emailValidate, setEmailValidate] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const handleShowPassword = () => setShowPassword(!showPassword);

   const errorsForLogin = () => {
      if (errors?.login?.type === 'required') {
         return <FormErrorMessage>Логин обязателен</FormErrorMessage>
      }

      if (errors?.login?.type == 'validate') {
         return <FormErrorMessage>Логин уже используется</FormErrorMessage>
      }
   }

   const errorsForEmail = () => {
      if (errors?.email?.type === 'required') {
         return <FormErrorMessage>Email обязателен</FormErrorMessage>
      }
      if (errors?.email?.type == 'pattern') {
         return <FormErrorMessage>Неверный формат email</FormErrorMessage>
      }
      if (errors?.email?.type == 'validate') {
         return <FormErrorMessage>Email уже используется</FormErrorMessage>
      }
   }

   const errorsForPassword = () => {
      if (errors?.password?.type == 'required') {
         return <FormErrorMessage>Пароль обязателен</FormErrorMessage>
      }

      if(errors?.password?.type == 'minLength') {
         return <FormErrorMessage>Минимальная длина 6 символов</FormErrorMessage>
      }
   }

   const ErroIcon: React.FC<{error?: FieldError}> = ({error}) => {
      const showError = error?.type === 'validate';
      return (
         showError ?<IoIosCloseCircle style={{
            marginLeft: 5,
            color: 'red',
            height: 20,
            width: 20,
            position: 'absolute',
            left: '100%'
         }}/> : null
      )
   }

   const SuccessIcon: React.FC = () => {
      return (
         <IoIosCheckmarkCircle style={{
            marginLeft: 5,
            color: 'green',
            height: 20,
            width: 20,
            position: 'absolute',
            left: '100%'
         }}/>
      )
   }

   const onSubmit = (data: SignUpValues) => {
      submit(data);
   }

   return (
      <form 
         style={{
            padding: '0 20px'
         }}
         onSubmit={handleSubmit(onSubmit)}
      >
         <FormControl invalid={Boolean(errors.login)}>
            <FormLabel>
               Логин<RequiredIndicator/>
            </FormLabel>
            <div style={{
               display: 'flex',
               alignItems: 'center'
            }}>
               <Input 
                  placeholder='Введите логин'
                  {...register('login', {
                     required: true,
                     validate: async (value) => {
                        const validation = await validateLoginSignUpAsync(value);
                        setLoginValidate(validation);
                        return validation;
                     }
                  })} 
               />
               <ErroIcon error={errors.login}/>
               {loginValidate && <SuccessIcon/>}
            </div>
            {errorsForLogin()}
         </FormControl>
         <FormControl 
            style={{
               marginTop: 20
            }}
            invalid={Boolean(errors.email)}
         >
            <FormLabel>
               Email<RequiredIndicator/>
            </FormLabel>
            <div style={{
               display: 'flex',
               alignItems: 'center'
            }}>
               <Input 
                  placeholder='Введите email'
                  {...register('email', {
                     required: true,
                     pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                     validate: async (value) => {
                        const validation = await validateEmailSignUpAsync(value);
                        setEmailValidate(validation);
                        return validation;
                     }
                  })}
               />
               <ErroIcon error={errors.email}/>
               {emailValidate && <SuccessIcon/>}
            </div>
            {errorsForEmail()}
         </FormControl>
         <FormControl
            invalid={Boolean(errors?.password)} 
            style={{
               marginTop: 20
            }}
         >
            <FormLabel>
               Пароль<RequiredIndicator/>
            </FormLabel>
            <Input.Group>
               <Input   
                  placeholder='Введите пароль'
                  {...register('password', {
                     required: true,
                     minLength: 6
                  })}
                  type={showPassword ? 'text' : 'password'}
               />
               <Input.RightElement className="w-16">
                  <Button 
                     type='button' 
                     size='xs'
                     variant='solid' 
                     onClick={handleShowPassword}
                     style={{
                        marginRight: '30px'
                     }}
                     
                  >
                     {showPassword ? 'Скрыть' : 'Показать'}
                  </Button>
               </Input.RightElement>
            </Input.Group>
            {errorsForPassword()}
         </FormControl>

         <PrimaryButton 
               style={{
               width: '100%',
               marginTop: 20,
            }}
            loading={isLoading}
         >
            Создать
         </PrimaryButton>
      </form>
   )
}