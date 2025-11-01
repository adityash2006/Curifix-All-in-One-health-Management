
import { Link, NavLink } from "react-router-dom"
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";

export default function Navbar() {
  const ctx = useContext(MyContext) || {};
  const setSidebarOpen = ctx.setSidebarOpen || (() => {});

  return (
    <>
    <nav className="bg-white bg-gradient-to-b from-[#ffffff] to-transparent py-3 px-10">
      <div className="text-[#303030] flex justify-between items-center">
        <div>
          <ul className="">
                <img className="inline h-14 mr-4" src="logo.png" alt="Curifix Logo" />
            <li className="inline" >
  
          <NavLink to="/" className={({isActive})=>` italic text-3xl `}>Curifix</NavLink>
        </li>
      </ul>
      </div>
  {/* Desktop links: hidden on small screens */}
  <div className="hidden md:block">
      <ul className="flex  start     rounded-xl font-black bg-[rgb(242,242,231)]  ">
         <li className="rounded-md h-full font-bold cursor-pointer hover:bg-[#D4D4D4] px-5 py-2" >
          <NavLink className={({isActive})=>` ${isActive ? "underline underline-offset-2":""}`} to="/" >Home</NavLink>
        </li>
        <li className="hover:bg-[#D4D4D5] rounded-md font-bold cursor-pointer px-5 pr-5 py-2 ">
          <NavLink to="/signup" className={({isActive})=>` ${isActive ? "underline underline-offset-2":""}`}>Signup</NavLink>
        </li>
        <li className="hover:bg-[#D4D4D4] rounded-md font-bold cursor-pointer px-5 py-2 ">
          <NavLink to="/login" className={({isActive})=>` ${isActive ? "underline underline-offset-2":""}`}>Login</NavLink>
        </li>

      </ul>
      </div>
      <div>
        {/* Mobile hamburger - visible on small screens only */}
        <button
          className="md:hidden mr-3 p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
          onClick={() => setSidebarOpen(true)}
        >
          <i className="fa-solid fa-bars text-xl" />
        </button>

        <button className="bg-[#E9FF5D] text-black font-semibold px-6 py-2 
  rounded-[15px] border-solid border-[#BEcf4c] 
  border-t-[2px] hover:bg-[#D4FF3D] border-r-[2px] border-l-[2px] border-b-[4px] opacity-100">
            <Link to="/chat" className="">Chat with Ai</Link>

</button>

        
    
      </div>
      </div>
    </nav>
    </>

    
    
)


}