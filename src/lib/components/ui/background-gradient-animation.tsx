"use client";

import { motion } from "framer-motion";

const blobColors = [
  "#00afef",
  "#33c6f3",
  "#008bbd",
  "#aee4f8",
  "#d0d0d0",
];

const blobs = [
  { size: 1000, x: "10%", y: "0%", duration: 50, color: 0, blur: false },
  { size: 900, x: "70%", y: "10%", duration: 60, color: 1, blur: false },
  { size: 1100, x: "50%", y: "60%", duration: 55, color: 2, blur: true },
  { size: 950, x: "80%", y: "80%", duration: 70, color: 3, blur: false },
  { size: 1050, x: "20%", y: "90%", duration: 65, color: 4, blur: true },
  { size: 1050, x: "0%", y: "50%", duration: 65, color: 0, blur: false },
];

export default function BackgroundGradientAnimation() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          initial={{ x: 0, y: 0 }}
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -200, 200, 0],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute"
          style={{
            left: blob.x,
            top: blob.y,
            width: blob.size,
            height: blob.size,
            filter: blob.blur ? "blur(50px)" : "none",
            opacity: 0.25,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            fill={blobColors[blob.color]}
          >
            <path d="M40.5,-54.1C53.3,-47.1,65,-35.7,71.3,-21.3C77.6,-6.8,78.5,11,72.1,25.3C65.7,39.6,51.9,50.4,37,58.8C22.1,67.1,11.1,73,0.3,72.6C-10.6,72.1,-21.2,65.3,-33.2,57.6C-45.1,49.8,-58.4,41.1,-64.4,28.2C-70.3,15.4,-68.8,-1.5,-62.6,-15.5C-56.5,-29.5,-45.6,-40.5,-33.4,-48.3C-21.2,-56.2,-10.6,-61,2.3,-63.9C15.2,-66.9,30.5,-68,40.5,-54.1Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
