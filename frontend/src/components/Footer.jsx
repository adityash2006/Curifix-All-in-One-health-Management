import {
  FaHeartbeat,
  FaStethoscope,
  FaThermometerHalf,
  FaHospitalAlt,
  FaAmbulance,
  FaMedkit,
  FaSyringe,
  FaPills,
  FaUserMd,
  FaBandAid,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

const floatAnimation = {
  y: [0, -10, 0, 10, 0], // smooth up & down motion
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export default function Footer() {
  const icons = [
    { icon: FaHeartbeat, className: "text-pink-600", style: { top: "10%", left: "15%" } },
    { icon: FaHeartbeat, className: "text-pink-600", style: { top: "50%", left: "50%" } },
    { icon: FaStethoscope, className: "text-green-800", style: { top: "75%", left: "80%" } },
    { icon: FaThermometerHalf, className: "text-red-500", style: { top: "40%", left: "40%" } },
    { icon: FaAmbulance, className: "text-gray-900", style: { top: "70%", left: "10%" } },
    { icon: FaSyringe, className: "text-blue-700", style: { top: "5%", left: "60%" } },
    { icon: FaBandAid, className: "text-yellow-600", style: { top: "50%", left: "20%" } },
    { icon: FaPills, className: "text-purple-600", style: { top: "40%", left: "70%" } },
    { icon: FaUserMd, className: "text-green-900", style: { top: "8%", left: "85%" } },
    { icon: FaBandAid, className: "text-yellow-600", style: { top: "50%", left: "90%" } },
  ];
 
  return (
    <footer className="relative  bg-[#e9ff58] text-black shadow-2xl py-16 px-6 mt-24 overflow-hidden">
      {/* Floating icons in background */}
      {icons.map(({ icon: IconComp, className, style }, i) => (
        <motion.div
          key={i}
          className={`absolute opacity-30 ${className} text-5xl pointer-events-none`}
          style={{ ...style, position: "absolute", zIndex: 0 }}
          animate={floatAnimation}
          transition={{ delay: i * 1.5, ...floatAnimation.transition }}
        >
          <IconComp />
        </motion.div>
      ))}

      {/* Content grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.15,
              duration: 0.6,
            },
          },
        }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
      >
        {/* About */}
        <motion.div
          className=" transition duration-300"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-3xl font-bold mb-4 text-black leading-tight">Curifix</h2>
          <p className="text-base text-gray-800 font-semibold leading-relaxed max-w-xs">
              AI-powered health assistant that helps users track symptoms, manage medical history, get tailored guidance, and connect with nearby doctors—while emphasizing it does not replace professional medical care.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          className=" transition duration-300"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-semibold mb-4 text-black">Quick Links</h2>
          <ul className="space-y-3 text-base">
            <li>
              <a href="/" className="hover:text-green-800 font-medium flex items-center transition-colors">
                <span className="mr-2">🏠</span> Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-800 font-medium flex items-center transition-colors">
                <span className="mr-2">💡</span> Services
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-800 font-medium flex items-center transition-colors">
                <span className="mr-2">👨‍⚕</span> Doctors
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-800 font-medium flex items-center transition-colors">
                <span className="mr-2">✉</span> Contact
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          className=" transition duration-300"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-semibold mb-4 text-black">Contact</h2>
          <p className="text-base flex items-center mb-1 max-w-xs">📍 123 Health Street, City</p>
          <p className="text-base flex items-center mb-1 max-w-xs">📞 +91 98765 43210</p>
          <p className="text-base flex items-center max-w-xs">✉ support@hospitalai.com</p>
        </motion.div>

        {/* Social Media */}
        <motion.div
          className=" transition duration-300"
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        >
          <h2 className="text-xl font-semibold mb-4 text-black">Follow Us</h2>
          <div className="flex space-x-5 text-3xl justify-start md:justify-start">
            <a href="#" className="hover:text-green-900 transition-transform hover:scale-125">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-900 transition-transform hover:scale-125">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-900 transition-transform hover:scale-125">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-green-900 transition-transform hover:scale-125">
              <FaInstagram />
            </a>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <div className="relative z-10 text-center mt-12 text-xs md:text-sm text-black border-t border-black pt-5">
        <p className="animate-pulse font-bold text-xl">
          ⚠ Disclaimer: This AI provides suggestions only and is not a substitute for professional medical advice.
        </p>
        <p className="mt-3 font-bold">
          © {new Date().getFullYear()} <span className="text-green-900">Curifix</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}