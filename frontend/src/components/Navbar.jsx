import { useState } from "react";
import { Link } from "react-router-dom";
// This is the corrected import. It should be "./Sidebar.jsx"
import Sidebar from "./Sidebar.jsx"; 

// Hamburger Menu Icon
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

export default function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className="bg-white bg-gradient-to-b from-[#ffffff] to-transparent py-3 px-6 sm:px-10 sticky top-0 z-20 shadow-sm">
        <div className="text-[#303030] flex justify-between items-center">
          
          {/* Left Side: Logo and Title */}
          <div>
            <ul className="flex items-center">
              {/* Use /logo.png assuming it's in your 'public' folder */}
              <img className="inline h-12 sm:h-14 mr-3" src="/logo.png" alt="Curifix Logo" />
              <li className="inline">
                <Link to="/" className="italic text-2xl sm:text-3xl font-medium">
                  Curifix
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Side: Desktop Nav + Mobile Hamburger */}
          <div className="flex items-center space-x-4">
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4">
              <ul className="flex start rounded-xl font-black bg-[rgb(242,242,231)]">
                <li className="rounded-md h-full font-bold cursor-pointer hover:bg-[#D4D4D4] px-5 py-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:bg-[#D4D4D5] rounded-md font-bold cursor-pointer px-5 pr-5 py-2 ">
                  <Link to="/signup">Signup</Link>
                </li>
                <li className="hover:bg-[#D4D4D4] rounded-md font-bold cursor-pointer px-5 py-2 ">
                  <Link to="/login">Login</Link>
                </li>
              </ul>

              {/* Desktop Chat Button */}
              <button
                className="bg-[#E9FF5D] text-black font-semibold px-6 py-2 
                rounded-[15px] border-solid border-[#BEcf4c] 
                border-t-[2px] hover:bg-[#D4FF3D] border-r-[2px] border-l-[2px] border-b-[4px] opacity-100"
              >
                <Link to="/chat">Chat with Ai</Link>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
                aria-label="Open menu"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Render the Sidebar component */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </>
  );
}

