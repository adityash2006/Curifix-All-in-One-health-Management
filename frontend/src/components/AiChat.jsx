import "../Chat.css";
import { MyContext } from "./MyContext";
import { useContext,useEffect,useState,useRef } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Swal from 'sweetalert2';

export default function AiChat() {
    const chatRef = useRef(null);
    let {newChat,setNewChat,prevChats,reply,setPrevChats}=useContext(MyContext);
    const [latestReply,setLatestReply]=useState(null);
    const handlecopy=(text)=>{
        navigator.clipboard.writeText(text)
        .then(()=>Swal.fire({
            title:"Copied !",
            icon:'success',
            timer:2000,
            showConfirmButton:false
        }))
        .catch(()=>Swal.fire({
            title:'Copy Failed',
            text:'Failed',
            timer:3000,
            showConfirmButton:false
        }));
    };
    useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [prevChats]);

    useEffect(()=>{
        if(reply===null) {
            setLatestReply(null);
            return;
        }
        if(!prevChats.length) return;
        const content=reply.split(" ");
        let idx=0;
        const interval=setInterval(()=>{
            setLatestReply(content.slice(0,idx).join(" "));
            idx++;
            if(idx>content.length) clearInterval(interval);
        },40);
        return () => clearInterval(interval);

    },[reply,prevChats])

    const handleSpeak = (text) => {
        if (!text) return;

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1; // normal speed
        utterance.pitch = 1; // normal pitch
        window.speechSynthesis.speak(utterance);
    };
    
    return (
        <>
            {newChat && 
            <div>
                <p className="font-bold text-2xl lg:text-4xl z-10 relative top-20 lg:top-35 instrument tracking-wide text-yellow-600 text-center px-4">Start a new Chat !</p>
            </div>
            }

            <div ref={chatRef} className="chats text-center mx-4 sm:mx-8 md:mx-16 lg:mx-20 xl:mx-30 ">
                {
                    prevChats?.slice(1).slice(0,-1).map((chat,idx)=>
                        <div className={chat.role==="user"?"userprompt":"aiprompt"} key={idx}>
                            {
                                chat.role==="user"?
                                <div className="relative inline-block text-left max-w-full lg:max-w-110 mt-2">
                                    <span className="inline-block text-base lg:text-lg text-black mb-7 rounded-lg p-2 px-3 bg-[#f7ffb1] break-words">{chat.content}</span>
                                    <div className="group absolute bottom-1 right-1">
                                        <button
                                            className="text-gray-700 hover:text-black cursor-pointer"
                                            onClick={() => handlecopy(chat.content)}
                                        >
                                            <i className="fa-solid fa-copy"></i>
                                        </button>

                                        {/* Tooltip */}
                                        <span className="absolute right-0 mb-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                            Copy
                                        </span>
                                    </div>
                                </div>
                                :
                                <div className="markdown-content text-black text-left max-w-full">
                                    <ReactMarkdown 
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {chat.content}
                                    </ReactMarkdown>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <div className="group relative inline-block">
                                            <button
                                                className="text-gray-700 hover:text-black cursor-pointer"
                                                onClick={() => handlecopy(chat.content)}
                                            >
                                                <i className="fa-solid fa-copy"></i>
                                            </button>

                                            {/* Tooltip below the button */}
                                            <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                                Copy
                                            </span>
                                        </div>
                                        <div className="group relative inline-block">
                                            <button
                                                className="text-gray-700 hover:text-black cursor-pointer"
                                                onClick={() => handleSpeak(chat.content)}
                                                title="Speak"
                                            >
                                                <i className="fa-solid fa-volume-up"></i>
                                            </button>

                                            {/* Tooltip */}
                                            <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                                Speak
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
                {prevChats.length > 0 && latestReply === null ? (
                    <div className="aiprompt text-black text-left max-w-full" key={"non-typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {prevChats[prevChats.length - 1].content}
                        </ReactMarkdown>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <div className="group relative inline-block">
                                <button
                                    className="text-gray-700 hover:text-black cursor-pointer"
                                    onClick={() => handlecopy(prevChats[prevChats.length - 1].content)}
                                >
                                    <i className="fa-solid fa-copy"></i>
                                </button>

                                <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                    Copy
                                </span>
                            </div>

                            <div className="group relative inline-block">
                                <button
                                    className="text-gray-700 hover:text-black cursor-pointer"
                                    onClick={() => handleSpeak(prevChats[prevChats.length - 1].content)}
                                    title="Speak"
                                >
                                    <i className="fa-solid fa-volume-up"></i>
                                </button>
                                {/* Tooltip */}
                                <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                    Speak
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="aiprompt text-black text-left max-w-full" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {latestReply}
                        </ReactMarkdown>
                        {latestReply && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                <div className="group relative inline-block">
                                    <button
                                        className="text-gray-700 hover:text-black cursor-pointer"
                                        onClick={() => handlecopy(latestReply)}
                                    >
                                        <i className="fa-solid fa-copy"></i>
                                    </button>

                                    <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                        Copy
                                    </span>
                                </div>
                                <div className="group relative inline-block">
                                    <button
                                        className="text-gray-700 hover:text-black cursor-pointer"
                                        onClick={() => handleSpeak(latestReply)}
                                        title="Speak"
                                    >
                                        <i className="fa-solid fa-volume-up"></i>
                                    </button>

                                    {/* Tooltip */}
                                    <span className="absolute top-full mt-1 hidden group-hover:block bg-gray-800 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap shadow-md">
                                        Speak
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
