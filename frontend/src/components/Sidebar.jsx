import { useContext ,useEffect} from 'react';
import { MyContext } from './MyContext.jsx';
import {v1 as uuidv1} from 'uuid';

export default function Sidebar() {
    const { prevChats,allthreads,setallthreads,setPrevChats,newChat,setNewChat,prompt,setPrompt,reply,setReply,currthreadid,setcurrthreadid} = useContext(MyContext);

    const getallthreads=async ()=>{
        try {
            let a=await fetch("http://localhost:3000/api/thread");
            let b=await a.json();
            const filter=b.map(chat=>({id:chat.threadId,title:chat.title}));
            setallthreads(filter);
        } catch (error) {
            console.log("couldnt fetch all the threads",error);
        }
    }

    useEffect(()=>{
        getallthreads();
    },[currthreadid]);

    const newcha=()=>{
        setPrevChats([]);
        setReply(null);
        setNewChat(true);
        setPrompt("");
        setcurrthreadid(uuidv1());
        console.log("New chat created");
    }
    const changethread=async (newthreadid)=>{
        setcurrthreadid(newthreadid);

        try {
            let a =await fetch(`http://localhost:3000/api/thread/${newthreadid}`);
            let b = await a.json();
            console.log(b);
            setPrevChats(b);
            setReply(null);
            setNewChat(false);
        } catch (error) {
            console.log("Error changing thread:", error);
        }

    }

    const deletethread=async (threadid)=>{

        try {
            let a=await fetch(`http://localhost:3000/api/thread/${threadid}`,{
                method:"DELETE"
            });
            let b=await a.json();
            console.log(b);
            setallthreads((prev)=>prev.filter(chat=>chat.id!==threadid));
            if(currthreadid===threadid){
               newcha();
            }
            
        } catch (error) {
            console.log("Error deleting thread:", error);
            
        }

    }



    return (
        <>
        <div className="relative  side w-85  bg-white h-screen">
            <div className="pr-6 pl-3 py-6 flex justify-between">
        <i className="text-xl opacity-111 text-gray-700 fa-solid fa-briefcase-medical"></i>
        <i className="text-xl text-black opacity-60 fa-solid fa-pen-to-square"></i>
        </div>
        <div className="mb-5 mx-5 flex justify-center items-center text-center text-black border-1 cursor-pointer rounded-lg border-white  hover:border-black">
           <button className='cursor-pointer w-full ' onClick={newcha}>
            New Chat
           </button>
        </div>

        <div className="p-5 history">
            <ul className="cursor-pointer  text-black">

                {
                    allthreads?.map((chat,idx)=>(
                        <li onClick={(e)=>changethread(chat.id)}
                        key={idx} className={chat.id===currthreadid?"highlighted":""}> {chat.title}
                        <i onClick={(e)=>{
                            e.stopPropagation();
                            deletethread(chat.id);
                        }} className="fa-solid fa-trash"></i>
                        </li>
                    ))
                }
        
            </ul>
        </div>


        {/* <div className="border-t-1 absolute bottom-4 w-full">
            <p className="text-center mt-2">Curifix..your personal health assistant</p>
        </div> */}

        </div>
        </>
    )
}