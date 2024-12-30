import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios';
import LoginPage from './pages/LoginPage/loginPage.jsx';
import ChatPage from './pages/chatPage.jsx';
import SignUpPage from './pages/SignUpPage/signUpPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';

axios.defaults.baseURL = "http://localhost:8080";
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/chat' element={<ChatPage/>}/>
      <Route path='/signUp' element={<SignUpPage/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
