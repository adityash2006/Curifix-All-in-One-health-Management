import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TiltCard from "../components/Scroll";
import {
  Card1,
  StyledCard,
  CheckDiseaseCard,
  VideoCallCard,
} from "../components/cards";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-col items-center justify-center pt-12 md:pt-20 lg:pt-25 bg-white px-4 md:px-8 w-full">
        <div className="w-full flex flex-col items-center justify-center mb-12 md:mb-16">
          <h1
            className="instrument font-bold tracking-tighter text-[#303030] text-center mb-2"
            style={{ fontSize: "clamp(2rem, 10vw, 5rem)" }}
          >
            Your Personal AI
          </h1>
          <div className="flex flex-row items-center justify-center gap-2 md:gap-4 flex-wrap">
            <h1
              className="instrument font-bold tracking-tighter text-[#303030]"
              style={{ fontSize: "clamp(2rem, 10vw, 5rem)" }}
            >
              Health Companion
            </h1>
            <span
              className="italic px-3 sm:px-4 rounded-lg bg-[rgb(233,255,91)] text-[#303030]"
              style={{ fontSize: "clamp(2rem, 10vw, 5rem)" }}
            >
              Curifix
            </span>
          </div>
        </div>
        <span className="mt-6 md:mt-10 mb-8 w-full sm:w-[80%] md:w-[60%] lg:w-[35%] text-center text-sm md:text-base text-[#999999] mx-auto">
          From tracking symptoms to storing reports and finding nearby clinics,
          Curifix keeps your healthcare simple, smart, and accessible
        </span>
        <div className="space-x-5 mb-20">
          <button
            className="mt-10 bg-[#a6Ff8D] text-black font-semibold px-6 py-2
  rounded-[15px] border-solid border-[#BEcf4c]
  border-t-[2px] hover:bg-[#D4FF3D] cursor-pointer border-r-[2px] border-l-[2px] border-b-[4px] opacity-100"
          >
            Get Started
          </button>
          <button
            className="cursor-pointer bg-[#F5F5EB] text-black font-semibold px-6 py-2
  rounded-[15px] opacity-100 border-solid border-[#BEcf4c]
  border-t-[2px] hover:bg-[#D4D4D4] border-r-[2px] border-l-[2px] border-b-[4px]"
          >
            Explore
          </button>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full bg-white px-4 md:px-8 py-8 md:py-16 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 max-w-7xl mx-auto">
          {/* Injection - Hidden on mobile, left on desktop */}
          <div className="hidden md:flex items-end justify-center w-1/3">
            <img
              src="injection.png"
              className="h-60 lg:h-72 w-auto object-contain"
              alt="Injection"
            />
          </div>

          {/* Dashboard - Center */}
          <div className="flex items-center justify-center w-full md:w-1/3">
            <img
              src="dashboard.png"
              className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain"
              alt="Dashboard"
            />
          </div>

          {/* Stethoscope - Hidden on mobile, right on desktop */}
          <div className="hidden md:flex items-end justify-center w-1/3">
            <img
              src="stethoscope.png"
              className="h-60 lg:h-72 w-auto object-contain"
              alt="Stethoscope"
            />
          </div>
        </div>
      </div>

      <Card1></Card1>
      <CheckDiseaseCard></CheckDiseaseCard>
      <VideoCallCard></VideoCallCard>
      <div className="lg:ml-42 instrument flex flex-col items-center justify-center min-h-screen/2 bg-white p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 w-full max-w-6xl">
          <StyledCard
            title="Emergency Call"
            description="Connect instantly to the nearest available ambulance service in your area."
            imageSrc="https://media.lordicon.com/icons/wired/flat/1227-emergency.gif"
            buttonText="Call now"
            className=""
            buttonClassName="bg-red-500 hover:bg-red-600"
          />
          <StyledCard
            title="Save Reports"
            description="Easily store and access your reports for future reference. Never lose track of your data again."
            imageSrc="https://media.lordicon.com/icons/wired/flat/3-cloud-download.gif"
            buttonText="Learn more"
            className=""
            buttonClassName="bg-blue-500 hover:bg-blue-600"
          />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
