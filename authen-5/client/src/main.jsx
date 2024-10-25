import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home.jsx';
import Error from './components/Error.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/Profile",
        element: <Profile></Profile>,
      },
    ]
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   < RouterProvider router={router} />
  </StrictMode>,
)
