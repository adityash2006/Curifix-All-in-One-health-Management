import { SignedIn, SignIn,SignUp, SignedOut, SignInButton, useSignUp,UserButton } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { dark, neobrutalism } from '@clerk/themes';
import Dashboard from '../components/Dashboard';
import { Link } from 'react-router-dom';
 export default function Loginuser(){
    const {isLoaded}=useSignUp();
    return <>
    <Navbar></Navbar>
  
    <div className="flex justify-center items-center min-h-[600px] ">
        <SignedOut>
      <SignIn signUpUrl="/signup"
        appearance={{variables:{
            
        },
            theme: neobrutalism,
          elements: {formButtonPrimary: {
            "&:hover": {
          background: "#E9FEED", },
            background:"#E9FF5D",
        color: "black",
        border: "3px solid black",
        boxShadow: "3px 3px 0 0 black",
      },
            card: { boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
          
         footerActionLink: { "&:hover": {
          color: "#1e40af", },
        color: "black", // make it green
 
      }},
        }}
      />
      </SignedOut>
      <SignedIn>
        
     <UserButton></UserButton>   <p className='text-black text-3xl'>You are already Signed in go to your dashboard</p>
       <br /> 
      <p> <button className='border-3 border-black text-black rounded-lg p-2 m-2'><Link to="/user/dashboard">Dashboard</Link></button> </p>

      </SignedIn>
    </div>
   {isLoaded && <Footer></Footer>} 
    
    </>
 }