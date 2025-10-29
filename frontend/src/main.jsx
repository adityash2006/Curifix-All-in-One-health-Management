import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'

import Chat from "./pages/Chat"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

import Home from "./pages/Home"
import {createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom'
import {GoogleOAuthProvider} from '@react-oauth/google'

const router=createBrowserRouter(
  createRoutesFromElements(
   <> <Route path="/chat" element={<Chat />} />
    <Route path="/login" element={<Login />} /> 
    <Route path="/signup" element={<Signup />} /> 
    
     <Route path="/" element={<Home />} />
  </>)
)

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <GoogleOAuthProvider clientId={CLIENT_ID}>
  <RouterProvider router={router}/>
    </GoogleOAuthProvider>
     
  </StrictMode>,
)
