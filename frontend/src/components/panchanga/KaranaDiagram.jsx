import { motion } from "framer-motion";

const KARANA_NAMES = [
  "Kiṃstughna",
  "Bava",
  "Bālava",
  "Kaulava",
  "Taitila",
  "Gara",
  "Vaṇija",
  "Viṣṭi",
  "Śakuni",
  "Catuṣpāda",
  "Nāga",
];

function KaranaDiagram({ karana, tithi }) {
  if (!karana || !tithi) {
    return null;
  }

  const phase = Number(tithi.phase_degrees) || 0;

  /*
   * Every Tithi occupies 12°.
   * Every Karaṇa occupies 6°.
   */
  const tithiStart =
    Math.floor(phase / 12) * 12;

  const tithiEnd = tithiStart + 12;

  const midpoint =
    tithiStart + 6;

  /*
   * Determine whether the selected moment
   * lies in the first or second half.
   */
  const half =
    phase < midpoint ? 1 : 2;

  const positionInTithi =
    phase - tithiStart;

  const positionPercent =
    (positionInTithi / 12) * 100;

  return (
    <section className="w-full">

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">

        {/* =================================================
            KARAṆA VISUALIZATION
        ================================================= */}

        <div>

          <div className="relative max-w-[650px] mx-auto">

            {/* Title */}

            <div className="text-center mb-10">

              <p className="text-xs uppercase tracking-[0.35em] text-white/25">
                One Tithi
              </p>

              <p className="mt-2 text-3xl font-light text-amber-100">
                {tithi.name}
              </p>

              <p className="mt-2 text-xs text-white/25">
                {tithiStart.toFixed(0)}° —{" "}
                {tithiEnd.toFixed(0)}°
              </p>

            </div>

            {/* =================================================
                MAIN 12° BAR
            ================================================= */}

            <div className="relative">

              {/* Degree labels */}

              <div className="flex justify-between mb-3">

                <span className="text-xs text-white/25">
                  {tithiStart.toFixed(0)}°
                </span>

                <span className="text-xs text-white/25">
                  {midpoint.toFixed(0)}°
                </span>

                <span className="text-xs text-white/25">
                  {tithiEnd.toFixed(0)}°
                </span>

              </div>

              {/* Bar */}

              <div className="relative h-32 rounded-2xl border border-white/10 bg-white/[0.025] overflow-hidden">

                {/* First half */}

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "50%",
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className={`absolute left-0 top-0 bottom-0 border-r border-white/10 ${
                    half === 1
                      ? "bg-amber-300/15"
                      : "bg-white/[0.02]"
                  }`}
                >

                  <div className="h-full flex flex-col items-center justify-center">

                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                      Karaṇa 1
                    </p>

                    <p
                      className={`mt-2 text-lg ${
                        half === 1
                          ? "text-amber-100"
                          : "text-white/35"
                      }`}
                    >
                      First Half
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      6°
                    </p>

                  </div>

                </motion.div>

                {/* Second half */}

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: "50%",
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15,
                  }}
                  className={`absolute right-0 top-0 bottom-0 ${
                    half === 2
                      ? "bg-amber-300/15"
                      : "bg-white/[0.02]"
                  }`}
                >

                  <div className="h-full flex flex-col items-center justify-center">

                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/25">
                      Karaṇa 2
                    </p>

                    <p
                      className={`mt-2 text-lg ${
                        half === 2
                          ? "text-amber-100"
                          : "text-white/35"
                      }`}
                    >
                      Second Half
                    </p>

                    <p className="mt-1 text-xs text-white/25">
                      6°
                    </p>

                  </div>

                </motion.div>

                {/* Current position marker */}

                <motion.div
                  initial={{
                    left: "0%",
                    opacity: 0,
                  }}
                  animate={{
                    left: `${positionPercent}%`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className="absolute top-0 bottom-0 w-px bg-amber-300 z-10"
                >

                  <div className="absolute -top-2 left-1/2 -translate-x-1/2">

                    <div className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]" />

                  </div>

                  <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">

                    <span className="rounded-full border border-amber-300/30 bg-[#0b0d12] px-3 py-1 text-[10px] text-amber-100">
                      {phase.toFixed(2)}°
                    </span>

                  </div>

                </motion.div>

              </div>

              {/* Axis */}

              <div className="mt-4 flex justify-between text-[10px] text-white/20">

                <span>0° into Tithi</span>

                <span>6°</span>

                <span>12°</span>

              </div>

            </div>

            {/* =================================================
                ACTIVE KARAṆA
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="mt-10 rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-7 text-center"
            >

              <p className="text-xs uppercase tracking-[0.3em] text-amber-300/60">
                Current Karaṇa
              </p>

              <p className="mt-3 text-3xl font-light text-amber-100">
                {karana.name}
              </p>

              <p className="mt-2 text-sm text-white/30">
                Karaṇa {karana.number} · Half {half}
              </p>

            </motion.div>

          </div>

        </div>

        {/* =================================================
            EXPLANATION
        ================================================= */}

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/60">
            Exhibit 04
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-light">
            Karaṇa
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/30">
            Half of a Tithi
          </p>

          {/* Result */}

          <div className="mt-10">

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Your Karaṇa
            </p>

            <p className="mt-3 text-4xl font-light text-amber-100">
              {karana.name}
            </p>

            <p className="mt-2 text-sm text-white/35">
              Karaṇa {karana.number}
            </p>

          </div>

          {/* Explanation */}

          <div className="mt-10 space-y-5">

            <p className="text-white/55 leading-relaxed">
              A Karaṇa is one half of a Tithi. Since a
              Tithi spans 12° of Sun–Moon separation,
              each Karaṇa spans 6°.
            </p>

            <p className="text-white/35 leading-relaxed text-sm">
              The traditional system recognizes 11 named
              Karaṇas. Seven recur through most of the lunar
              cycle, while four occur at specific positions.
            </p>

          </div>

          {/* Measurement */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/50">
              The measurement
            </p>

            <p className="mt-5 font-mono text-lg text-white/70">
              12° ÷ 2
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              = 6° per Karaṇa
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="font-mono text-lg text-white/70">
              Current phase
            </p>

            <p className="mt-2 text-sm text-white/30">
              {phase.toFixed(4)}°
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="font-mono text-lg text-white/70">
              Tithi {tithi.number}
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              {tithi.name}
            </p>

          </div>

          {/* Half indicator */}

          <div className="mt-8 grid grid-cols-2 gap-3">

            <div
              className={`rounded-xl border p-4 ${
                half === 1
                  ? "border-amber-300/50 bg-amber-300/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >

              <p className="text-xs text-white/30">
                Half 1
              </p>

              <p
                className={`mt-2 ${
                  half === 1
                    ? "text-amber-100"
                    : "text-white/40"
                }`}
              >
                0° — 6°
              </p>

            </div>

            <div
              className={`rounded-xl border p-4 ${
                half === 2
                  ? "border-amber-300/50 bg-amber-300/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >

              <p className="text-xs text-white/30">
                Half 2
              </p>

              <p
                className={`mt-2 ${
                  half === 2
                    ? "text-amber-100"
                    : "text-white/40"
                }`}
              >
                6° — 12°
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =================================================
          KARAṆA REFERENCE
      ================================================= */}

      <div className="mt-20">

        <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-5">
          The 11 traditional Karaṇas
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2">

          {KARANA_NAMES.map((name, index) => {

            const number = index + 1;

            const active =
              name === karana.name;

            return (
              <div
                key={name}
                className={`rounded-lg border p-3 min-h-[70px] ${
                  active
                    ? "border-amber-300/50 bg-amber-300/10"
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
                  className={`mt-2 text-xs ${
                    active
                      ? "text-amber-100"
                      : "text-white/40"
                  }`}
                >
                  {name}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default KaranaDiagram;