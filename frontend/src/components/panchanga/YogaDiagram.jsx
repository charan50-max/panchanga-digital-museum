import { motion } from "framer-motion";

const YOGAS = [
  "Viṣkambha",
  "Prīti",
  "Āyuṣmān",
  "Saubhāgya",
  "Śobhana",
  "Atigaṇḍa",
  "Sukarmā",
  "Dhṛti",
  "Śūla",
  "Gaṇḍa",
  "Vṛddhi",
  "Dhruva",
  "Vyāghāta",
  "Harṣaṇa",
  "Vajra",
  "Siddhi",
  "Vyatīpāta",
  "Variyān",
  "Parigha",
  "Śiva",
  "Siddha",
  "Sādhya",
  "Śubha",
  "Śukla",
  "Brahma",
  "Indra",
  "Vaidhṛti",
];

function normalizeAngle(angle) {
  return ((angle % 360) + 360) % 360;
}

function YogaDiagram({ yoga, astronomy }) {
  if (!yoga || !astronomy) {
    return null;
  }

  const sun = Number(
    astronomy.sun_sidereal_longitude
  );

  const moon = Number(
    astronomy.moon_sidereal_longitude
  );

  const combined = normalizeAngle(sun + moon);

  const yogaNumber = yoga.number;

  const yogaWidth = 360 / 27;

  const positionInYoga =
    combined - (yogaNumber - 1) * yogaWidth;

  const progress =
    (positionInYoga / yogaWidth) * 100;

  return (
    <section className="w-full">

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">

        {/* =================================================
            CELESTIAL DIAGRAM
        ================================================= */}

        <div className="relative">

          <div className="relative mx-auto max-w-[600px] aspect-square">

            {/* Outer orbit */}

            <div className="absolute inset-[8%] rounded-full border border-white/10" />

            <div className="absolute inset-[18%] rounded-full border border-white/[0.06]" />

            {/* Sun */}

            <motion.div
              initial={{
                x: -30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
              }}
              className="absolute left-[8%] top-1/2 -translate-y-1/2"
            >

              <div className="relative">

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber-300/90 shadow-[0_0_50px_rgba(251,191,36,0.35)] flex items-center justify-center">

                  <span className="text-[#08090d] text-xs uppercase tracking-[0.2em]">
                    Sun
                  </span>

                </div>

                <div className="mt-4 text-center">

                  <p className="text-xs text-white/30">
                    Sidereal longitude
                  </p>

                  <p className="mt-1 text-sm text-amber-100">
                    {sun.toFixed(2)}°
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Moon */}

            <motion.div
              initial={{
                x: 30,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
              }}
              className="absolute right-[8%] top-1/2 -translate-y-1/2"
            >

              <div className="relative">

                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 shadow-[0_0_45px_rgba(255,255,255,0.18)] flex items-center justify-center">

                  <span className="text-[#08090d] text-xs uppercase tracking-[0.2em]">
                    Moon
                  </span>

                </div>

                <div className="mt-4 text-center">

                  <p className="text-xs text-white/30">
                    Sidereal longitude
                  </p>

                  <p className="mt-1 text-sm text-amber-100">
                    {moon.toFixed(2)}°
                  </p>

                </div>

              </div>

            </motion.div>

            {/* Connecting lines */}

            <motion.div
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              animate={{
                scaleX: 1,
                opacity: 1,
              }}
              transition={{
                duration: 1,
                delay: 0.4,
              }}
              className="absolute left-[28%] right-[28%] top-1/2 h-px bg-gradient-to-r from-amber-300/50 via-white/30 to-white/40 origin-center"
            />

            {/* Center calculation */}

            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                delay: 0.7,
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >

              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-amber-300/20 bg-[#0b0d12] flex flex-col items-center justify-center">

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/30">
                  Combined
                </p>

                <p className="mt-2 text-xl md:text-2xl font-light text-amber-100">
                  {combined.toFixed(2)}°
                </p>

                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-white/25">
                  Mod 360°
                </p>

              </div>

            </motion.div>

            {/* Calculation labels */}

            <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 text-center whitespace-nowrap">

              <p className="text-xs uppercase tracking-[0.25em] text-white/25">
                Sun + Moon
              </p>

              <p className="mt-2 text-sm text-white/50">
                {sun.toFixed(2)}° + {moon.toFixed(2)}°
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            EXPLANATION
        ================================================= */}

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/60">
            Exhibit 03
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-light">
            Yoga
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/30">
            The combined Sun–Moon position
          </p>

          {/* Result */}

          <div className="mt-10">

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Your Yoga
            </p>

            <p className="mt-3 text-4xl font-light text-amber-100">
              {yoga.name}
            </p>

            <p className="mt-2 text-sm text-white/35">
              Yoga {yoga.number}
            </p>

          </div>

          {/* Explanation */}

          <div className="mt-10 space-y-5">

            <p className="text-white/55 leading-relaxed">
              Yoga is calculated from the combined sidereal
              longitudes of the Sun and Moon.
            </p>

            <p className="text-white/35 leading-relaxed text-sm">
              The resulting 360° circle is divided into
              27 equal portions. Each Yoga therefore spans
              13°20′.
            </p>

          </div>

          {/* Formula */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/50">
              The measurement
            </p>

            <p className="mt-5 font-mono text-lg text-white/70">
              Sun + Moon
            </p>

            <p className="mt-2 text-sm text-white/30">
              {sun.toFixed(4)}° + {moon.toFixed(4)}°
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="font-mono text-lg text-white/70">
              {combined.toFixed(4)}°
            </p>

            <p className="mt-2 text-sm text-white/30">
              after wrapping around 360°
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="font-mono text-lg text-white/70">
              360° ÷ 27
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              = 13°20′ per Yoga
            </p>

          </div>

          {/* Position within Yoga */}

          <div className="mt-8">

            <div className="flex items-center justify-between mb-3">

              <p className="text-xs uppercase tracking-[0.25em] text-white/30">
                Position within Yoga
              </p>

              <p className="text-xs text-amber-200/60">
                {positionInYoga.toFixed(2)}°
              </p>

            </div>

            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">

              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${progress}%`,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="h-full bg-amber-300/70 rounded-full"
              />

            </div>

            <div className="mt-2 flex justify-between text-[10px] text-white/20">
              <span>0°</span>
              <span>13°20′</span>
            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          27 YOGA STRIP
      ================================================= */}

      <div className="mt-20">

        <div className="flex items-center justify-between mb-5">

          <div>

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              The 27 Yogas
            </p>

            <p className="mt-2 text-sm text-white/25">
              Hover over a Yoga to explore the cycle.
            </p>

          </div>

          <p className="text-xs text-amber-200/60">
            {yoga.number} / 27
          </p>

        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1">

          {YOGAS.map((name, index) => {

            const number = index + 1;

            const active =
              number === yogaNumber;

            return (
              <motion.div
                key={name}
                whileHover={{
                  y: -3,
                }}
                className={`min-h-[70px] rounded-lg border p-3 transition ${
                  active
                    ? "border-amber-300/60 bg-amber-300/10"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >

                <p
                  className={`text-[10px] ${
                    active
                      ? "text-amber-200"
                      : "text-white/25"
                  }`}
                >
                  {String(number).padStart(2, "0")}
                </p>

                <p
                  className={`mt-2 text-xs leading-tight ${
                    active
                      ? "text-amber-100"
                      : "text-white/40"
                  }`}
                >
                  {name}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}

export default YogaDiagram;