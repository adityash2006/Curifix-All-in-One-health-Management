

 function Card3() {

  return (
    <div className="flex gap-6 mb-20">

 
  <div className="border-3 w-full md:w-1/2 scale-85 border-dotted border-gray-300 rounded-3xl flex items-center justify-center">
    <div className="w-full max-w-4xl overflow-hidden md:flex md:flex-row flex-col-reverse justify-between m-4 relative">
      
      <div className="flex-1 scale-75 flex justify-center items-center">
        <img
          src="https://media.lordicon.com/icons/wired/flat/1227-emergency.gif"
          alt="Emergency icon"
          className="max-w-full h-auto"
        />
      </div>

      <div className="flex-1 pt-10">
        <h1 className="instrument tracking-wide text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
          Emergency Assistance
        </h1>
        <br />
        <p className="text-gray-500 mb-10">
Contact emergency support instantly with just a tap. Your safety is our priority.
 </p>

       
      </div>
    </div>
  </div>

 
  <div className="border-3  p-2 w-full md:w-1/2 scale-90 border-dotted rounded-3xl border-gray-300 flex items-center justify-center mb-4">
    <div className="w-full max-w-5xl bg-white overflow-hidden p-4 md:flex md:flex-row items-center relative">

      <div className="relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
        <h1 className="instrument text-3xl sm:text-4xl lg:text-5xl text-gray-800 mb-2">
          Save and Summarize Reports
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Easily save and summarize your medical reports for future reference.  Summarize medical
          history and key information effortlessly.
        </p>

      </div>

      <div className="relative scale-75 z-10 flex-shrink-0 ml-8 hidden md:block">
        <img
          src="https://media.lordicon.com/icons/wired/flat/3-cloud-download.gif"
          alt="Cloud download"
          className="w-58 h-58 object-cover rounded-full md:w-84 md:h-84"
        />
      </div>
    </div>
  </div>

</div>

  );
};


export {Card3};



    
   