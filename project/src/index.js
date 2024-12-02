import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Profile from './profile';
import Home from './Home';
import About from './About'

const root = ReactDOM.createRoot(document.getElementById('root'));
const isLoggedIn = localStorage.getItem('id') !== null;
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/About" element={<About/>}/>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
