import React from 'react';
import { useNavigate } from 'react-router';
import { AuthTabs, IAuthTab } from '../../components/pages/AuthPage/AuthTabs';
import { SignIn } from '../../components/pages/AuthPage/SignIn';
import { SignUp } from '../../components/pages/AuthPage/SignUp';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { SignUpRequest } from '../../models/auth/SignUpRequest';
import { signUpThunk } from '../../store/auth/auth.thunk';
import './index.scss';

export const AuthPage: React.FC = () => {

   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const tabs: IAuthTab[] = [
      {
         value: 'Войти',
         name: 'signIn',
         content: <SignIn/>
      },
      {
         value: 'Создать',
         name: 'signUp',
         content: <SignUp submit={(data) => onSignUpSunmit(data)}/>
      }
   ]

   const onSignUpSunmit = function(data: SignUpRequest) {
      dispatch(signUpThunk(data))
         .unwrap()
         .then(x => navigate('/'))
   }

   return (
      <div className='auth_form_wrapper'>
         <div className='auth_form'>
            <AuthTabs tabs={tabs}/>
         </div>
      </div>
   )
} 