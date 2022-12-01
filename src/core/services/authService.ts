export const authService = () => {
   const setToken = (token: string) => {
      localStorage.setItem('auth', token)
   }

   const isAuth = localStorage.getItem('auth') != null;

   const token = localStorage.getItem('auth');

   return {
      isAuth,
      token,
      setToken
   }
}