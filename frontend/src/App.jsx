import Chat from "./pages/Chat.jsx";
import { Routes, Route, Outlet } from "react-router-dom"; // Import Outlet
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import './App.css';

/**
 * This component wraps your main pages (Home, Login, Signup)
 * and ensures the Navbar is displayed on them.
 */
const MainLayout = () => {
  return (
    <>
      <Navbar />
      {/* The Outlet renders the child route (e.g., <Home />, <Login />) */}
      <Outlet /> 
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* This is the layout route. All nested routes (Home, Login, Signup)
        will be rendered inside the MainLayout component, so they will
        all have the Navbar.
      */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} /> {/* Renders at / */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* This route is separate. It renders ONLY the Chat component,
        so it will not have the main Navbar.
      */}
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;

