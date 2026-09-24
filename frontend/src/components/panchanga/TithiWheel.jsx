import { motion } from "framer-motion";

const TITHI_NAMES = [
  "Pratipadā",
  "Dvitīyā",
  "Tṛtīyā",
  "Caturthī",
  "Pañcamī",
  "Ṣaṣṭhī",
  "Saptamī",
  "Aṣṭamī",
  "Navamī",
  "Daśamī",
  "Ekādaśī",
  "Dvādaśī",
  "Trayodaśī",
  "Caturdaśī",
  "Pūrṇimā",
  "Pratipadā",
  "Dvitīyā",
  "Tṛtīyā",
  "Caturthī",
  "Pañcamī",
  "Ṣaṣṭhī",
  "Saptamī",
  "Aṣṭamī",
  "Navamī",
  "Daśamī",
  "Ekādaśī",
  "Dvādaśī",
  "Trayodaśī",
  "Caturdaśī",
  "Amāvāsyā",
];

function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeArc(
  cx,
  cy,
  outerRadius,
  innerRadius,
  startAngle,
  endAngle
) {
  const outerStart = polarToCartesian(
    cx,
    cy,
    outerRadius,
    endAngle
  );

  const outerEnd = polarToCartesian(
    cx,
    cy,
    outerRadius,
    startAngle
  );

  const innerStart = polarToCartesian(
    cx,
    cy,
    innerRadius,
    endAngle
  );

  const innerEnd = polarToCartesian(
    cx,
    cy,
    innerRadius,
    startAngle
  );

  const largeArcFlag =
    endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function TithiWheel({ tithi, phaseDegrees }) {
  if (!tithi) {
    return null;
  }

  const selectedTithi = tithi.number;

  const phase =
    typeof phaseDegrees === "number"
      ? phaseDegrees
      : tithi.phase_degrees || 0;

  const size = 520;
  const center = size / 2;
  const outerRadius = 220;
  const innerRadius = 155;
  const segmentAngle = 360 / 30;

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

        {/* =========================
            TITHI WHEEL
        ========================== */}

        <div className="flex justify-center">
          <div className="relative w-full max-w-[560px]">

            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-auto"
            >

              {/* Outer ring */}

              <circle
                cx={center}
                cy={center}
                r={outerRadius + 8}
                fill="none"
                stroke="rgba(251,191,36,0.08)"
                strokeWidth="1"
              />

              {/* 30 segments */}

              {Array.from({ length: 30 }).map(
                (_, index) => {
                  const tithiNumber = index + 1;

                  const startAngle =
                    index * segmentAngle + 1;

                  const endAngle =
                    (index + 1) * segmentAngle - 1;

                  const active =
                    tithiNumber === selectedTithi;

                  const pakshaBoundary =
                    tithiNumber === 15 ||
                    tithiNumber === 30;

                  return (
                    <motion.path
                      key={tithiNumber}
                      d={describeArc(
                        center,
                        center,
                        outerRadius,
                        innerRadius,
                        startAngle,
                        endAngle
                      )}
                      fill={
                        active
                          ? "rgba(251,191,36,0.85)"
                          : pakshaBoundary
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(255,255,255,0.035)"
                      }
                      stroke={
                        active
                          ? "rgba(251,191,36,0.9)"
                          : "rgba(255,255,255,0.08)"
                      }
                      strokeWidth={active ? 2 : 1}
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        delay: index * 0.025,
                        duration: 0.35,
                      }}
                    />
                  );
                }
              )}

              {/* Numbers */}

              {Array.from({ length: 30 }).map(
                (_, index) => {
                  const number = index + 1;

                  const angle =
                    index * segmentAngle +
                    segmentAngle / 2;

                  const point =
                    polarToCartesian(
                      center,
                      center,
                      187,
                      angle
                    );

                  const active =
                    number === selectedTithi;

                  return (
                    <text
                      key={`number-${number}`}
                      x={point.x}
                      y={point.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={active ? 12 : 9}
                      fill={
                        active
                          ? "#08090d"
                          : "rgba(255,255,255,0.38)"
                      }
                      fontWeight={
                        active ? "600" : "400"
                      }
                    >
                      {number}
                    </text>
                  );
                }
              )}

              {/* Center */}

              <circle
                cx={center}
                cy={center}
                r={145}
                fill="#0b0d12"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />

              <text
                x={center}
                y={center - 18}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="11"
                letterSpacing="3"
              >
                LUNAR PHASE
              </text>

              <text
                x={center}
                y={center + 18}
                textAnchor="middle"
                fill="#fef3c7"
                fontSize="30"
                fontWeight="300"
              >
                {phase.toFixed(2)}°
              </text>

              <text
                x={center}
                y={center + 45}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize="10"
                letterSpacing="2"
              >
                SUN–MOON SEPARATION
              </text>

            </svg>
          </div>
        </div>

        {/* =========================
            EXPLANATION
        ========================== */}

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/60">
            Exhibit 01
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-light">
            Tithi
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/30">
            The lunar day
          </p>

          {/* Result */}

          <div className="mt-10">

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Your Tithi
            </p>

            <p className="mt-3 text-4xl font-light text-amber-100">
              {tithi.name}
            </p>

            <p className="mt-2 text-sm text-white/35">
              Tithi {tithi.number} · {tithi.paksha} Pakṣa
            </p>

          </div>

          {/* Explanation */}

          <div className="mt-10 space-y-5">

            <p className="text-white/55 leading-relaxed">
              A Tithi is a lunar day defined by the changing
              angular relationship between the Sun and Moon.
            </p>

            <p className="text-white/35 leading-relaxed text-sm">
              The complete circle is divided into 30 equal
              portions. Each portion spans 12° of angular
              separation between the Sun and Moon.
            </p>

          </div>

          {/* Formula */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/50">
              The measurement
            </p>

            <p className="mt-5 text-lg font-mono text-white/70">
              Moon − Sun
            </p>

            <p className="mt-2 text-sm text-white/30">
              = {phase.toFixed(2)}°
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="text-lg font-mono text-white/70">
              {phase.toFixed(2)}° ÷ 12°
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              → Tithi {selectedTithi}
            </p>

          </div>

          {/* Paksha */}

          <div className="mt-8 flex items-center gap-4">

            <div
              className={`w-10 h-10 rounded-full border flex items-center justify-center ${
                tithi.paksha === "Śukla"
                  ? "border-amber-300/60 bg-amber-300/10"
                  : "border-white/20 bg-white/[0.03]"
              }`}
            >
              ☽
            </div>

            <div>

              <p className="text-sm text-white/60">
                {tithi.paksha} Pakṣa
              </p>

              <p className="text-xs text-white/25">
                {tithi.paksha === "Śukla"
                  ? "The waxing half of the lunar cycle"
                  : "The waning half of the lunar cycle"}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default TithiWheel;