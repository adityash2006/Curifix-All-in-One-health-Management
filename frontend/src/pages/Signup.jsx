import Navbar from "../components/Navbar"
import { SignupForm } from "../components/Signupform"
import Footer from "../components/Footer";

 
export default function Signup() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-lime-50 relative overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 pointer-events-none">
        {/* Medical cross icons */}
        <div className="absolute top-20 left-10 w-8 h-8 text-emerald-200 opacity-60">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>

        {/* Stethoscope icon */}
        <div className="absolute top-32 right-16 w-12 h-12 text-lime-200 opacity-40">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.5 3.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2v6.5c0 1.1-.9 2-2 2s-2-.9-2-2V2L6.5 3.5 5 2 3.5 3.5 2 2v6.5c0 2.33 1.67 4.24 4 4.72V17c0 1.1.9 2 2 2h1v3h2v-3h1c1.1 0 2-.9 2-2v-3.78c2.33-.48 4-2.39 4-4.72V2l-1.5 1.5z" />
          </svg>
        </div>

        {/* Heart pulse icon */}
        <div className="absolute bottom-32 left-20 w-10 h-10 text-emerald-300 opacity-50">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>

        {/* Medical pill icon */}
        <div className="absolute bottom-20 right-24 w-6 h-6 text-lime-300 opacity-60">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M21.5 9h-19C1.12 9 0 10.12 0 11.5S1.12 14 2.5 14h19c1.38 0 2.5-1.12 2.5-2.5S22.88 9 21.5 9zM2.5 12c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h19c.28 0 .5.22.5.5s-.22.5-.5.5H2.5z" />
          </svg>
        </div>

        {/* DNA helix icon */}
        <div className="absolute top-1/2 left-8 w-8 h-8 text-emerald-200 opacity-40">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>

        {/* Medical bag icon */}
        <div className="absolute top-16 right-32 w-7 h-7 text-lime-200 opacity-50">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-1.84c.78 0 1.42.64 1.42 1.42S15.78 7 15 7s-1.42-.64-1.42-1.42S14.22 4.16 15 4.16zM9 4.16c.78 0 1.42.64 1.42 1.42S9.78 7 9 7s-1.42-.64-1.42-1.42S8.22 4.16 9 4.16z" />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Join Us Today</h2>
              <p className="mt-2 text-gray-600">Create your healthcare account</p>
            </div>
            <SignupForm />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}