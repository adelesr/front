import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios';
import LoginPage from './pages/LoginPage/loginPage.jsx';
import ChatHomePage from './pages/ChatHomePage.jsx';
import SignUpPage from './pages/SignUpPage/signUpPage.jsx';
import MemoryGamePage from './pages/MemoryGamePage/MemoryGamePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';


axios.defaults.baseURL = "http://localhost:8080";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatHomePage></ChatHomePage>
   {/* <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/chat' element={<ChatHomePage/>}/>
      <Route path='/signUp' element={<SignUpPage/>}/>
      <Route path='/memory-game' element={<MemoryGamePage/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
