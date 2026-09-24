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

function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  };
}

function describeSector(
  cx,
  cy,
  radius,
  startAngle,
  endAngle
) {
  const start = polarToCartesian(
    cx,
    cy,
    radius,
    endAngle
  );

  const end = polarToCartesian(
    cx,
    cy,
    radius,
    startAngle
  );

  const largeArcFlag =
    endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function formatLongitude(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "—";
  }

  return `${number.toFixed(2)}°`;
}

export default function NakshatraWheel({ nakshatra }) {
  /*
   * ============================================================
   * CURRENT CALCULATED NAKṢATRA
   * ============================================================
   */

  const nakshatraNumber = Math.min(
    27,
    Math.max(
      1,
      Number(nakshatra?.number) || 1
    )
  );

  const pada = Math.min(
    4,
    Math.max(
      1,
      Number(nakshatra?.pada) || 1
    )
  );

  const nakshatraName =
    nakshatra?.name ||
    NAKSHATRAS[nakshatraNumber - 1];

  const siderealLongitude = Number(
    nakshatra?.sidereal_longitude
  );

  /*
   * ============================================================
   * HOVER STATE
   * ============================================================
   */

  const [hoveredNakshatra, setHoveredNakshatra] =
    useState(null);

  const [mousePosition, setMousePosition] =
    useState({
      x: 0,
      y: 0,
    });

  /*
   * ============================================================
   * WHEEL DIMENSIONS
   * ============================================================
   */

  const size = 520;

  const center = size / 2;

  const outerRadius = 220;

  const innerRadius = 105;

  const segmentAngle = 360 / 27;

  /*
   * ============================================================
   * MOUSE HANDLERS
   * ============================================================
   */

  function handleMouseEnter(
    event,
    name
  ) {
    setHoveredNakshatra(name);

    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleMouseMove(event) {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleMouseLeave() {
    setHoveredNakshatra(null);
  }

  return (
    <div className="w-full">

      <div className="grid grid-cols-1 xl:grid-cols-[1.15fr_0.85fr] gap-10 items-center">

        {/* ======================================================
            NAKṢATRA WHEEL
        ======================================================= */}

        <div className="flex justify-center">

          <div className="relative w-full max-w-[540px] aspect-square">

            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full"
              role="img"
              aria-label={`Nakṣatra wheel showing ${nakshatraName}`}
            >

              {/* =================================================
                  OUTER DECORATIVE RINGS
              ================================================== */}

              <circle
                cx={center}
                cy={center}
                r={outerRadius + 9}
                fill="none"
                stroke="#d8b45a"
                strokeOpacity="0.12"
                strokeWidth="2"
              />

              <circle
                cx={center}
                cy={center}
                r={outerRadius}
                fill="none"
                stroke="#c9a85a"
                strokeOpacity="0.5"
                strokeWidth="1.5"
              />

              {/* =================================================
                  27 NAKṢATRA SECTORS
              ================================================== */}

              {NAKSHATRAS.map(
                (name, index) => {
                  const startAngle =
                    index * segmentAngle;

                  const endAngle =
                    (index + 1) *
                    segmentAngle;

                  const isActive =
                    index ===
                    nakshatraNumber - 1;

                  return (
                    <motion.path
                      key={name}
                      d={describeSector(
                        center,
                        center,
                        outerRadius,
                        startAngle,
                        endAngle
                      )}

                      /*
                       * Current calculated Nakṣatra
                       * remains highlighted.
                       */
                      fill={
                        isActive
                          ? "#b9974b"
                          : "#15161b"
                      }

                      fillOpacity={
                        isActive
                          ? 0.65
                          : 0.4
                      }

                      stroke={
                        isActive
                          ? "#f0d276"
                          : "#8d7440"
                      }

                      strokeOpacity={
                        isActive
                          ? 1
                          : 0.3
                      }

                      strokeWidth={
                        isActive
                          ? 2
                          : 0.8
                      }

                      /*
                       * Hover interaction.
                       */
                      onMouseEnter={(event) =>
                        handleMouseEnter(
                          event,
                          name
                        )
                      }

                      onMouseMove={
                        handleMouseMove
                      }

                      onMouseLeave={
                        handleMouseLeave
                      }

                      initial={{
                        opacity: 0,
                      }}

                      animate={{
                        opacity: 1,
                      }}

                      whileHover={{
                        fill: "#b9974b",
                        fillOpacity: 0.65,
                        stroke: "#f0d276",
                        strokeOpacity: 0.9,
                        strokeWidth: 2,
                      }}

                      transition={{
                        duration: 0.25,
                        delay:
                          index * 0.015,
                      }}

                      style={{
                        cursor: "default",
                      }}
                    />
                  );
                }
              )}

              {/* =================================================
                  NAKṢATRA LABELS
              ================================================== */}

              {NAKSHATRAS.map(
                (name, index) => {
                  const angle =
                    index *
                      segmentAngle +
                    segmentAngle / 2;

                  const position =
                    polarToCartesian(
                      center,
                      center,
                      177,
                      angle
                    );

                  const isActive =
                    index ===
                    nakshatraNumber - 1;

                  return (
                    <text
                      key={`label-${index}`}
                      x={position.x}
                      y={position.y}
                      textAnchor="middle"
                      dominantBaseline="middle"

                      fill={
                        isActive
                          ? "#f0d276"
                          : "#999187"
                      }

                      fontSize={
                        isActive
                          ? "9"
                          : "7"
                      }

                      fontWeight={
                        isActive
                          ? "700"
                          : "400"
                      }

                      /*
                       * Labels also trigger the
                       * hover tooltip.
                       */
                      onMouseEnter={(event) =>
                        handleMouseEnter(
                          event,
                          name
                        )
                      }

                      onMouseMove={
                        handleMouseMove
                      }

                      onMouseLeave={
                        handleMouseLeave
                      }

                      style={{
                        cursor: "default",
                        userSelect: "none",
                      }}
                    >
                      {name}
                    </text>
                  );
                }
              )}

              {/* =================================================
                  PADA INDICATORS
              ================================================== */}

              {Array.from({
                length: 4,
              }).map((_, index) => {

                const padaNumber =
                  index + 1;

                const padaAngle =
                  (nakshatraNumber - 1) *
                    segmentAngle +
                  index *
                    (segmentAngle / 4) +
                  segmentAngle / 8;

                const position =
                  polarToCartesian(
                    center,
                    center,
                    202,
                    padaAngle
                  );

                const isCurrentPada =
                  padaNumber === pada;

                return (
                  <g
                    key={`pada-${padaNumber}`}
                  >

                    <circle
                      cx={position.x}
                      cy={position.y}
                      r={
                        isCurrentPada
                          ? 5
                          : 3
                      }

                      fill={
                        isCurrentPada
                          ? "#f0d276"
                          : "#6e6659"
                      }

                      opacity={
                        isCurrentPada
                          ? 1
                          : 0.6
                      }
                    />

                    <text
                      x={position.x}
                      y={
                        position.y - 10
                      }
                      textAnchor="middle"
                      fill={
                        isCurrentPada
                          ? "#f0d276"
                          : "#777067"
                      }
                      fontSize="7"
                      fontWeight={
                        isCurrentPada
                          ? "700"
                          : "400"
                      }
                    >
                      {padaNumber}
                    </text>

                  </g>
                );
              })}

              {/* =================================================
                  CENTER CIRCLE
              ================================================== */}

              <circle
                cx={center}
                cy={center}
                r={innerRadius}
                fill="#0c0d11"
                stroke="#c9a85a"
                strokeOpacity="0.45"
                strokeWidth="1.5"
              />

              <circle
                cx={center}
                cy={center}
                r={innerRadius - 12}
                fill="none"
                stroke="#d8b45a"
                strokeOpacity="0.12"
              />

              {/* Center label */}

              <text
                x={center}
                y={center - 32}
                textAnchor="middle"
                fill="#898277"
                fontSize="11"
                letterSpacing="2"
              >
                MOON
              </text>

              {/* Moon longitude */}

              <text
                x={center}
                y={center + 5}
                textAnchor="middle"
                fill="#f0d276"
                fontSize="22"
                fontWeight="700"
              >
                {formatLongitude(
                  siderealLongitude
                )}
              </text>

              <text
                x={center}
                y={center + 29}
                textAnchor="middle"
                fill="#8d877d"
                fontSize="9"
              >
                SIDEREAL LONGITUDE
              </text>

            </svg>

            {/* ===================================================
                CUSTOM HOVER TOOLTIP
            ==================================================== */}

            {hoveredNakshatra && (
              <div
                className="pointer-events-none fixed z-[9999]"
                style={{
                  left:
                    mousePosition.x + 14,
                  top:
                    mousePosition.y + 14,
                }}
              >

                <div className="rounded-lg border border-amber-300/30 bg-[#111217]/95 px-4 py-2 shadow-xl backdrop-blur-sm">

                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#817a70]">
                    Nakṣatra
                  </div>

                  <div className="mt-1 font-serif text-sm text-[#f0d276] whitespace-nowrap">
                    {hoveredNakshatra}
                  </div>

                </div>

              </div>
            )}

          </div>
        </div>

        {/* ======================================================
            INFORMATION PANEL
        ======================================================= */}

        <div className="space-y-6">

          {/* Header */}

          <div>

            <div className="text-xs uppercase tracking-[0.3em] text-amber-300/60 mb-3">
              Measurement 02
            </div>

            <h2 className="text-4xl font-serif text-[#f1e7d1]">
              Nakṣatra
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#aaa39a]">
              The Moon's position is measured
              against 27 divisions of the
              sidereal zodiac.
            </p>

          </div>

          {/* Current Nakṣatra */}

          <div className="rounded-2xl border border-amber-300/20 bg-white/[0.035] p-6">

            <div className="text-xs uppercase tracking-[0.25em] text-[#918a7e]">
              Current Nakṣatra
            </div>

            <div className="mt-2 text-3xl font-serif text-[#f0d276]">
              {nakshatraName}
            </div>

            <div className="mt-4 flex gap-3">

              <div className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs text-amber-200">
                #{nakshatraNumber}
              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#b5afa5]">
                Pada {pada}
              </div>

            </div>

          </div>

          {/* Measurement */}

          <div className="rounded-2xl border border-white/10 bg-black/20 p-6">

            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              The measurement
            </div>

            <div className="mt-5 grid grid-cols-2 gap-5">

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
                  Padas
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
              The sidereal longitude of the Moon
              is divided into 27 equal sections.
            </p>

            <div className="mt-4 rounded-xl border border-amber-300/10 bg-black/30 p-4">

              <div className="font-mono text-sm text-[#e4ca7c]">
                360° ÷ 27 = 13°20′
              </div>

              <div className="mt-2 text-xs leading-6 text-[#777168]">
                The Moon's sidereal longitude
                determines the active Nakṣatra.
              </div>

            </div>

          </div>

          {/* Current Pada */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

            <div className="text-xs uppercase tracking-[0.2em] text-[#847d72]">
              Current Pada
            </div>

            <div className="mt-3">

              <span className="text-3xl font-serif text-[#f0d276]">
                Pada {pada}
              </span>

              <span className="ml-3 text-sm text-[#817a70]">
                of 4
              </span>

            </div>

            <div className="mt-4 grid grid-cols-4 gap-2">

              {[1, 2, 3, 4].map(
                (padaNumber) => {

                  const ranges = [
                    "0°–3°20′",
                    "3°20′–6°40′",
                    "6°40′–10°",
                    "10°–13°20′",
                  ];

                  return (
                    <div
                      key={padaNumber}
                      className={[
                        "rounded-lg border px-2 py-3 text-center",
                        padaNumber === pada
                          ? "border-amber-300/50 bg-amber-300/10 text-[#f0d276]"
                          : "border-white/10 bg-black/20 text-[#706a61]",
                      ].join(" ")}
                    >

                      <div className="text-sm">
                        {padaNumber}
                      </div>

                      <div className="mt-1 text-[9px]">
                        {ranges[
                          padaNumber - 1
                        ]}
                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>
      </div>

      {/* ========================================================
          BOTTOM EXPLANATION
      ========================================================= */}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">

          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            01 · Divide
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            360° ÷ 27
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            The sidereal zodiac is divided into
            27 equal Nakṣatra sectors.
          </p>

        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">

          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            02 · Locate
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            Moon → {nakshatraName}
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            The Moon's sidereal longitude
            identifies the active Nakṣatra.
          </p>

        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.025] p-5">

          <div className="text-xs uppercase tracking-[0.2em] text-[#817a70]">
            03 · Subdivide
          </div>

          <div className="mt-3 text-lg font-serif text-[#ddd2bc]">
            Pada {pada}
          </div>

          <p className="mt-2 text-xs leading-6 text-[#777168]">
            Each Nakṣatra is divided into four
            Padas of 3°20′ each.
          </p>

        </div>

      </div>

    </div>
  );
}