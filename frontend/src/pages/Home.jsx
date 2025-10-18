import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TiltCard from "../components/Scroll";
import { Card1,StyledCard,CheckDiseaseCard,VideoCallCard } from "../components/cards";
import Footer from "../components/Footer";


export default function Home() {
    return (<>
    <Navbar></Navbar>
        <div className=" flex flex-col items-center pt-25  min-h-screen/2 bg-white">
            <h1 className="instrument text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight inline text-[#303030] text-center">Your Personal AI </h1>
                        <h1 className="instrument text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter inline text-[#303030] text-center"> Health Companion<span className="text-4xl sm:text-5xl lg:text-7xl italic px-2 sm:px-4 rounded-lg bg-[rgb(233,255,91)] ml-2 sm:ml-4 whitespace-nowrap">Curifix</span></h1>
<span className="mt-8 md:mt-10 w-full max-w-lg md:w-[35%] text-center text-[#999999] px-2 text-sm sm:text-base">
           From tracking symptoms to storing reports and finding nearby clinics, Curifix keeps your healthcare simple, smart, and accessible </span>
          <div className="space-x-5 mb-20"> <button class="mt-10 bg-[#a6Ff8D] text-black font-semibold px-6 py-2 
  rounded-[15px] border-solid border-[#BEcf4c] 
  border-t-[2px] hover:bg-[#D4FF3D] cursor-pointer border-r-[2px] border-l-[2px] border-b-[4px] opacity-100">
  Get Started
</button>
<button class="cursor-pointer bg-[#F5F5EB] text-black font-semibold px-6 py-2 
  rounded-[15px] opacity-100 border-solid border-[#BEcf4c] 
  border-t-[2px] hover:bg-[#D4D4D4] border-r-[2px] border-l-[2px] border-b-[4px]">
  Explore
</button>
{/* <TiltCard /> */}
</div>

</div> 
<div className="flex justify-center items-end px-2 sm:px-4 mb-20 md:mb-32">
  <div></div>
  <div className="hidden md:block w-1/4 max-w-[w-150px] lg:max-w-[200px] self-start translate-y-[-20px] md-translate-y-[-50px] lg:translate-y-[-80px] mr-[-10px]">
    <img src="injection.png" className="" alt="Injection" />

  </div>
  <div className="w-full max-w-3xl">
  <img src="dashboard.png" className="w-full h-auto object-contain" alt="Dashboard" />
  </div>
  <div className="hidden md:block w-1/4 max-w-[150px] lg:max-w-[200px] self-start translate-y-[-20px] md:translate-y-[-50px] lg:translate-y-[-80px] ml-[-10px]">
    <img src="stethoscope.png" className="" alt="Stethoscope" />
  </div>
</div>


<Card1></Card1>
        
        
    <CheckDiseaseCard></CheckDiseaseCard>
    <VideoCallCard></VideoCallCard>
    <div className="instrument flex flex-col items-center justify-center min-h-screen/2 bg-white p-6">
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Emergency Call Card */}
        <StyledCard
          title="Emergency Call"
          description="Connect instantly to the nearest available ambulance service in your area."
          imageSrc="https://media.lordicon.com/icons/wired/flat/1227-emergency.gif" // Placeholder for ambulance icon
          buttonText="Call now"
          className="" // Individual styling for this card
          buttonClassName="bg-red-500 hover:bg-red-600"
        />

        {/* Period Tracker Card */}
        {/* <StyledCard
          title="Period Tracker"
          description="Track your cycle, predict your fertile window, and understand your body better."
          imageSrc="Period.jpg" // Placeholder image for icon
          buttonText="Learn more"
          className="" // Individual styling for this card
          buttonClassName="bg-purple-500 hover:bg-purple-600"
        /> */}

        {/* Save Reports Card */}
        <StyledCard
          title="Save Reports"
          description="Easily store and access your reports for future reference. Never lose track of your data again."
          imageSrc="https://media.lordicon.com/icons/wired/flat/3-cloud-download.gif" // Placeholder image for icon
          buttonText="Learn more"
          className="" // Individual styling for this card
          buttonClassName="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
    <Footer></Footer>
        </>
    );
}