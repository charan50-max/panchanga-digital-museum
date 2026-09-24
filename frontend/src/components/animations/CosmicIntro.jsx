import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Starfield from "./Starfield";
import SunMoonOrbit from "./SunMoonOrbit";

function CosmicIntro() {
  const navigate = useNavigate();

  function handleEnter() {
    navigate("/input");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090d] text-[#f5f1e8]">

      {/* =====================================================
          STARFIELD
      ===================================================== */}
      <div className="absolute inset-0 z-0">
        <Starfield />
      </div>

      {/* =====================================================
          VERY SUBTLE VIGNETTE
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          z-[1]
          pointer-events-none
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.38)_100%)]
        "
      />

      {/* =====================================================
          ASTRONOMICAL BACKGROUND
          This stays behind all typography.
      ===================================================== */}
      <div
        className="
          absolute
          inset-0
          z-[2]
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >
        <div
          className="
            relative
            w-[430px]
            h-[430px]
            sm:w-[500px]
            sm:h-[500px]
            md:w-[590px]
            md:h-[590px]
            lg:w-[650px]
            lg:h-[650px]
          "
        >
          {/* Outer orbit */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              border
              border-amber-300/[0.10]
            "
          />

          {/* Middle orbit */}
          <div
            className="
              absolute
              inset-[9%]
              rounded-full
              border
              border-white/[0.035]
            "
          />

          {/* Inner orbit */}
          <div
            className="
              absolute
              inset-[18%]
              rounded-full
              border
              border-white/[0.025]
            "
          />

          {/* Very subtle central astronomical glow */}
          <div
            className="
              absolute
              left-1/2
              top-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-44
              h-44
              md:w-56
              md:h-56
              rounded-full
              bg-amber-300/[0.025]
              blur-3xl
            "
          />

          <SunMoonOrbit />
        </div>
      </div>

      {/* =====================================================
          MAIN CONTENT
          z-10 ensures text stays visually dominant.
      ===================================================== */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div
          className="
            w-full
            max-w-5xl
            text-center
            flex
            flex-col
            items-center
          "
        >

          {/* =================================================
              EYEBROW
          ================================================= */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="
              text-[9px]
              sm:text-[10px]
              md:text-xs
              uppercase
              tracking-[0.45em]
              md:tracking-[0.55em]
              text-amber-300/70
            "
          >
            A Digital Museum
          </motion.p>

          {/* =================================================
              MAIN TITLE
          ================================================= */}
          <motion.h1
            initial={{
              opacity: 0,
              y: 18,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-7
              text-[4rem]
              sm:text-[5.5rem]
              md:text-[7rem]
              lg:text-[8.2rem]
              font-light
              tracking-[-0.055em]
              leading-[0.9]
              whitespace-nowrap
            "
          >
            Panchāṅga
          </motion.h1>

          {/* =================================================
              DIVIDER
          ================================================= */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: 72,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.85,
            }}
            className="
              h-px
              bg-amber-300/30
              mt-8
            "
          />

          {/* =================================================
              SUBTITLE
          ================================================= */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
            }}
            className="
              mt-7
              text-[10px]
              sm:text-xs
              md:text-sm
              uppercase
              tracking-[0.3em]
              md:tracking-[0.4em]
              text-white/40
            "
          >
            The Museum of Indian Time
          </motion.p>

          {/* =================================================
              DESCRIPTION
          ================================================= */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1.15,
            }}
            className="
              max-w-xl
              mt-7
              text-xs
              sm:text-sm
              md:text-base
              leading-7
              text-white/35
            "
          >
            Journey through the five measurements of time,
            astronomy and the traditional Indian calendar.
          </motion.p>

          {/* =================================================
              ENTER BUTTON
          ================================================= */}
          <motion.button
            initial={{
              opacity: 0,
              y: 12,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 1.4,
            }}
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleEnter}
            type="button"
            className="
              group
              mt-9
              px-8
              py-4
              rounded-full
              border
              border-amber-300/35
              bg-black/10
              backdrop-blur-sm
              text-amber-200
              text-xs
              uppercase
              tracking-[0.22em]
              transition-all
              duration-300
              hover:bg-amber-300/[0.07]
              hover:border-amber-300/55
              hover:shadow-[0_0_35px_rgba(252,211,77,0.08)]
            "
          >
            <span className="inline-flex items-center gap-3">
              Enter the Museum

              <span
                className="
                  inline-block
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-amber-300/60
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </span>
          </motion.button>

        </div>
      </div>

      {/* =====================================================
          BOTTOM DECORATIVE TEXT
      ===================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1.8,
        }}
        className="
          absolute
          bottom-7
          left-1/2
          -translate-x-1/2
          z-10
          text-[9px]
          tracking-[0.45em]
          text-white/15
          whitespace-nowrap
        "
      >
        सूर्य · चन्द्र · काल
      </motion.div>

    </main>
  );
}

export default CosmicIntro;