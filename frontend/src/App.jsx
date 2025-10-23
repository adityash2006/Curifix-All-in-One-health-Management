import Chat from "./pages/Chat"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Contact from "./pages/Contact"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import './App.css'
function App() {
  
  return (
    <>
    
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
    </Routes>
    
    </>
  )
}

export default App
