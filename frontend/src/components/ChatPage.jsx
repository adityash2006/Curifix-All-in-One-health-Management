import React from 'react';
import ChatSidebar from '../components/ChatSidebar.jsx'; // Import the correct sidebar
import MainChatWindow from '../components/MainChatWindow.jsx'; // We will create this

export default function ChatPage() {
  return (
    // This div creates the side-by-side layout
    // h-[calc(100vh-YOUR_NAVBAR_HEIGHT)] is often used if the navbar is sticky
    // For simplicity, let's use h-screen and assume the navbar isn't overlapping
    // Or, more simply, we can just render this page *without* the main navbar.
    
    // This layout fills the whole screen
    <div className="flex h-screen w-full">
      {/* This context provider should wrap your chat page */}
      {/* You'll need to move your MyContext.Provider here from App.jsx */}
      
      <ChatSidebar />
      <MainChatWindow />
    </div>
  );
}
