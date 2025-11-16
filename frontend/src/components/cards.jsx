

function Card1() {

  return (
    <div className="border-3 scale-85 m-4 border-dotted border-gray-300 rounded-3xl flex items-center justify-center  ">
      <div className="w-full max-w-4xl  overflow-hidden md:flex md:flex-row flex-col-reverse  justify-between  m-4 relative ">
        <div className="flex-1 flex justify-center items-center ">
          <img
            src="TakeYourDose.jpg"
            alt="A plate of healthy food including kiwi, oranges, and berries, along with a pill."
            className=" max-w-full h-auto"   
          />
        </div>
        
        <div className="flex-1 p-4 md:p-8">
          <h1 className=" instrument tracking-wide text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-gray-800 mb-4">
            Eat Your Dose
          </h1>
          <p className='text-gray-500 mb-10'>Never miss a dose again! Curifix helps you stay consistent with your medications and care routines.</p>
          <ul className='geist mb-10 list-disc pl-3  '>
<li className="text-sm sm:text-base font-semibold text-black font-inter mb-3">
            Easy Dose Scheduling
          </li>
          <li className="text-sm font-semibold sm:text-base text-black font-inter mb-3">
           Smart Notifications
          </li>
          <li className="text-sm font-semibold sm:text-base text-black font-inter mb-3">
            Peace of Mind for You & Your Family
          </li>
          </ul>
          
         <button className="mt-10 bg-[#E9FF5D] text-black font-semibold px-6 py-2 
  rounded-[15px] border-solid border-[#BEcf4c] 
  border-t-[2px] cursor-pointer border-r-[2px] border-l-[2px] border-b-[4px] opacity-100">
  Get Started
</button>
        </div>
      </div>
    </div>
  );
};


const StyledCard = ({ title, description, imageSrc, buttonText, className, buttonClassName }) => {
  return (
    <div className={`w-full  max-w-sm p-6 bg-white rounded-lg  transition-all duration-300 hover:scale-105  ${className}`}>
      <div className="flex flex-col items-center text-center">
        
        <div className="mb-4">
          <img
            src={imageSrc}
            alt={title}
            className="w-44 h-44 object-contain"
            
            />
        </div>

    
        <h2 className="text-3xl tighter tracking-wider instrument font-bold text-gray-800 mb-2 font-sans">
          {title}
        </h2>

        <p className="text-sm text-gray-600 mb-6 font-sans">
          {description}
        </p>


        <button className={`py-3 cursor-pointer px-8 text-white font-semibold font-sans rounded-full shadow-md transition-colors duration-300 ${buttonClassName}`}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const VideoCallCard = () => {
  return (
    <div className=" border-3 scale-90 mx-4 border-dotted rounded-3xl border-gray-300 flex items-center justify-center mb-20 p-4">
      <div className="w-full max-w-5xl bg-white  overflow-hidden p-8 md:flex md:flex-row items-center relative  ">

       
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        
        <div className=" relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="instrument text-3xl sm:text-4xl lg:text-5xl  text-gray-800 mb-2 font-inter">
            Video Call with the Doctor 
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-inter mb-6">
            Connect with a certified doctor from the comfort of your home. Secure and confidential.
          </p>
          <button className="px-5 py-3 bg-green-500 text-white font-medium rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 cursor-pointer">
            Book an Appointment
          </button>
        </div>

       
        <div className="relative z-10 flex-shrink-0 ml-8 hidden md:block">
            <img
              src="doctor.jpg"
              alt="Doctor waving during a video call"
              className="w-58 h-58 object-cover rounded-full md:w-84 md:h-84"
              />
        </div>
      </div>
    </div>
  );
};

const CheckDiseaseCard = () => {
    return (
      
<div className="flex border-3 scale-90 mx-4 border-dotted rounded-3xl border-gray-300 items-center justify-center mb-20 p-4">
      <div className="w-full max-w-5xl bg-white  overflow-hidden p-8 md:flex md:flex-row items-center relative  ">

       
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-pink-100 rounded-full blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        
        

       
        <div className="relative z-10 flex-shrink-0 ml-8 hidden md:block">
            <img
              src="aisympt.jpg"
              alt="Doctor waving during a video call"
              className="w-58 h-58 object-cover rounded-full md:w-84 md:h-84"
              />
        </div>
        <div className=" ml-2 relative z-10 flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="instrument text-3xl sm:text-4xl lg:text-5xl  text-gray-800 mb-2 font-inter">
            Diagonize with Ai
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-inter mb-6">
            Connect with a certified doctor from the comfort of your home. Secure and confidential.
          </p>
          <button className="px-5 py-3 bg-red-500 text-white font-medium rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105 cursor-pointer">
            Check Symptoms
          </button>
        </div>
      </div>
    </div>
        
      );
    };
    
    export { Card1,StyledCard,VideoCallCard ,CheckDiseaseCard};