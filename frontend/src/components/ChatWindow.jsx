import "../chatwindow.css"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";
import Chat from './AiChat.jsx';
import { Link } from "react-router-dom";
import { UserButton,useAuth } from "@clerk/clerk-react";

export default function ChatWindow() {
 const{ userId} =useAuth();
  const { prompt,setNewChat, setPrompt, reply, setReply, currthreadid, setcurrthreadid, prevChats, setPrevChats, sidebarOpen, setSidebarOpen } = useContext(MyContext);
  const [loading, setloading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [curifixDropdownOpen, setCurifixDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const getreply = async () => {
    // Prevent empty or whitespace-only messages
    if (!prompt.trim()) {
      console.warn("Cannot send empty message");
      return;
    }

    setNewChat(false);
    setloading(true);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currthreadid,
        userid:userId
      }),
    };

    try {
      console.log("req is hit ig");
      let response = await fetch("http://localhost:3000/api/chat", options);
      let g = await response.json();
      
      setReply(g.reply);
      setFetchCount(fetchCount + 1);
    } catch (error) {
      console.log("some error in fetching", error);
    }
    setloading(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setCurifixDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(prevChats.length === 0 && prompt ){
      setPrevChats([
        {
          role: "system",
          content: 'You are Curifix, an AI health assistant. Your role is to provide general health information, symptom guidance, and self-care tips based on user input.  Rules you must always follow: 1. Only answer health-related questions (symptoms, conditions, treatments, prevention, lifestyle, wellness). 2. If a question is unrelated to health, politely refuse and say: "I can only help with health-related questions. Please ask me something about your symptoms or medical concerns." 3. Never provide content outside health and wellness (e.g., jokes, tech, politics, finance)."** 4. Be concise, supportive, and clear. Use simple, easy-to-understand language. Your goal: help users better understand their symptoms, possible causes, and safe next steps, while reminding them to seek real medical care when needed.'
        },
        {
          role: "user",
          content: prompt
        },
        {
          role: "assistant",
          content: reply
        }
      ]);
    } else if (prompt && reply) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt
        },
        {
          role: "assistant",
          content: reply
        }
      ]);
    }
    setPrompt("");
  }, [reply, fetchCount]);

  return (
    <div className="flex w-full flex-col justify-between min-h-screen lg:min-h-0 flex-1">
      <div className="chatnav px-4 lg:px-10 py-5 flex justify-between items-center">
        <div className="flex items-center">
          {/* Hamburger menu for mobile */}
          <button
            className="lg:hidden mr-4 text-xl text-gray-700 hover:text-gray-900"
            onClick={() => setSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          
          {/* Curifix logo with dropdown */}
          <div className="relative dropdown-container">
            <div 
              className="opacity-70 cursor-pointer"
              onMouseEnter={() => setCurifixDropdownOpen(true)}
              onMouseLeave={() => setCurifixDropdownOpen(false)}
              onClick={() => setCurifixDropdownOpen(!curifixDropdownOpen)}
            >
              <span className="text-xl lg:text-2xl italic px-3 lg:px-4 rounded-lg bg-[#f7ffb1] text-black hover:bg-[#f0f7a1] transition-colors">
                Curifix<i className={`text-sm lg:text-lg fa-solid fa-chevron-down ml-1 transition-transform ${curifixDropdownOpen ? 'rotate-180' : ''}`}></i>
              </span>
            </div>
            
            {/* Curifix Dropdown */}
            <div 
              className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
                curifixDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              }`}
              onMouseEnter={() => setCurifixDropdownOpen(true)}
              onMouseLeave={() => setCurifixDropdownOpen(false)}
            >
              <div className="py-2">
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <i className="fa-solid fa-home mr-2"></i>
                  Home
                </Link>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <i className="fa-solid fa-info-circle mr-2"></i>
                  About Curifix Ai
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <i className="fa-solid fa-question-circle mr-2"></i>
                  How it Works
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <i className="fa-solid fa-shield-alt mr-2"></i>
                  Privacy Policy
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                  <i className="fa-solid fa-envelope mr-2"></i>
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile button with dropdown */}
        <div className="relative dropdown-container">
          <div 
            className=" rounded-full h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-200 hover:scale-105"
            // onMouseEnter={() => setProfileDropdownOpen(true)}
            // onMouseLeave={() => setProfileDropdownOpen(false)}
            // onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <UserButton/>
          </div>
          
          {/* Profile Dropdown */}
          <div 
            className={`absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 z-50 ${
              profileDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
            }`}
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
          >
            <div className="py-2">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john.doe@example.com</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <i className="fa-solid fa-tachometer-alt mr-3 w-4"></i>
                Dashboard
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <i className="fa-solid fa-user-cog mr-3 w-4"></i>
                Account Settings
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <i className="fa-solid fa-history mr-3 w-4"></i>
                Chat History
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <i className="fa-solid fa-bell mr-3 w-4"></i>
                Notifications
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-all">
                <i className="fa-solid fa-cog mr-3 w-4"></i>
                Preferences
              </a>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all">
                  <i className="fa-solid fa-sign-out-alt mr-3 w-4"></i>
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Chat />
      
      <div className="chatinput px-4 lg:px-0">
        <div className="text-center relative">
          <input 
            value={prompt} 
            onKeyDown={(e)=>{if(e.key==="Enter"){getreply()}}} 
            onChange={(e)=>setPrompt(e.target.value)} 
            className="text-base lg:text-lg rounded-[4rem] p-3 lg:p-4 pl-4 lg:pl-6 pr-12 lg:pr-17 mb-5 w-full lg:w-[70%] bg-white text-black focus:outline-none focus:ring-[0.2px] shadow-md shadow-black-700" 
            type="text" 
            placeholder="Enter your Symptom" 
            name="" 
            id="" 
          />
          <button 
            onClick={getreply} 
            disabled={!prompt.trim()} 
            className={`absolute right-4 lg:right-[17.5%] top-1/2 transform -translate-y-1/2 ${!prompt.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <i className="text-green-900 hover:text-green-700 cursor-pointer fa-solid fa-paper-plane"></i>
          </button>
          <ScaleLoader color="black" loading={loading} />
        </div>
        <div>
          <p className="text-center text-black mb-4 opacity-80 text-sm lg:text-base px-4">
            Curifix offers guidance, but always consult a doctor for final medical decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
