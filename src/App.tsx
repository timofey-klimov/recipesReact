import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { CreateRecipePage } from './pages/CreateRecipePage/CreateRecipePage';
import { MainPage } from './pages/MainPage/MainPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<MainPage/>}/>
        <Route path='create' element={<CreateRecipePage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
