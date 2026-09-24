import { useState } from "react";
import { motion } from "framer-motion";

const NAKSHATRAS = [
  "Aśvinī",
  "Bharaṇī",
  "Kṛttikā",
  "Rohiṇī",
  "Mṛgaśīrṣa",
  "Ārdrā",
  "Punarvasu",
  "Puṣya",
  "Āśleṣā",
  "Maghā",
  "Pūrva Phalgunī",
  "Uttara Phalgunī",
  "Hasta",
  "Citrā",
  "Svātī",
  "Viśākhā",
  "Anurādhā",
  "Jyeṣṭhā",
  "Mūla",
  "Pūrva Āṣāḍhā",
  "Uttara Āṣāḍhā",
  "Śravaṇa",
  "Dhaniṣṭhā",
  "Śatabhiṣā",
  "Pūrva Bhādrapadā",
  "Uttara Bhādrapadā",
  "Revatī",
];

const NAKSHATRA_SIZE = 360 / 27;
const PADA_SIZE = NAKSHATRA_SIZE / 4;

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

function NakshatraWheel({ nakshatra }) {
  const [hovered, setHovered] = useState(null);

  if (!nakshatra) {
    return null;
  }

  const selectedNumber = nakshatra.number;

  const selectedLongitude =
    Number(nakshatra.sidereal_longitude) || 0;

  const selectedPada = nakshatra.pada || 1;

  const size = 560;
  const center = size / 2;

  const outerRadius = 235;
  const innerRadius = 165;

  const padaOuterRadius = 158;
  const padaInnerRadius = 122;

  return (
    <section className="w-full">

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

        {/* =================================================
            NAKSHATRA WHEEL
        ================================================= */}

        <div className="flex justify-center">

          <div className="relative w-full max-w-[580px]">

            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-auto"
            >

              {/* Outer glow */}

              <circle
                cx={center}
                cy={center}
                r={outerRadius + 10}
                fill="none"
                stroke="rgba(251,191,36,0.08)"
                strokeWidth="1"
              />

              {/* =================================================
                  27 NAKSHATRA SECTORS
              ================================================= */}

              {Array.from({ length: 27 }).map(
                (_, index) => {
                  const number = index + 1;

                  const startAngle =
                    index * NAKSHATRA_SIZE + 0.8;

                  const endAngle =
                    (index + 1) * NAKSHATRA_SIZE - 0.8;

                  const active =
                    number === selectedNumber;

                  const isHovered =
                    hovered === number;

                  return (
                    <motion.path
                      key={number}
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
                          ? "rgba(251,191,36,0.82)"
                          : isHovered
                          ? "rgba(251,191,36,0.18)"
                          : "rgba(255,255,255,0.035)"
                      }
                      stroke={
                        active
                          ? "rgba(251,191,36,0.95)"
                          : "rgba(255,255,255,0.08)"
                      }
                      strokeWidth={active ? 2 : 1}
                      className="cursor-pointer"
                      onMouseEnter={() =>
                        setHovered(number)
                      }
                      onMouseLeave={() =>
                        setHovered(null)
                      }
                      initial={{
                        opacity: 0,
                        scale: 0.94,
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

              {/* =================================================
                  NAKSHATRA NUMBERS
              ================================================= */}

              {Array.from({ length: 27 }).map(
                (_, index) => {
                  const number = index + 1;

                  const angle =
                    index * NAKSHATRA_SIZE +
                    NAKSHATRA_SIZE / 2;

                  const point =
                    polarToCartesian(
                      center,
                      center,
                      207,
                      angle
                    );

                  const active =
                    number === selectedNumber;

                  return (
                    <text
                      key={`number-${number}`}
                      x={point.x}
                      y={point.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={active ? 12 : 8}
                      fill={
                        active
                          ? "#08090d"
                          : "rgba(255,255,255,0.35)"
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

              {/* =================================================
                  FOUR PADA RINGS
              ================================================= */}

              {Array.from({ length: 4 }).map(
                (_, index) => {
                  const pada = index + 1;

                  const active =
                    pada === selectedPada;

                  const startAngle =
                    (selectedNumber - 1) *
                      NAKSHATRA_SIZE +
                    index * PADA_SIZE +
                    0.6;

                  const endAngle =
                    (selectedNumber - 1) *
                      NAKSHATRA_SIZE +
                    (index + 1) *
                      PADA_SIZE -
                    0.6;

                  return (
                    <motion.path
                      key={`pada-${pada}`}
                      d={describeArc(
                        center,
                        center,
                        padaOuterRadius,
                        padaInnerRadius,
                        startAngle,
                        endAngle
                      )}
                      fill={
                        active
                          ? "rgba(251,191,36,0.75)"
                          : "rgba(255,255,255,0.04)"
                      }
                      stroke={
                        active
                          ? "rgba(251,191,36,0.9)"
                          : "rgba(255,255,255,0.12)"
                      }
                      strokeWidth={active ? 2 : 1}
                    />
                  );
                }
              )}

              {/* Pada labels */}

              {Array.from({ length: 4 }).map(
                (_, index) => {
                  const pada = index + 1;

                  const angle =
                    (selectedNumber - 1) *
                      NAKSHATRA_SIZE +
                    index * PADA_SIZE +
                    PADA_SIZE / 2;

                  const point =
                    polarToCartesian(
                      center,
                      center,
                      140,
                      angle
                    );

                  const active =
                    pada === selectedPada;

                  return (
                    <text
                      key={`pada-label-${pada}`}
                      x={point.x}
                      y={point.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={active ? 10 : 8}
                      fill={
                        active
                          ? "#08090d"
                          : "rgba(255,255,255,0.35)"
                      }
                    >
                      {pada}
                    </text>
                  );
                }
              )}

              {/* =================================================
                  CENTER
              ================================================= */}

              <circle
                cx={center}
                cy={center}
                r={112}
                fill="#0b0d12"
                stroke="rgba(255,255,255,0.08)"
              />

              <text
                x={center}
                y={center - 25}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="10"
                letterSpacing="3"
              >
                MOON
              </text>

              <text
                x={center}
                y={center + 8}
                textAnchor="middle"
                fill="#fef3c7"
                fontSize="25"
                fontWeight="300"
              >
                {selectedLongitude.toFixed(2)}°
              </text>

              <text
                x={center}
                y={center + 34}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize="9"
                letterSpacing="2"
              >
                SIDEREAL LONGITUDE
              </text>

            </svg>

            {/* Hover information */}

            {hovered && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#0b0d12]/95 px-5 py-2 backdrop-blur-md"
              >
                <span className="text-xs text-white/40">
                  {hovered}
                </span>

                <span className="ml-3 text-sm text-amber-100">
                  {NAKSHATRAS[hovered - 1]}
                </span>
              </motion.div>
            )}

          </div>
        </div>

        {/* =================================================
            EXPLANATION
        ================================================= */}

        <div>

          <p className="text-xs uppercase tracking-[0.35em] text-amber-300/60">
            Exhibit 02
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-light">
            Nakṣatra
          </h2>

          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/30">
            The Moon's celestial sector
          </p>

          {/* Result */}

          <div className="mt-10">

            <p className="text-xs uppercase tracking-[0.3em] text-white/30">
              Your Nakṣatra
            </p>

            <p className="mt-3 text-4xl font-light text-amber-100">
              {nakshatra.name}
            </p>

            <p className="mt-2 text-sm text-white/35">
              Nakṣatra {nakshatra.number} · Pada{" "}
              {nakshatra.pada}
            </p>

          </div>

          {/* Explanation */}

          <div className="mt-10 space-y-5">

            <p className="text-white/55 leading-relaxed">
              Nakṣatras divide the celestial path of the
              Moon into 27 equal sectors.
            </p>

            <p className="text-white/35 leading-relaxed text-sm">
              Each Nakṣatra spans 13°20′. Every Nakṣatra
              is further divided into four Padas of 3°20′.
            </p>

          </div>

          {/* Measurement */}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <p className="text-xs uppercase tracking-[0.3em] text-amber-300/50">
              The measurement
            </p>

            <p className="mt-5 text-lg font-mono text-white/70">
              Moon's sidereal longitude
            </p>

            <p className="mt-2 text-sm text-white/30">
              = {selectedLongitude.toFixed(4)}°
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="text-lg font-mono text-white/70">
              360° ÷ 27
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              = 13°20′ per Nakṣatra
            </p>

            <div className="w-full h-px bg-white/10 my-5" />

            <p className="text-lg font-mono text-white/70">
              13°20′ ÷ 4
            </p>

            <p className="mt-2 text-sm text-amber-200/70">
              = 3°20′ per Pada
            </p>

          </div>

          {/* Pada display */}

          <div className="mt-8">

            <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">
              Four Padas
            </p>

            <div className="grid grid-cols-4 gap-2">

              {[1, 2, 3, 4].map((pada) => (
                <div
                  key={pada}
                  className={`rounded-lg border p-3 text-center transition ${
                    pada === selectedPada
                      ? "border-amber-300/60 bg-amber-300/10"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <p
                    className={`text-xs ${
                      pada === selectedPada
                        ? "text-amber-200"
                        : "text-white/30"
                    }`}
                  >
                    Pada
                  </p>

                  <p
                    className={`mt-1 text-lg ${
                      pada === selectedPada
                        ? "text-amber-100"
                        : "text-white/50"
                    }`}
                  >
                    {pada}
                  </p>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default NakshatraWheel;