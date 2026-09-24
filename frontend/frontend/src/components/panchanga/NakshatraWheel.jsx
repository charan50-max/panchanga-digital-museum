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
  "Pūrvaphalgunī",
  "Uttaraphalgunī",
  "Hasta",
  "Citrā",
  "Svātī",
  "Viśākhā",
  "Anurādhā",
  "Jyeṣṭhā",
  "Mūla",
  "Pūrvāṣāḍhā",
  "Uttarāṣāḍhā",
  "Śravaṇā",
  "Dhaniṣṭhā",
  "Śatabhiṣā",
  "Pūrvabhādrapadā",
  "Uttarabhādrapadā",
  "Revatī",
];

const NAKSHATRA_MEANINGS = {
  Aśvinī: "The first Nakṣatra, associated with beginnings and movement.",
  Bharaṇī: "Associated with transformation, responsibility, and containment.",
  Kṛttikā: "Associated with fire, purification, and sharpness.",
  Rohiṇī: "Associated with growth, beauty, fertility, and nourishment.",
  Mṛgaśīrṣa: "Associated with searching, curiosity, and exploration.",
  Ārdrā: "Associated with intensity, change, and renewal.",
  Punarvasu: "Associated with return, restoration, and renewal.",
  Puṣya: "Associated with nourishment, support, and growth.",
  Āśleṣā: "Associated with connection, depth, and transformation.",
  Maghā: "Associated with ancestry, heritage, and authority.",
  Pūrvaphalgunī: "Associated with enjoyment, creativity, and relaxation.",
  Uttaraphalgunī: "Associated with friendship, agreements, and responsibility.",
  Hasta: "Associated with skill, craftsmanship, and the hands.",
  Citrā: "Associated with brilliance, creativity, and beauty.",
  Svātī: "Associated with independence, flexibility, and movement.",
  Viśākhā: "Associated with determination, purpose, and achievement.",
  Anurādhā: "Associated with friendship, devotion, and cooperation.",
  Jyeṣṭhā: "Associated with seniority, protection, and responsibility.",
  Mūla: "Associated with roots, investigation, and fundamental causes.",
  Pūrvāṣāḍhā: "Associated with strength, confidence, and invigoration.",
  Uttarāṣāḍhā: "Associated with lasting achievement and universal principles.",
  Śravaṇā: "Associated with listening, learning, and transmission of knowledge.",
  Dhaniṣṭhā: "Associated with rhythm, music, prosperity, and community.",
  Śatabhiṣā: "Associated with healing, investigation, and openness.",
  Pūrvabhādrapadā: "Associated with transformation, ideals, and intensity.",
  Uttarabhādrapadā: "Associated with depth, stability, and wisdom.",
  Revatī: "Associated with completion, nourishment, and safe journeys.",
};

