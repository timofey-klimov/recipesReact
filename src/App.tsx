import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/core/Layout/Layout';
import { AuthPage } from './pages/Auth';
import { CreateRecipePage } from './pages/CreateRecipePage/CreateRecipePage';
import { MainPage } from './pages/MainPage/MainPage';
import { RecipePage } from './pages/RecipePage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path='create' element={<CreateRecipePage/>}/>
        <Route path='recipe/:id' element={<RecipePage/>}/>
        <Route path='auth' element={<AuthPage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
