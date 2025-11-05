import Chat from "./pages/Chat"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"

import { SignedIn, SignIn,SignUp, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function App() {
  return (
    <h1>nothing special in here yet</h1>
  )
}



{/* <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/emergency" element={<Emer/>} /> */}
      {/* <Route path="/" element={<Home />} /> */}
    {/* </Routes> */} 