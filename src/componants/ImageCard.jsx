import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ImageCard({ image, onSwipe, currentIndex, totalImages }) {
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    setTimeout(() => {
      onSwipe(direction === "up" ? "fraud" : "safe");
      setSwipeDirection(null);
    }, 300);
  };

  return (
    <div
      className="image-stack position-relative mx-auto"
      style={{ height: 360, width: 320, perspective: 1200 }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 30,
          left: 20,
          width: "100%",
          height: "100%",
          borderRadius: 24,
          backgroundColor: "#fff",
          filter: "blur(3px)",
          opacity: 0.25,
          rotate: -10,
          scale: 0.9,
          zIndex: 0,
        }}
        animate={{ rotate: [-10, -12, -10], scale: [0.9, 0.92, 0.9] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          top: 15,
          left: 10,
          width: "100%",
          height: "100%",
          borderRadius: 24,
          backgroundColor: "#fff",
          filter: "blur(2px)",
          opacity: 0.4,
          rotate: 8,
          scale: 0.95,
          zIndex: 1,
        }}
        animate={{ rotate: [8, 10, 8], scale: [0.95, 0.97, 0.95] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y < -80) handleSwipe("up");
          else if (info.offset.y > 80) handleSwipe("down");
        }}
        animate={{
          y: swipeDirection === "up" ? -500 : swipeDirection === "down" ? 500 : 0,
          rotate: swipeDirection === "up" ? -15 : swipeDirection === "down" ? 15 : 0,
          opacity: swipeDirection ? 0 : 1,
          scale: swipeDirection ? 0.95 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="p-3"
        style={{
          zIndex: 3,
          background: "#fff",
          borderRadius: 24,
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          width: "100%",
          height: "100%",
          userSelect: "none",
          position: "relative",
        }}
      >
        <img
          src={image.url}
          alt="game"
          className="img-fluid rounded"
          style={{ width: "100%", borderRadius: 24, height: "100%", objectFit: "cover" }}
        />
      </motion.div>

     
    </div>
  );
}
