import "../chatwindow.css"
import { useContext,useEffect,useState } from "react";
import { MyContext } from "./MyContext.jsx";
import {ScaleLoader} from "react-spinners";
import Chat from './AiChat.jsx';
import { Link } from "react-router-dom";

export default function ChatWindow() {
  const { prompt,setNewChat, setPrompt, reply, setReply, currthreadid, setcurrthreadid, prevChats, setPrevChats } = useContext(MyContext);
  const [loading,setloading]=useState(false);
    const [fetchCount, setFetchCount] = useState(0);

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
      }),
    };

    try {
      console.log("req is hit ig");
      let response = await fetch("http://localhost:3000/api/chat", options);
      let g = await response.json();
      console.log(g.reply);
      setReply(g.reply);
      setFetchCount(fetchCount + 1);
    } catch (error) {
      console.log("some error in fetching", error);
    }

    setloading(false);
  };

  useEffect(() => {
    if(prevChats.length===0 && prompt ){
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

    }
    else if (prompt && reply) {
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
  }, [reply,fetchCount]);

  return (
    <div className="flex w-full flex-col justify-between">
      <div className="chatnav px-10 py-5 flex justify-between">
        <div className="opacity-70">
        
        <span className="text-2xl italic px-4 rounded-lg bg-[#f7ffb1] ml-4 text-black">Curifix<i className="text-lg fa-solid fa-chevron-down"></i></span>
        </div>
        <div className="bg-blue-400 rounded-full h-6 w-6 flex items-center justify-center">
          <i className="fa-solid fa-user "></i>
        </div>
      </div>
      
      <Chat></Chat>
         
      <div className="chatinput">
        <div className="text-center relative">
          <input value={prompt} onKeyDown={(e)=>{if(e.key==="Enter"){getreply()}}} onChange={(e)=>setPrompt(e.target.value)} className="text-lg rounded-[4rem] p-4 pl-6 pr-17 mb-5 w-[70%] bg-white text-black focus:outline-none focus:ring-[0.2px]  shadow-md shadow-black-700" type="text" placeholder="Enter your Symptom" name="" id="" />
         <button 
            onClick={getreply} 
            disabled={!prompt.trim()} 
            className={!prompt.trim() ? "opacity-50 cursor-not-allowed" : ""}
          >
            <i className="absolute right-[17.5%] text-green-900 hover:text-green-700 cursor-pointer top-7.5 transform -translate-y-1/2 fa-solid fa-paper-plane"></i>
          </button>
         <ScaleLoader color="black" loading={loading}>
        </ScaleLoader>
        </div>
        <div>
          <p className="text-center text-black mb-4 opacity-80">
Curifix offers guidance, but always consult a doctor for final medical decisions.            </p>
        </div>
        </div>

    
    </div>
  );
}
