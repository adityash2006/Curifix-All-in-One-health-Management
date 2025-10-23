import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert(result.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1
              className="instrument font-bold tracking-tighter text-[#303030] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
            >
              Get in Touch
            </h1>
            <p className="text-[#999999] text-lg md:text-xl max-w-2xl mx-auto">
              Have questions about Curifix? Need support with your health management? 
              We're here to help you on your wellness journey.
            </p>
          </div>
        </div>

        {/* Contact Content */}
        <div className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="instrument text-3xl font-bold text-[#303030] mb-6">
                    Contact Information
                  </h2>
                  <p className="text-[#666666] text-lg mb-8">
                    Reach out to us through any of these channels. We typically respond within 24 hours.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {/* Email Card */}
                  <div className="bg-[#F5F5EB] rounded-2xl p-6 border border-[#E0E0E0] hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#E9FF5D] rounded-full p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-[#303030]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="start text-lg font-semibold text-[#303030] mb-2">Email Us</h3>
                        <p className="text-[#666666] mb-2">Send us an email anytime</p>
                        <a href="mailto:support@curifix.com" className="text-[#303030] hover:text-[#E9FF5D] transition-colors">
                          support@curifix.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="bg-[#F5F5EB] rounded-2xl p-6 border border-[#E0E0E0] hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#E9FF5D] rounded-full p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-[#303030]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="start text-lg font-semibold text-[#303030] mb-2">Call Us</h3>
                        <p className="text-[#666666] mb-2">Mon-Fri from 9am to 6pm</p>
                        <a href="tel:+1-555-CURIFIX" className="text-[#303030] hover:text-[#E9FF5D] transition-colors">
                          +1 (555) CURIFIX
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Live Chat Card */}
                  <div className="bg-[#F5F5EB] rounded-2xl p-6 border border-[#E0E0E0] hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="bg-[#E9FF5D] rounded-full p-3 flex-shrink-0">
                        <svg className="w-6 h-6 text-[#303030]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="start text-lg font-semibold text-[#303030] mb-2">Live Chat</h3>
                        <p className="text-[#666666] mb-2">Chat with our AI assistant</p>
                        <a href="/chat" className="text-[#303030] hover:text-[#E9FF5D] transition-colors">
                          Start Chatting
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-xl border border-[#E0E0E0] p-8">
                <h2 className="instrument text-3xl font-bold text-[#303030] mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#303030] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E0E0E0] text-[#212529] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#E9FF5D] focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#303030] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E0E0E0] text-[#212529] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#E9FF5D] focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#303030] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#E0E0E0] text-[#212529] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#E9FF5D] focus:border-transparent transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#303030] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#E0E0E0] text-[#212529] rounded-[15px] focus:outline-none focus:ring-2 focus:ring-[#E9FF5D] focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#E9FF5D] text-black font-semibold px-6 py-3 rounded-[15px] border-solid border-[#BEcf4c] border-t-[2px] hover:bg-[#D4FF3D] border-r-[2px] border-l-[2px] border-b-[4px] transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
