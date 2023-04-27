import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import Category from './Category/Category';
import Quiz from './Quiz/Quiz';
import LoginPage from './Login/LoginPage';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Header from './components/Header';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(

  //<React.StrictMode>
  <App />
  //</React.StrictMode>
);


