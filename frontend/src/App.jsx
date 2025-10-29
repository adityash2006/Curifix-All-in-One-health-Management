import Chat from "./pages/Chat"
import {Routes,Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from "./components/Navbar"
// import Emer from "./components/Emer"/
import Home from "./pages/Home"

function App() {
  
  return (
    <>
    
    <Routes>
      <Route path="/chat" element={<Chat />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      {/* <Route path="/emergency" element={<Emer/>} /> */}
      <Route path="/" element={<Home />} />
    </Routes>
    
    </>
  )
}

export default App
