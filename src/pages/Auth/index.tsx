import React from 'react';
import { useNavigate } from 'react-router';
import { AuthTabs, IAuthTab } from '../../components/pages/AuthPage/AuthTabs';
import { SignIn } from '../../components/pages/AuthPage/SignIn';
import { SignUp } from '../../components/pages/AuthPage/SignUp';
import { useAppDispatch } from '../../core/hooks/useAppDispatch';
import { useAppSelector } from '../../core/hooks/useAppSelector';
import { SignInRequest } from '../../models/auth/SignInRequest';
import { SignUpRequest } from '../../models/auth/SignUpRequest';
import { clearSignUpError } from '../../store/auth/signIn/signIn.slice';
import { signInThunk } from '../../store/auth/signIn/signIn.thunk';
import { signUpThunk } from '../../store/auth/signUp/signUp.thunk';
import './index.scss';

export const AuthPage: React.FC = () => {
   const dispatch = useAppDispatch();
   const errorSignIn = useAppSelector(x => x.auth.signIn.error);
   const signInLoading = useAppSelector(x => x.auth.signIn.isLoading);
   const signUpLoading = useAppSelector(x => x.auth.signUp.isLoading);
   const navigate = useNavigate();

   const tabs: IAuthTab[] = [
      {
         value: 'Войти',
         name: 'signIn',
         content: <SignIn 
            submit={(data) => {onSignInSubmit(data)}}
            error={errorSignIn}
            onload={() => dispatch(clearSignUpError())}
            isLoading={signInLoading}
            />
      },
      {
         value: 'Создать',
         name: 'signUp',
         content: <SignUp 
            submit={(data) => onSignUpSubmit(data)}
            isLoading={signUpLoading}
            />
      }
   ]

   const onSignUpSubmit = function(data: SignUpRequest) {
      dispatch(signUpThunk(data))
         .unwrap()
         .then(() => navigate('/'))
         .catch(() => {})
   }

   const onSignInSubmit = function(data: SignInRequest) {
      dispatch(signInThunk(data))
         .unwrap()
         .then(() => navigate('/'))
         .catch(() => {})
   }

   return (
      <div className='auth_form_wrapper'>
         <div className='auth_form'>
            <AuthTabs tabs={tabs}/>
         </div>
      </div>
   )
} 