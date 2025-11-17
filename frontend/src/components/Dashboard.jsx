import { useState } from 'react';
import { SignedIn, SignedOut, UserButton, RedirectToSignIn } from '@clerk/clerk-react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Video, 
  Ambulance, 
  MapPinHouse, 
  MessageSquare, 
  Pill, 
  FileText, 
  Menu, 
  X 
} from 'lucide-react';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-gray-50 overflow-hidden">
          {/* Mobile Overlay */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-gray-50  bg-opacity-50 z-40 lg:hidden"
              onClick={closeSidebar}
            />
          )}

          {/* Sidebar */}
          <div className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 lg:w-69 bg-white border-r border-gray-200 p-6
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
          `}>
            {/* Close Button (Mobile Only) */}
            <button
              onClick={closeSidebar}
              className="lg:hidden absolute top-4 right-4 p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">C</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-800">Curifix</h1>
            </div>

            {/* Navigation */}
            <nav className="space-y-1">
              <button className="flex items-center gap-3 w-full px-3 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <UserButton />
                <span className="text-sm">Profile</span>
              </button>

              <NavLink
                to="/user/dashboard"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-medium">Dashboard</span>
              </NavLink>

              <NavLink
                to="/user/aidoc"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <MessageSquare size={18} />
                <span className="text-sm font-medium">Chat with AI</span>
              </NavLink>

              <NavLink
                to="/user/takedose"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <Pill size={18} />
                <span className="text-sm font-medium">Take Medicine</span>
              </NavLink>

              <NavLink
                to="/user/store"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <FileText size={18} />
                <span className="text-sm font-medium">Store Reports</span>
              </NavLink>

              <NavLink
                to="/user/nearbydoc"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <MapPinHouse size={18} />
                <span className="text-sm font-medium">Locate Nearby Health</span>
              </NavLink>

              <NavLink
                to="/user/video"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <Video size={18} />
                <span className="text-sm font-medium">Video Call</span>
              </NavLink>

              <NavLink
                to="/user/emergency"
                onClick={closeSidebar}
                className={({isActive}) => `flex items-center gap-3 w-full px-3 py-2.5 text-gray-900 rounded-lg text-left transition-colors ${isActive ? "bg-rose-100" : "hover:bg-gray-50"}`}
              >
                <Ambulance size={18} />
                <span className="text-sm font-medium">Emergency</span>
              </NavLink>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header with Menu Button */}
            <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                aria-label="Open sidebar"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-semibold">C</span>
                </div>
                <h1 className="text-lg font-semibold text-gray-800">Curifix</h1>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/login" />
      </SignedOut>
    </>
  );
}