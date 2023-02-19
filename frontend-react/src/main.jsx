import React from 'react';
import { UserContextProvider } from './context/userContext';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = window.location.origin + "/api/";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
