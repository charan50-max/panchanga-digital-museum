import { motion } from "framer-motion";

const stars = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${(i * 37.7) % 100}%`,
  top: `${(i * 61.3) % 100}%`,
  size: `${1 + (i % 3) * 0.6}px`,
  delay: (i % 10) * 0.4,
  duration: 2.5 + (i % 5),
}));

function Starfield() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0.15 }}
          animate={{
            opacity: [0.15, 0.8, 0.15],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;