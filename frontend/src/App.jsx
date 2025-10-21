import Chat from "./pages/Chat"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import HealthPlan from "./pages/HealthPlan"
import './App.css'
function App() {
  
  return (
    <>
    
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
      <Route path="/health-plan" element={<HealthPlan />} />
    </Routes>
    
    </>
  )
}

export default App
