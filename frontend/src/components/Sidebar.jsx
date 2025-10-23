import { Link } from "react-router-dom";

// Close Icon
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// This is the Sidebar component for your main navigation (Home, Login, etc.)
// It is controlled by the `isOpen` and `toggleSidebar` props from Navbar.jsx
export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="flex flex-col p-4 space-y-2">
          <Link
            to="/"
            className="text-lg font-medium text-gray-700 hover:bg-gray-100 p-3 rounded-lg"
            onClick={toggleSidebar} // Close sidebar on click
          >
            Home
          </Link>
          <Link
            to="/signup"
            className="text-lg font-medium text-gray-700 hover:bg-gray-100 p-3 rounded-lg"
            onClick={toggleSidebar} // Close sidebar on click
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="text-lg font-medium text-gray-700 hover:bg-gray-100 p-3 rounded-lg"
            onClick={toggleSidebar} // Close sidebar on click
          >
            Login
          </Link>
          
          {/* Mobile Chat Button */}
          <div className="pt-4">
            <Link
              to="/chat"
              className="block w-full text-center bg-[#E9FF5D] text-black font-semibold px-6 py-3 
              rounded-lg border-solid border-[#BEcf4c] border-b-4
              hover:bg-[#D4FF3D] transition-colors duration-200"
              onClick={toggleSidebar} // Close sidebar on click
            >
              Chat with Ai
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}