function polarToCartesian(cx, cy, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeSector(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function normalizeNumber(value, fallback = 1) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return number;
}

function normalizeNakshatraNumber(value) {
  const number = normalizeNumber(value, 1);

  // Keep the value between 1 and 27.
  return Math.min(27, Math.max(1, Math.round(number)));
}

function normalizePada(value) {
  const number = normalizeNumber(value, 1);

  return Math.min(4, Math.max(1, Math.round(number)));
}

function formatLongitude(value) {
  const longitude = Number(value);

  if (!Number.isFinite(longitude)) {
    return "—";
  }

  return `${longitude.toFixed(2)}°`;
}

function getPadaRange(pada) {
  const ranges = [
    "0°00′ – 3°20′",
    "3°20′ – 6°40′",
    "6°40′ – 10°00′",
    "10°00′ – 13°20′",
  ];

  return ranges[pada - 1] || ranges[0];
}

export default function NakshatraWheel({ nakshatra }) {
  /*
   * Expected object from the Panchāṅga API:
   *
   * {
   *   number: 23,
   *   name: "Dhaniṣṭhā",
   *   pada: 4,
   *   sidereal_longitude: 306.621507
   * }
   */

  const currentNumber = normalizeNakshatraNumber(nakshatra?.number);
  const currentPada = normalizePada(nakshatra?.pada);

  const currentName =
    nakshatra?.name || NAKSHATRAS[currentNumber - 1] || "Unknown";

  const longitude = Number(nakshatra?.sidereal_longitude);

  const degreesPerNakshatra = 360 / 27;
  const degreesPerPada = degreesPerNakshatra / 4;

  const currentIndex = currentNumber - 1;

  const currentMeaning =
    NAKSHATRA_MEANINGS[currentName] ||
    "This Nakṣatra represents one of the 27 divisions of the Moon's sidereal path.";

  /*
   * Wheel dimensions.
   */
  const size = 520;
  const center = size / 2;

  const outerRadius = 220;
  const innerRadius = 115;

  /*
   * Each Nakṣatra occupies 13°20′.
   *
   * We rotate the wheel slightly so that the first division
   * starts at the top.
   */
  const segmentAngle = 360 / 27;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] gap-10 items-center">
        {/* =========================================================
            WHEEL
        ========================================================== */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[560px] aspect-square">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full overflow-visible"
              role="img"
              aria-label={`Nakṣatra wheel showing ${currentName}, Pada ${currentPada}`}
            >
              <defs>
                <radialGradient
                  id="nakshatraCenterGradient"
                  cx="50%"
                  cy="50%"
                  r="50%"
                >
                  <stop offset="0%" stopColor="#2b2415" />
                  <stop offset="70%" stopColor="#15120c" />
                  <stop offset="100%" stopColor="#090a0e" />
                </radialGradient>

                <filter
                  id="nakshatraGlow"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Outer glow */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius + 8}
                fill="none"
                stroke="#d8b45a"
                strokeOpacity="0.08"
                strokeWidth="2"
              />

              {/* Main outer ring */}
              <circle
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="#c9a85a"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />

              {/* Nakṣatra sectors */}
              {NAKSHATRAS.map((name, index) => {
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;

                const isCurrent = index === currentIndex;

                const path = describeSector(
                  center,
                  center,
                  outerRadius,
                  startAngle,
                  endAngle
                );

                return (
                  <motion.path
                    key={name}
                    d={path}
                    fill={isCurrent ? "#b9974b" : "#121318"}
                    fillOpacity={isCurrent ? 0.55 : 0.35}
                    stroke={isCurrent ? "#e5c76b" : "#8d7440"}
                    strokeOpacity={isCurrent ? 0.9 : 0.28}
                    strokeWidth={isCurrent ? 2 : 0.8}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.015,
                    }}
                  />
                );
              })}

              {/* Inner circle */}
              <circle
                cx={center}
                cy={center}
                r={innerRadius}
                fill="url(#nakshatraCenterGradient)"
                stroke="#c9a85a"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />

              {/* Inner decorative circle */}
              <circle
                cx={center}
                cy={center}
                r={innerRadius - 12}
                fill="none"
                stroke="#d8b45a"
                strokeOpacity="0.15"
                strokeWidth="1"
              />

              {/* Nakṣatra labels */}
              {NAKSHATRAS.map((name, index) => {
                const angle =
                  index * segmentAngle + segmentAngle / 2;

                const labelRadius = 175;

                const position = polarToCartesian(
                  center,
                  center,
                  labelRadius,
                  angle
                );

                const isCurrent = index === currentIndex;

                return (
                  <text
                    key={`label-${name}`}
                    x={position.x}
                    y={position.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isCurrent ? "#f4d77d" : "#aaa39a"}
                    fontSize={isCurrent ? "9" : "7"}
                    fontWeight={isCurrent ? "700" : "400"}
                    transform={`rotate(${angle}, ${position.x}, ${position.y})`}
                  >
                    {name}
                  </text>
                );
              })}

              {/* 4 Pada markers for the current Nakṣatra */}
              {Array.from({ length: 4 }).map((_, index) => {
                const padaAngle =
                  currentIndex * segmentAngle +
                  index * degreesPerPada +
                  degreesPerPada / 2;

                const position = polarToCartesian(
                  center,
                  center,
                  outerRadius - 25,
                  padaAngle
                );

                const isCurrentPada = index + 1 === currentPada;

                return (
                  <g key={`pada-${index}`}>
                    <circle
                      cx={position.x}
                      cy={position.y}
                      r={isCurrentPada ? 5 : 3}
                      fill={isCurrentPada ? "#f2cf65" : "#81765e"}
                      fillOpacity={isCurrentPada ? 1 : 0.55}
                      filter={isCurrentPada ? "url(#nakshatraGlow)" : ""}
                    />

                    <text
                      x={position.x}
                      y={position.y - 10}
                      textAnchor="middle"
                      fill={isCurrentPada ? "#f2cf65" : "#8d877e"}
                      fontSize="7"
                      fontWeight={isCurrentPada ? "700" : "400"}
                    >
                      {index + 1}
                    </text>
                  </g>
                );
              })}

              {/* Center information */}
              <text
                x={center}
                y={center - 25}
                textAnchor="middle"
                fill="#8f887d"
                fontSize="11"
                letterSpacing="2"
              >
                MOON
              </text>

              <text
                x={center}
                y={center + 5}
                textAnchor="middle"
                fill="#f0d276"
                fontSize="21"
                fontWeight="700"
              >
                {formatLongitude(longitude)}
              </text>

              <text
                x={center}
                y={center + 28}
                textAnchor="middle"
                fill="#b4aea3"
                fontSize="10"
              >
                SIDEREAL LONGITUDE
              </text>
            </svg>
          </div>
        </div>

        {/* =========================================================
            INFORMATION PANEL
        ========================================================== */}
        <div className="space-y-6">
          {/* Heading */}
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-amber-300/60 mb-3">
              Measurement 02
            </div>

            <h3 className="text-3xl md:text-4xl font-serif text-[#f1e7d1]">
              Nakṣatra
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#aaa39a]">
              The Moon's position is measured against 27 divisions of
              the sidereal zodiac.
            </p>
          </div>

          {/* Current Nakṣatra card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-amber-300/20 bg-white/[0.035] p-6"
          >
            <div className="text-xs uppercase tracking-[0.25em] text-[#918a7e]">
              Current Nakṣatra
            </div>

            <div className="mt-2 text-3xl font-serif text-[#f0d276]">
              {currentName}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs text-amber-200">
                #{currentNumber}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#b5afa5]">
                Pada {currentPada}
              </div>
            </div>
          </motion.div>

          {/* Measurement explanation */}
          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              The measurement
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-serif text-[#e8d39a]">
                  27
                </div>
                <div className="mt-1 text-xs text-[#8d877d]">
                  Nakṣatras
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif text-[#e8d39a]">
                  13°20′
                </div>
                <div className="mt-1 text-xs text-[#8d877d]">
                  Each Nakṣatra
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif text-[#e8d39a]">
                  4
                </div>
                <div className="mt-1 text-xs text-[#8d877d]">
                  Padas each
                </div>
              </div>

              <div>
                <div className="text-2xl font-serif text-[#e8d39a]">
                  3°20′
                </div>
                <div className="mt-1 text-xs text-[#8d877d]">
                  Each Pada
                </div>
              </div>
            </div>
          </div>

          {/* Calculation */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              How it is calculated
            </div>

            <p className="mt-4 text-sm leading-7 text-[#aaa39a]">
              The sidereal longitude of the Moon is divided into
              27 equal sections.
            </p>

            <div className="mt-4 rounded-xl border border-amber-300/10 bg-black/30 p-4">
              <div className="font-mono text-sm text-[#e4ca7c]">
                360° ÷ 27 = 13°20′
              </div>

              <div className="mt-2 text-xs leading-6 text-[#777168]">
                The Moon's sidereal longitude determines which
                Nakṣatra is active.
              </div>
            </div>
          </div>

          {/* Pada */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              Current Pada
            </div>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-serif text-[#f0d276]">
                {currentPada}
              </span>

              <span className="text-sm text-[#8d877d]">
                of 4
              </span>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((pada) => (
                <div
                  key={pada}
                  className={[
                    "rounded-lg border px-2 py-3 text-center transition",
                    pada === currentPada
                      ? "border-amber-300/50 bg-amber-300/10 text-[#f0d276]"
                      : "border-white/10 bg-black/20 text-[#706a61]",
                  ].join(" ")}
                >
                  <div className="text-sm font-medium">
                    {pada}
                  </div>

                  <div className="mt-1 text-[9px]">
                    {getPadaRange(pada)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meaning */}
          <div className="border-l border-amber-300/30 pl-5">
            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              Cultural context
            </div>

            <p className="mt-3 text-sm leading-7 text-[#9f988e]">
              {currentMeaning}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM EXPLANATION
      ========================================================== */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            01 · Divide
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            360° / 27
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            The complete sidereal zodiac is divided into 27 equal
            Nakṣatra sectors.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            02 · Locate
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            Moon → {currentName}
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            The Moon's sidereal longitude identifies the active
            Nakṣatra.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">
          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            03 · Subdivide
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            Pada {currentPada}
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            Each Nakṣatra is further divided into four Padas of
            3°20′ each.
          </p>
        </div>
      </div>
    </div>
  );
}
