// This is your existing code, just in a new file.
// Make sure to update the import path for MyContext if needed!
import { useContext, useEffect } from "react";
// Corrected import path assuming MyContext.jsx is in the same 'components' folder or 'src'
import { MyContext } from "../MyContext.jsx"; // Adjust this path if MyContext.jsx is in src/
import { v1 as uuidv1 } from "uuid";

export default function ChatSidebar() {
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
    sidebarOpen, // This is the mobile state for the chat sidebar
    setSidebarOpen,
  } = useContext(MyContext);

  const getallthreads = async () => {
    try {
      // Make sure this port is correct (your backend is on 5000)
      let a = await fetch("http://localhost:5000/api/thread");
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
  };
  
  const changethread = async (newthreadid) => {
    setcurrthreadid(newthreadid);
    try {
      // Make sure this port is correct
      let a = await fetch(`http://localhost:5000/api/thread/${newthreadid}`);
      let b = await a.json();
      setPrevChats(b);
      setReply(null);
      setNewChat(false);
      setSidebarOpen(false); // Close sidebar on mobile after selection
    } catch (error) {
      console.log("Error changing thread:", error);
    }
  };

  const deletethread = async (threadid) => {
    try {
      // Make sure this port is correct
      let a = await fetch(`http://localhost:5000/api/thread/${threadid}`, {
        method: "DELETE",
      });
      let b = await a.json();
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
      {/* Mobile overlay for CHAT sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Chat Sidebar Container */}
      <div
        className={`
          fixed lg:relative top-0 left-0 z-50 lg:z-auto
          w-80 bg-white h-full
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col flex-shrink-0 border-r border-gray-200
        `}
      >
        {/* Header */}
        <div className="pr-6 pl-3 py-4 flex justify-between items-center border-b">
          <span className="font-semibold text-lg ml-2 lg:hidden">
            Chat History
          </span>
          <button
            className="lg:hidden text-2xl text-gray-600 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close chat history"
          >
            &times;
          </button>
          
          <div className="hidden lg:flex justify-between items-center w-full">
            <i className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 fa-solid fa-briefcase-medical"></i>
            <i className="text-xl text-gray-700 cursor-pointer hover:text-gray-900 fa-solid fa-pen-to-square"></i>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            className="cursor-pointer w-full py-2 px-4 text-left
                      text-gray-700 border border-gray-300 rounded-lg 
                      hover:bg-gray-50 flex items-center justify-between"
            onClick={newcha}
          >
            <span>+ New Chat</span>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
        </div>

        {/* History */}
        <div className="p-3 history flex-1 overflow-y-auto">
          <ul className="cursor-pointer text-black space-y-1">
            {allthreads?.map((chat, idx) => (
              <li
                onClick={() => changethread(chat.id)}
                key={idx}
                className={`
                  ${chat.id === currthreadid ? "bg-gray-100 font-semibold" : ""}
                  p-2 rounded-md hover:bg-gray-50 flex justify-between items-center
                  truncate
                `}
              >
                <span className="truncate flex-1 mr-2">{chat.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Don't trigger changethread
                    deletethread(chat.id);
                  }}
                  className="p-1 hover:text-red-500 text-gray-400"
                  aria-label="Delete chat"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

