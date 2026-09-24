import { motion } from "framer-motion";

function SunMoonOrbit() {
  return (
    <div className="absolute inset-0">

      {/* =====================================================
          ORBIT PATH
      ===================================================== */}
      <div
        className="
          absolute
          inset-[20%]
          rounded-full
          border
          border-amber-300/[0.07]
        "
      />

      {/* =====================================================
          SUN
          Small and subtle so it doesn't compete with title.
      ===================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      >
        <motion.div
          animate={{
            scale: [1, 1.025, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            relative
            w-12
            h-12
            sm:w-14
            sm:h-14
            md:w-16
            md:h-16
            rounded-full
            bg-amber-300
            shadow-[0_0_35px_rgba(252,211,77,0.18)]
          "
        >
          {/* Subtle inner highlight */}
          <div
            className="
              absolute
              inset-[18%]
              rounded-full
              bg-yellow-100/20
              blur-[2px]
            "
          />
        </motion.div>
      </div>

      {/* =====================================================
          ORBITING MOON
      ===================================================== */}
      <motion.div
        className="absolute inset-[20%] rounded-full"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Moon */}
        <motion.div
          className="
            absolute
            left-1/2
            top-0
            -translate-x-1/2
            -translate-y-1/2
          "
          animate={{
            scale: [1, 1.04, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="
              w-5
              h-5
              sm:w-6
              sm:h-6
              md:w-7
              md:h-7
              rounded-full
              bg-slate-100
              shadow-[0_0_20px_rgba(255,255,255,0.15)]
            "
          />
        </motion.div>
      </motion.div>

      {/* =====================================================
          ORBITAL POINTS
      ===================================================== */}
      <div
        className="
          absolute
          left-1/2
          top-[20%]
          -translate-x-1/2
          -translate-y-1/2
          w-1.5
          h-1.5
          rounded-full
          bg-amber-300/30
        "
      />

      <div
        className="
          absolute
          left-[20%]
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-1.5
          h-1.5
          rounded-full
          bg-amber-300/25
        "
      />

      <div
        className="
          absolute
          right-[20%]
          top-1/2
          translate-x-1/2
          -translate-y-1/2
          w-1.5
          h-1.5
          rounded-full
          bg-amber-300/25
        "
      />

    </div>
  );
}

export default SunMoonOrbit;