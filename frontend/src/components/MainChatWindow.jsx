import React, { useContext } from 'react';
// Make sure to import MyContext if it's not provided by the parent page
// import { MyContext } from '../MyContext.jsx'; 

export default function MainChatWindow() {
  // const { prompt, setPrompt, reply, prevChats, ... } = useContext(MyContext);
  
  return (
    // This component flex-1 tells it to take up all remaining space
    <div className="flex-1 flex flex-col h-full bg-gray-50">
      
      {/* Top Header (Optional) */}
      <div className="p-4 border-b bg-white shadow-sm">
        <h2 className="text-xl font-semibold">CuriFix AI Assistant</h2>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* This is where you will map over your prevChats to display messages */}
        <div className="space-y-4">
          <div className="p-4 bg-blue-100 rounded-lg max-w-lg">
            <p className="font-semibold">CuriFix AI</p>
            <p>Hello! How can I help you with your health today?</p>
          </div>
          <div className="flex justify-end">
            <div className="p-4 bg-white border rounded-lg max-w-lg">
              <p className="font-semibold">You</p>
              <p>I have a headache.</p>
            </div>
          </div>
          {/* Example of what you'd render:
          {prevChats.map((chat, index) => (
            ... display chat message ...
          ))}
          */}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            // value={prompt}
            // onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your symptoms here..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            // onClick={handleSend}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
