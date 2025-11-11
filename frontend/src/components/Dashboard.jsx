import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { LayoutDashboard,Video,Ambulance, MapPinHouse ,MessageSquare, Pill, FileText, User, Menu, TrendingUp, Plus, Settings2 } from 'lucide-react';
import Dash from './features/Dash';
import { Outlet } from "react-router-dom"

export default function Dashboard() {
  

  return (<>

    <SignedIn>
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-69 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-semibold">C</span>
          </div>
          <h1 className="text-lg font-semibold text-gray-800">Curflix</h1>
        </div>

        <nav className="space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
            <UserButton></UserButton>
            <span className="text-sm">Profile</span>
          </button>
        <NavLink  to="/user/dashboard" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>  
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          
          </NavLink>
          <NavLink to="/user/aidoc" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
            <MessageSquare size={18} />
            <span className="text-sm font-medium">Chat with ai</span>
         
          </NavLink>
<NavLink to="/user/takedose" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
             <Pill size={18} />
            <span className="text-sm font-medium">Take Medicine</span>
          </NavLink>     
                
          <NavLink to="/user/store" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
             <FileText size={18} />
            <span className="text-sm font-medium">Store reports</span>
          </NavLink>   

           <NavLink to="/user/nearbydoc" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
              <MapPinHouse size={18} />
            <span className="text-sm font-medium">Locate Nearby health</span>
          </NavLink>   
      
           <NavLink to="/user/video" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
           <Video size={18} />
            <span className="text-sm font-medium">Video call</span>
          </NavLink>  

           <NavLink to="/user/emergency" className={({isActive})=>`flex items-center  gap-3 w-full px-3 py-2.5  text-gray-900 rounded-lg text-left ${isActive ? "bg-rose-100":""}`}>
             <Ambulance size={18}/>
            <span className="text-sm font-medium">Emergency</span>
          </NavLink>     
        </nav>
      </div>
      <Outlet/>
  
    </div>
    </SignedIn>
    <SignedOut>
 <p>this user</p>
    </SignedOut>
    </>
  );
}