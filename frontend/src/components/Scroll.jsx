
import { motion, useScroll, useTransform } from "framer-motion";

export default function TiltCard() {
  const { scrollY } = useScroll();

const rotateX = useTransform(scrollY, [200,0], [0,30]); 
 
  return (
    <div className=" flex items-center w-full justify-center bg-gray-100">
      <motion.div
        style={{
          rotateX,
            
          transformStyle: "preserve-3d",
        }}
        className="w-80 h-48 bg-blue-300 rounded-2xl shadow-xl flex items-center justify-center"
      >
        <p className="text-xl font-semibold">Scroll Tilt</p>
      </motion.div>
    </div>
  );
}
