import "../chatwindow.css"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";
import Chat from './AiChat.jsx';
import { Link } from "react-router-dom";

export default function ChatWindow() {
  const { prompt,setNewChat, setPrompt, reply, setReply, currthreadid, setcurrthreadid, prevChats, setPrevChats, sidebarOpen, setSidebarOpen } = useContext(MyContext);
  const [loading, setloading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  const [curifixDropdownOpen, setCurifixDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [improving, setImproving] = useState(false);

  const improvePrompt = () => {
  if (!prompt?.trim()) {
    console.warn("No prompt provided for improvement");
    return;
  }

  setImproving(true);

  try {
    let improved = prompt.trim();

    // Phase 1: Basic text normalization
    improved = basicTextNormalization(improved);
    
    // Phase 2: Spelling and grammar corrections
    improved = correctSpellingAndGrammar(improved);
    
    // Phase 3: Health context enhancement
    improved = enhanceHealthContext(improved);
    
    // Phase 4: Final formatting
    improved = finalFormatting(improved);

    setPrompt(improved);
  } catch (err) {
    console.error("Error improving prompt:", err);
    // Optional: revert to original prompt or show error message
  } finally {
    setImproving(false);
  }
};

// Helper functions for better organization
const basicTextNormalization = (text) => {
  let normalized = text;
  
  // Normalize whitespace and remove excessive punctuation
  normalized = normalized.replace(/\s+/g, " ");
  normalized = normalized.replace(/[.!?]{2,}/g, ".");
  normalized = normalized.replace(/,{2,}/g, ",");
  
  return normalized;
};

const correctSpellingAndGrammar = (text) => {
  let corrected = text;
  
  // Common shorthand expansions
  const shorthandMap = {
    "\\bpls\\b": "please",
    "\\bplz\\b": "please",
    "\\bthx\\b": "thanks",
    "\\bthnx\\b": "thanks",
    "\\bu\\b": "you",
    "\\bur\\b": "your",
    "\\bwat\\b": "what",
    "\\bwen\\b": "when",
    "\\bwher\\b": "where",
    "\\bwhy\\b": "why",
    "\\bhow\\b": "how",
    "\\br\\b": "are",
    "\\bim\\b": "I'm",
    "\\bive\\b": "I've",
    "\\bidk\\b": "I don't know",
    "\\bbtw\\b": "by the way",
    "\\bafaik\\b": "as far as I know",
    "\\bomg\\b": "oh my god",
    "\\blol\\b": "",
    "\\brofl\\b": "",
    "\\btbh\\b": "to be honest",
    "\\bimo\\b": "in my opinion",
    "\\bdef\\b": "definitely",
    "\\bprob\\b": "probably",
    "\\bgonna\\b": "going to",
    "\\bwanna\\b": "want to",
    "\\bgotta\\b": "got to",
    "\\binfo\\b": "information",
    "\\bbp\\b": "blood pressure",
    "\\btemp\\b": "temperature",
    "\\bhr\\b": "heart rate",
    "\\bspo2\\b": "oxygen saturation",
    "\\bbmi\\b": "body mass index"
  };

  // Apply shorthand replacements
  for (const [pattern, replacement] of Object.entries(shorthandMap)) {
    corrected = corrected.replace(new RegExp(pattern, "gi"), replacement);
  }

  // Common misspellings in medical/health context
  const misspellMap = {
    "teh": "the", "recieve": "receive", "acheive": "achieve",
    "acheiveing": "achieving", "achne": "acne", "acnee": "acne",
    "sympton": "symptom", "symptons": "symptoms", "feaver": "fever",
    "feverr": "fever", "diarhea": "diarrhea", "diarrhoea": "diarrhea",
    "nusea": "nausea", "nausia": "nausea", "vommit": "vomit",
    "vommiting": "vomiting", "vomitingg": "vomiting", "throath": "throat",
    "sorethroat": "sore throat", "caugh": "cough", "coough": "cough",
    "dizzyness": "dizziness", "diziness": "dizziness", "bloodsugar": "blood sugar",
    "sore-ness": "soreness", "constipationn": "constipation", "allergi": "allergy",
    "allergieses": "allergies", "medicin": "medicine", "medicationn": "medication",
    "paitient": "patient", "dieabetes": "diabetes", "hypertention": "hypertension",
    "cholestrol": "cholesterol", "asthmaa": "asthma", "arthiritis": "arthritis",
    "migrane": "migraine", "fatiguee": "fatigue", "sweting": "sweating",
    "breathingg": "breathing", "heartrate": "heart rate", "headace": "headache",
    "stomache": "stomach", "pregnency": "pregnancy", "pregant": "pregnant"
  };

  // Apply spelling corrections with case preservation
  corrected = corrected.replace(/\b([a-zA-Z-']+)\b/g, (word) => {
    const lower = word.toLowerCase();
    if (misspellMap[lower]) {
      return preserveCase(word, misspellMap[lower]);
    }
    return word;
  });

  // Reduce excessive repeated letters (but keep reasonable ones like "too", "see")
  corrected = corrected.replace(/([a-zA-Z])\1{2,}/g, (match, letter) => {
    // Keep common words with double letters intact
    const commonDoubleLetters = ['oo', 'ee', 'll', 'ss', 'ff', 'pp', 'tt', 'mm', 'nn', 'dd', 'gg', 'rr', 'cc', 'bb'];
    if (commonDoubleLetters.includes(letter + letter) && match.length === 3) {
      return match; // Keep "too", "see", etc.
    }
    return letter + letter; // Reduce others to double letters
  });

  return corrected;
};

const enhanceHealthContext = (text) => {
  let enhanced = text;
  
  const healthKeywords = [
    // Symptoms
    "symptom", "symptoms", "fever", "cough", "pain", "ache", "acne", "nausea", 
    "diarrhea", "allergy", "rash", "headache", "dizziness", "vomit", "vomiting",
    "sore throat", "soreness", "constipation", "fatigue", "sweating", "breathing",
    
    // Conditions
    "health", "medical", "doctor", "hospital", "clinic", "disease", "illness",
    "infection", "virus", "bacterial", "condition", "diagnosis", "treatment",
    
    // Vital signs
    "blood pressure", "bp", "temperature", "temp", "heart rate", "hr", 
    "oxygen", "spo2", "bmi", "weight", "height",
    
    // Body parts
    "head", "stomach", "chest", "back", "arm", "leg", "hand", "foot", "eye",
    "ear", "nose", "throat", "skin", "heart", "lung", "liver", "kidney"
  ];

  const lowerText = enhanced.toLowerCase();
  const hasHealthContext = healthKeywords.some(keyword => lowerText.includes(keyword));
  
  // Only add health context if completely missing and prompt is short/needs context
  if (!hasHealthContext && enhanced.length < 100) {
    // More natural ways to introduce health context
    const healthPrefixes = [
      "I have a health question: ",
      "Regarding a health concern: ",
      "About my health: ",
      "Health-related question: "
    ];
    
    const randomPrefix = healthPrefixes[Math.floor(Math.random() * healthPrefixes.length)];
    enhanced = randomPrefix + enhanced;
  }

  return enhanced;
};

const finalFormatting = (text) => {
  let formatted = text;
  
  // Ensure first letter is capitalized
  formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  
  // Remove any duplicate health prefixes that might have been added
  formatted = formatted.replace(/(Regarding health: )+/g, "Regarding health: ");
  
  // Smart punctuation - only add question mark if it's clearly a question
  const isQuestion = /\b(what|when|where|why|how|who|can|could|will|would|should|is|are|do|does|did|have|has|may|might)\b/i.test(formatted) ||
                    formatted.includes('?') ||
                    formatted.length < 50; // Assume short prompts are questions
  
  if (isQuestion && !/[.?!]$/.test(formatted)) {
    formatted += "?";
  } else if (!/[.?!]$/.test(formatted)) {
    formatted += ".";
  }
  
  // Final whitespace cleanup
  formatted = formatted.replace(/\s+/g, " ").trim();
  
  return formatted;
};

// Helper function to preserve original capitalization
const preserveCase = (original, corrected) => {
  if (original === original.toUpperCase()) {
    return corrected.toUpperCase();
  } else if (original[0] === original[0].toUpperCase()) {
    return corrected.charAt(0).toUpperCase() + corrected.slice(1);
  } else {
    return corrected;
  }
};

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
                  About Curifix
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
            className="bg-blue-400 rounded-full h-8 w-8 lg:h-10 lg:w-10 flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-all duration-200 hover:scale-105"
            onMouseEnter={() => setProfileDropdownOpen(true)}
            onMouseLeave={() => setProfileDropdownOpen(false)}
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
          >
            <i className="fa-solid fa-user text-white"></i>
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
          <div>
            {/* Improve Prompt Button */}
          <button
            onClick={improvePrompt}
            disabled={!prompt.trim() || improving}
            className={`absolute lg:right-[19%] top-1/2 transform -translate-y-1/2 ${
              !prompt.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`}
            title="Improve Prompt"
          >
            {improving ? (
              <i className="fa-solid fa-spinner fa-spin text-yellow-600"></i>
            ) : (
              <i className="fa-solid fa-wand-magic-sparkles text-yellow-500 hover:text-yellow-600"></i>
            )}
          </button>

          &nbsp;&nbsp;  

          {/* Send Button */}
          <button
            onClick={getreply}
            disabled={!prompt.trim()}
            className={`absolute right-4 lg:right-[17.5%] top-1/2 transform -translate-y-1/2 ${
              !prompt.trim() ? "opacity-50 cursor-not-allowed" : ""
            }`} 
            title="Send"
          >
            <i className="text-green-900 hover:text-green-700 cursor-pointer fa-solid fa-paper-plane"></i>
          </button>
          </div>

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
