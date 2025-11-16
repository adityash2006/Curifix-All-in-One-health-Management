import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import Chat from "./pages/Chat"
import { ClerkProvider } from '@clerk/clerk-react'
import Takedose from './components/features/Dose.jsx'
import Signupuser from './clerkauth/SignUp'
import Loginuser from './clerkauth/Loginuser'
import Home from "./pages/Home"
import {createBrowserRouter, createRoutesFromElements, Route ,RouterProvider, Routes} from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Dash from './components/features/Dash.jsx'
import Emergency from './components/features/Emergency.jsx'
import Nearbydoc from './components/features/Nearbydoc.jsx'
import Store from './components/features/Store.jsx'
import Video from './components/features/VideoCall.jsx'
import NotFound from './components/Notfound.jsx'
import NearbyHospitalsMap from './components/features/Hospital.jsx'
import SmoothScroll from './utils/Scroll.jsx'
import InfoPage from './components/Info.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
   <>
   {/* CUSTOM PAGES CREATED BY THE TEAM MEMBERS  */}
    {/* <Route path="/login" element={<Login />} />  */}
       {/* <Route path="/signup" element={<Signup />} />  */}
    <Route path="/login" element={<Loginuser />} /> 
    <Route path="/signup" element={<Signupuser />} />
    <Route path="/info" element={<InfoPage/>}></Route>
    
     <Route path="/" element={<Home />} />
    
      <Route path="user" element={<Dashboard/>}>
        <Route path="dashboard" element={<Dash/>}></Route>
        <Route path="aidoc" element={<Chat/>}></Route>
        <Route path="takedose" element={<Takedose/>}></Route>
        <Route path="store" element={<Store/>}></Route>
        <Route path="emergency" element={<Emergency/>}></Route>
        <Route path="video" element={<Video/>}></Route>
        <Route path="nearbydoc" element={<Nearbydoc/>}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
  </>)
)
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

createRoot(document.getElementById('root')).render(
 
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      
      <RouterProvider router={router}/>
     
     </ClerkProvider>
  
)
