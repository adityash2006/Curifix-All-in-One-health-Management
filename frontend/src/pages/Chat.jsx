import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { MyContext } from '../components/MyContext.jsx';
import {v1 as uuidv1} from 'uuid';
import Navbar from '../components/Navbar.jsx';

function Chat() {
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currthreadid,setcurrthreadid]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState([]);
  const [newChat,setNewChat]=useState(true);
  const [allthreads,setallthreads]=useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const providerValues={prevChats,allthreads,setallthreads,setPrevChats,newChat,setNewChat,prompt,setPrompt,reply,setReply,currthreadid,setcurrthreadid,sidebarOpen,setSidebarOpen,editingMessage,setEditingMessage,editingIndex,setEditingIndex};

  return (
    <div className='app flex h-screen overflow-hidden'>
      <MyContext.Provider value={providerValues}>
      <Sidebar />
      <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default Chat
