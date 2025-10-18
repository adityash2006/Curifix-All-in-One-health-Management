import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";

export default function Sidebar() {
  const {
    prevChats,
    allthreads,
    setallthreads,
    setPrevChats,
    newChat,
    setNewChat,
    prompt,
    setPrompt,
    reply,
    setReply,
    currthreadid,
    setcurrthreadid,
    sidebarOpen,
    setSidebarOpen,
  } = useContext(MyContext);

  const getallthreads = async () => {
    try {
      let a = await fetch("http://localhost:3000/api/thread");
      let b = await a.json();
      const filter = b.map((chat) => ({
        id: chat.threadId,
        title: chat.title,
      }));
      setallthreads(filter);
    } catch (error) {
      console.log("couldnt fetch all the threads", error);
    }
  };

  useEffect(() => {
    getallthreads();
  }, [currthreadid]);

  const newcha = () => {
    setPrevChats([]);
    setReply(null);
    setNewChat(true);
    setPrompt("");
    setcurrthreadid(uuidv1());
    console.log("New chat created");
  };
  const changethread = async (newthreadid) => {
    setcurrthreadid(newthreadid);

    try {
      let a = await fetch(`http://localhost:3000/api/thread/${newthreadid}`);
      let b = await a.json();
      console.log(b);
      setPrevChats(b);
      setReply(null);
      setNewChat(false);
    } catch (error) {
      console.log("Error changing thread:", error);
    }
  };

  const deletethread = async (threadid) => {
    try {
      let a = await fetch(`http://localhost:3000/api/thread/${threadid}`, {
        method: "DELETE",
      });
      let b = await a.json();
      console.log(b);
      setallthreads((prev) => prev.filter((chat) => chat.id !== threadid));
      if (currthreadid === threadid) {
        newcha();
      }
    } catch (error) {
      console.log("Error deleting thread:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={`
        fixed lg:relative top-0 left-0 z-50 lg:z-auto
        side w-80 lg:w-85 bg-white h-screen
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="pr-6 pl-3 py-6 flex justify-between items-center">
          <i className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300 fa-solid fa-briefcase-medical"></i>
          <i className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 transition duration-300 fa-solid fa-pen-to-square"></i>
          {/* Close button for mobile */}
          <button
            className="lg:hidden text-xl text-gray-700 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <div className="mb-5 mx-5 flex justify-center items-center text-center text-black border-1 cursor-pointer rounded-lg border-white hover:border-black">
          <button className="cursor-pointer w-full py-2" onClick={newcha}>
            New Chat
          </button>
        </div>

        <div className="p-5 history flex-1 overflow-y-auto">
          <ul className="cursor-pointer text-black">
            {allthreads?.map((chat, idx) => (
              <li
                onClick={(e) => {
                  changethread(chat.id);
                  // Close sidebar on mobile after selecting chat
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                key={idx}
                className={`
                  ${chat.id === currthreadid ? "highlighted" : ""}
                  p-2 rounded hover:bg-gray-100 flex justify-between items-center
                  truncate
                `}
              >
                <span className="truncate flex-1">{chat.title}</span>
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    deletethread(chat.id);
                  }}
                  className="fa-solid fa-trash ml-2 hover:text-red-500"
                ></i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
