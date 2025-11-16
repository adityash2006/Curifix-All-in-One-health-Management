import { useState } from 'react';
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white bg-gradient-to-b from-[#ffffff] to-transparent py-3 px-4 md:px-10">
      <div className="text-[#303030] flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <img className="h-10 md:h-14 mr-2 md:mr-4" src="logo.png" alt="Curifix Logo" />
          <NavLink to="/" className="italic text-xl md:text-3xl">
            Curifix
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:block">
          <ul className="flex rounded-xl font-black bg-[rgb(242,242,231)]">
            <li className="rounded-md h-full font-bold cursor-pointer duration-400 hover:bg-[#D4D4D4] px-5 mr-1 py-2">
              <NavLink 
                className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`} 
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="hover:bg-[#D4D4D5] rounded-md duration-400 font-bold cursor-pointer px-5 mr-1 py-2">
              <NavLink 
                to="/signup" 
                className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`}
              >
                Signup
              </NavLink>
            </li>
            <li className="hover:bg-[#D4D4D4] rounded-md font-bold duration-400 cursor-pointer px-5 py-2">
              <NavLink 
                to="/login" 
                className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`}
              >
                Login
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Desktop Dashboard Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:block bg-[#E9FF5D] text-black font-semibold px-4 md:px-6 py-2 rounded-[15px] border-solid border-[#BEcf4c] border-t-[2px] hover:bg-[#D4FF3D] border-r-[2px] border-l-[2px] border-b-[4px] text-sm md:text-base">
            <Link to="/signup">Dashboard</Link>
          </button>

          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden flex flex-col gap-1 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#303030] transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#303030] transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-[#303030] transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
        <ul className="flex flex-col gap-2 rounded-xl text-black bg-[rgb(242,242,231)] p-2">
          <li className="rounded-md font-bold hover:bg-[#D4D4D4] px-5 py-3">
            <NavLink 
              className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`} 
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="rounded-md font-bold hover:bg-[#D4D4D5] px-5 py-3">
            <NavLink 
              to="/signup" 
              className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Signup
            </NavLink>
          </li>
          <li className="rounded-md font-bold hover:bg-[#D4D4D4] px-5 py-3">
            <NavLink 
              to="/login" 
              className={({isActive}) => `${isActive ? "underline underline-offset-2" : ""}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </NavLink>
          </li>
          <li className="sm:hidden rounded-md font-bold bg-[#E9FF5D] hover:bg-[#D4FF3D] px-5 py-3 border-solid border-[#BEcf4c] border-t-[2px] border-r-[2px] border-l-[2px] border-b-[4px]">
            <Link 
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}