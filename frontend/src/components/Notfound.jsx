import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white px-6 md:px-16">
      {/* Left Side: SVG */}
      <div className="flex justify-center md:justify-end md:w-1/2 mb-8 md:mb-0 md:pr-52">
        <svg
          fill="#000000"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 106.059 106.059"
          xmlSpace="preserve"
          className="w-56 h-56 md:w-72 md:h-72"
        >
          <g>
            <path
              d="M90.546,15.518C69.858-5.172,36.199-5.172,15.515,15.513C-5.173,36.198-5.171,69.858,15.517,90.547 
              c20.682,20.684,54.341,20.684,75.027-0.004C111.23,69.858,111.229,36.2,90.546,15.518z M84.757,84.758 
              c-17.494,17.494-45.96,17.496-63.455,0.002c-17.498-17.497-17.496-45.966,0-63.46C38.796,3.807,67.261,3.805,84.759,21.302 
              C102.253,38.796,102.251,67.265,84.757,84.758z M77.017,74.001c0.658,1.521-0.042,3.286-1.562,3.943 
              c-1.521,0.66-3.286-0.042-3.944-1.562c-2.893-6.689-9.73-11.012-17.421-11.012c-7.868,0-14.747,4.319-17.522,11.004 
              c-0.479,1.154-1.596,1.851-2.771,1.851c-0.384,0-0.773-0.074-1.15-0.23c-1.53-0.636-2.255-2.392-1.62-3.921 
              c3.71-8.932,12.764-14.703,23.063-14.703C64.174,59.371,73.174,65.113,77.017,74.001z M33.24,38.671 
              c0-3.424,2.777-6.201,6.201-6.201c3.423,0,6.2,2.776,6.2,6.201c0,3.426-2.777,6.202-6.2,6.202 
              C36.017,44.873,33.24,42.097,33.24,38.671z M61.357,38.671c0-3.424,2.779-6.201,6.203-6.201c3.423,0,6.2,2.776,6.2,6.201 
              c0,3.426-2.776,6.202-6.2,6.202S61.357,42.097,61.357,38.671z"
            ></path>
          </g>
        </svg>
      </div>

      {/* Right Side: Text Section */}
      <div className="md:w-1/2 text-center md:text-left md:pl-1 flex flex-col items-center">
        <h1 className="instrument text-9xl font-bold text-[#373934] mb-6 drop-shadow-lg shadow-black">
          404 !
        </h1>
        
        <p className=" text-gray-500 text-2xl mb-6 text-center">
         The page you’re looking for doesn’t exist or has been moved.
          <br />
         
        </p>
<p className="text-black text-2xl"> Redirect back to homepage.
        <button
          onClick={() => navigate("/")}
          className="bg-[#c4ff4d] text-xl text-black px-6 py-2 rounded-full hover:bg-[#88cc00] cursor-pointer transition"
        >
          HOME
        </button></p>
      </div>
    </div>
  );
};

export default Error404;