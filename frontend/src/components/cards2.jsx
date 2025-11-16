
import { useState } from 'react'

function Card2() {

  return (
    <div className=" scale-86 border-3 m-4 md:mr-10 border-dotted border-gray-300 rounded-3xl flex items-center justify-center ">
      <div className="w-full max-w-4xl  overflow-hidden md:flex md:flex-row flex-col-reverse  justify-between   relative ">
        <div className="flex-1 flex justify-center items-center ">
          <img
            src="locatenearby.png"
            alt="A plate of healthy food including kiwi, oranges, and berries, along with a pill."
            className=" max-w-full h-auto"   
          />
        </div>
        
        <div className="flex-1 ">
          <h1 className=" instrument tracking-wide text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
           Locate Nearby Health Centers 
          </h1>
          <p className='text-gray-500 mb-10'>Find the best healthcare facilities near you with ease.</p>
          <ul className='geist mb-10 list-disc pl-3  '>
<li className="text-sm sm:text-base font-semibold text-black font-inter mb-3">
            Quick & Easy Search
          </li>
          <li className="text-sm font-semibold sm:text-base text-black font-inter mb-3">
            Comprehensive Listings
          </li>
          <li className="text-sm font-semibold sm:text-base text-black font-inter mb-3">
           Best Quality Care
          </li>
          </ul>
          
         <button class="mt-10 bg-[#E9FF5D] text-black font-semibold px-6 py-2 
  rounded-[15px] border-solid border-[#BEcf4c] 
  border-t-[2px] cursor-pointer border-r-[2px] border-l-[2px] border-b-[4px] opacity-100">
  Search
</button>
        </div>
      </div>
    </div>
  );
};


    export { Card2};