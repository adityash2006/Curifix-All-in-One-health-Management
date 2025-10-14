import { useState } from "react"
import {Link} from "react-router-dom"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRequirements = [
    { text: "At least 8 characters", met: password.length >= 8 },
    { text: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { text: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { text: "Contains number", met: /\d/.test(password) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-gray-700 block">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="John"
            className="w-full text-black h-11 px-3 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-gray-700 block">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            className="w-full text-black h-11 px-3 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="john@example.com"
          className="w-full text-black h-11 px-3 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            className="w-full text-black h-11 px-3 pr-10 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
        {password && (
          <div className="space-y-2 mt-3">
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${
                    req.met ? "bg-lime-500 text-white" : "bg-gray-200 border border-gray-300"
                  }`}
                >
                  {req.met && "✓"}
                </div>
                <span className={`text-xs ${req.met ? "text-lime-600" : "text-gray-500"}`}>{req.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 block">
          Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="text-black w-full h-11 px-3 pr-10 bg-white/70 border border-gray-200 focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20 rounded-lg outline-none transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <input
          id="terms"
          type="checkbox"
          className="w-4 h-4 text-lime-500 bg-white border-gray-300 rounded focus:ring-lime-400/20 mt-0.5"
          required
        />
        <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
          I agree to the{" "}
          <Link href="/terms" className="text-lime-600 hover:text-lime-500 transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-lime-600 hover:text-lime-500 transition-colors">
            Privacy Policy
          </Link>
        </label>
      </div>

      <button
        type="submit"
        className="w-full h-11 bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-white font-medium transition-all duration-200 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:text-lime-500 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  )
}
