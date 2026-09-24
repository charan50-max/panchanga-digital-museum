import { motion } from "framer-motion";

const VARAS = [
  {
    number: 1,
    name: "Sunday",
    traditional: "Ravivāra",
    symbol: "☉",
  },
  {
    number: 2,
    name: "Monday",
    traditional: "Somavāra",
    symbol: "☽",
  },
  {
    number: 3,
    name: "Tuesday",
    traditional: "Maṅgalavāra",
    symbol: "♂",
  },
  {
    number: 4,
    name: "Wednesday",
    traditional: "Budhavāra",
    symbol: "☿",
  },
  {
    number: 5,
    name: "Thursday",
    traditional: "Guruvāra",
    symbol: "♃",
  },
  {
    number: 6,
    name: "Friday",
    traditional: "Śukravāra",
    symbol: "♀",
  },
  {
    number: 7,
    name: "Saturday",
    traditional: "Śanivāra",
    symbol: "♄",
  },
];

function VaraCycle({ vara }) {
  if (!vara) return null;

  /*
   * Drik Panchanga returns Vāra as:
   *
   * Sunday    = 0
   * Monday    = 1
   * Tuesday   = 2
   * Wednesday = 3
   * Thursday  = 4
   * Friday    = 5
   * Saturday  = 6
   */

  const backendNumber = Number(vara.number);

  const selected =
    VARAS[backendNumber] || VARAS[0];

  /*
   * Positions around the circle.
   *
   * The coordinates are percentages of the square
   * visualization container.
   */
  const positions = [
    { x: 50, y: 5 },   // Sunday
    { x: 87, y: 22 },  // Monday
    { x: 94, y: 64 },  // Tuesday
    { x: 70, y: 94 },  // Wednesday
    { x: 30, y: 94 },  // Thursday
    { x: 6, y: 64 },   // Friday
    { x: 13, y: 22 },  // Saturday
  ];

  return (
    <section
      className="
        relative
        w-full
        py-28
        md:py-36
        overflow-hidden
      "
    >

      {/* =====================================================
          COMMON EXHIBIT GRID
      ===================================================== */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          grid
          lg:grid-cols-[1.05fr_0.95fr]
          gap-16
          xl:gap-24
          items-center
        "
      >

        {/* ===================================================
            LEFT — VĀRA VISUALIZATION
        =================================================== */}
        <div className="w-full flex justify-center">

          <div
            className="
              relative
              w-full
              max-w-[580px]
              aspect-square
            "
          >

            {/* -----------------------------------------------
                OUTER CIRCLE
            ------------------------------------------------ */}
            <div
              className="
                absolute
                inset-[7%]
                rounded-full
                border
                border-white/[0.08]
              "
            />

            {/* -----------------------------------------------
                MIDDLE CIRCLE
            ------------------------------------------------ */}
            <div
              className="
                absolute
                inset-[17%]
                rounded-full
                border
                border-white/[0.045]
              "
            />

            {/* -----------------------------------------------
                INNER CIRCLE
            ------------------------------------------------ */}
            <div
              className="
                absolute
                inset-[26%]
                rounded-full
                border
                border-amber-300/[0.07]
              "
            />

            {/* -----------------------------------------------
                CENTER
            ------------------------------------------------ */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-36
                h-36
                md:w-44
                md:h-44
                rounded-full
                border
                border-amber-300/20
                bg-[#08090d]/95
                flex
                flex-col
                items-center
                justify-center
                text-center
                z-10
              "
            >
              <span
                className="
                  text-[9px]
                  uppercase
                  tracking-[0.35em]
                  text-white/25
                "
              >
                Vāra
              </span>

              <span
                className="
                  mt-3
                  text-2xl
                  md:text-3xl
                  font-light
                  text-amber-200
                "
              >
                {selected.name}
              </span>

              <span
                className="
                  mt-2
                  text-xs
                  text-white/35
                "
              >
                {selected.traditional}
              </span>
            </div>

            {/* -----------------------------------------------
                SEVEN DAYS
            ------------------------------------------------ */}
            {VARAS.map((day, index) => {
              const position = positions[index];

              const isSelected =
                index === backendNumber;

              return (
                <motion.div
                  key={day.name}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                  }}
                  className="
                    absolute
                    -translate-x-1/2
                    -translate-y-1/2
                    flex
                    flex-col
                    items-center
                    text-center
                    w-24
                    md:w-28
                  "
                  style={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                  }}
                >

                  {/* Symbol */}
                  <div
                    className={`
                      w-14
                      h-14
                      md:w-16
                      md:h-16
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      transition-all
                      duration-300

                      ${
                        isSelected
                          ? `
                            border-amber-300/70
                            bg-amber-300/[0.08]
                            shadow-[0_0_30px_rgba(252,211,77,0.10)]
                          `
                          : `
                            border-white/10
                            bg-white/[0.01]
                          `
                      }
                    `}
                  >
                    <span
                      className={`
                        text-lg
                        ${
                          isSelected
                            ? "text-amber-200"
                            : "text-white/30"
                        }
                      `}
                    >
                      {day.symbol}
                    </span>
                  </div>

                  {/* English name */}
                  <span
                    className={`
                      mt-3
                      text-xs
                      whitespace-nowrap
                      ${
                        isSelected
                          ? "text-amber-200"
                          : "text-white/35"
                      }
                    `}
                  >
                    {day.name}
                  </span>

                  {/* Sanskrit name */}
                  <span
                    className="
                      mt-1
                      text-[9px]
                      text-white/20
                      whitespace-nowrap
                    "
                  >
                    {day.traditional}
                  </span>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ===================================================
            RIGHT — INFORMATION
        =================================================== */}
        <div
          className="
            w-full
            max-w-xl
            mx-auto
            lg:mx-0
          "
        >

          {/* -----------------------------------------------
              EXHIBIT NUMBER
          ------------------------------------------------ */}
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.45em]
              text-amber-300/60
            "
          >
            Exhibit 05
          </p>

          {/* -----------------------------------------------
              TITLE
          ------------------------------------------------ */}
          <h2
            className="
              mt-5
              text-5xl
              md:text-6xl
              font-light
              tracking-tight
            "
          >
            Vāra
          </h2>

          <p
            className="
              mt-3
              text-xs
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            The Weekday
          </p>

          {/* Divider */}
          <div
            className="
              w-14
              h-px
              bg-amber-300/30
              my-10
            "
          />

          {/* -----------------------------------------------
              CURRENT RESULT
          ------------------------------------------------ */}
          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-white/25
            "
          >
            Your Vāra
          </p>

          <h3
            className="
              mt-4
              text-4xl
              md:text-5xl
              font-light
              text-amber-200
            "
          >
            {selected.name}
          </h3>

          <p
            className="
              mt-2
              text-sm
              text-white/35
            "
          >
            {selected.traditional}
            {" · "}
            Day {selected.number} of 7
          </p>

          {/* -----------------------------------------------
              DESCRIPTION
          ------------------------------------------------ */}
          <div className="mt-10 space-y-5">

            <p
              className="
                text-sm
                md:text-base
                text-white/55
                leading-8
              "
            >
              Vāra identifies the weekday within the
              seven-day cycle.
            </p>

            <p
              className="
                text-sm
                md:text-base
                text-white/35
                leading-8
              "
            >
              Unlike Tithi, Nakṣatra, Yoga and Karaṇa,
              Vāra is determined directly from the civil
              weekday of the selected moment.
            </p>

          </div>

          {/* -----------------------------------------------
              SELECTED DAY CARD
          ------------------------------------------------ */}
          <div
            className="
              mt-10
              rounded-2xl
              border
              border-white/10
              bg-white/[0.025]
              p-7
              md:p-8
            "
          >

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-amber-300/50
              "
            >
              The selected day
            </p>

            <div className="mt-5">

              <p
                className="
                  text-3xl
                  font-light
                "
              >
                {selected.name}
              </p>

              <p
                className="
                  mt-2
                  text-sm
                  text-white/30
                "
              >
                {selected.traditional}
              </p>

            </div>

            <div
              className="
                my-7
                h-px
                bg-white/[0.07]
              "
            />

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.3em]
                text-white/25
              "
            >
              Position in seven-day cycle
            </p>

            <p
              className="
                mt-4
                text-3xl
                font-light
                text-white/75
              "
            >
              {selected.number} / 7
            </p>

          </div>

          {/* -----------------------------------------------
              WEEKLY PROGRESS
          ------------------------------------------------ */}
          <div className="mt-8">

            <div className="flex gap-1.5">

              {VARAS.map((day, index) => (
                <div
                  key={day.name}
                  className={`
                    h-1
                    flex-1
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      index === backendNumber
                        ? "bg-amber-300"
                        : "bg-white/10"
                    }
                  `}
                />
              ))}

            </div>

            <p
              className="
                mt-3
                text-right
                text-[10px]
                text-white/20
              "
            >
              {selected.number} of 7 days
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

export default VaraCycle;