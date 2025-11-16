import { SignedIn,SignUp, SignedOut, UserButton,useUser } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { dark, neobrutalism } from '@clerk/themes'
import { useEffect } from "react";


 export default function Signupuser(){
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
    useEffect(() => {
    if (isSignedIn) {
      navigate("/user/dashboard"); 
    }
  }, [isSignedIn, navigate]);
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Run once user info is ready
      fetch(import.meta.env.VITE_SOCKET_SERVER+ "/api/users/adduser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          username:user.username
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ User synced:", data))
        .catch((err) => console.error("❌ Sync error:", err));
    }
  }, [isLoaded, isSignedIn, user]);

    return <>
     <Navbar></Navbar>
     <div className="flex justify-center min-h-[600px] items-center my-15">
<SignedOut>
      <SignUp signInUrl="/login"
        appearance={{
          variables:{
         
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
            card: { boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
               
             },
             footerActionLink: {
             "&:hover": {
          color: "#1e40af", },
        color: "black", // make it green
 
      },
             
          },
        }}
      />
      

      </SignedOut>

      <SignedIn>
        <UserButton></UserButton>
       
        <p className='text-black text-3xl'>You are already Signed in go to your dashboard</p>
              <p> <button className='border-3 border-black text-black rounded-lg p-2 m-2'><Link to="/user/dashboard">Dashboard</Link></button> </p>

      </SignedIn>
    </div>
    
     {isLoaded && <Footer></Footer>}
     
    </>
 }