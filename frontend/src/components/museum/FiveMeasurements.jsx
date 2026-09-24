import { motion } from "framer-motion";
import { ArrowDown, Compass, Moon, Sparkles, Sun } from "lucide-react";

const ITEMS = [
  {
    key: "tithi",
    number: "01",
    title: "Tithi",
    subtitle: "Lunar day",
    icon: Moon,
    color: "amber",
    getValue: (data) => data.panchanga.tithi.name,
    getMeta: (data) =>
      `${data.panchanga.tithi.paksha} Pakṣa · Tithi ${data.panchanga.tithi.number}`,
  },
  {
    key: "nakshatra",
    number: "02",
    title: "Nakṣatra",
    subtitle: "Moon's celestial sector",
    icon: Sparkles,
    color: "amber",
    getValue: (data) => data.panchanga.nakshatra.name,
    getMeta: (data) =>
      `Pada ${data.panchanga.nakshatra.pada} · Nakṣatra ${data.panchanga.nakshatra.number}`,
  },
  {
    key: "yoga",
    number: "03",
    title: "Yoga",
    subtitle: "Combined Sun–Moon position",
    icon: Sun,
    color: "amber",
    getValue: (data) => data.panchanga.yoga.name,
    getMeta: (data) =>
      `Yoga ${data.panchanga.yoga.number}`,
  },
  {
    key: "karana",
    number: "04",
    title: "Karaṇa",
    subtitle: "Half of a Tithi",
    icon: Compass,
    color: "amber",
    getValue: (data) => data.panchanga.karana.name,
    getMeta: (data) =>
      `Sequence position ${data.panchanga.karana.number}`,
  },
  {
    key: "vara",
    number: "05",
    title: "Vāra",
    subtitle: "Weekday",
    icon: Compass,
    color: "amber",
    getValue: (data) => data.panchanga.vara.name,
    getMeta: (data) => {
      const names = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      const backendNumber = Number(data.panchanga.vara.number);
      const position = backendNumber + 1;

      return `${names[backendNumber] || data.panchanga.vara.name} · ${position} / 7`;
    },
  },
];

function FiveMeasurements({ data, date, time, city, state, onContinue }) {
  if (!data?.panchanga) {
    return null;
  }

  return (
    <section className="relative w-full py-32 md:py-44 overflow-hidden">

      {/* Ambient background */}

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-amber-300/[0.025] blur-3xl" />

        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-300/10 to-transparent" />

      </div>

      <div className="relative max-w-7xl mx-auto px-6">

        {/* =================================================
            INTRO
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >

          <p className="text-xs uppercase tracking-[0.4em] text-amber-300/60">
            The convergence
          </p>

          <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Five measurements.
          </h2>

          <p className="mt-3 text-3xl md:text-5xl font-light text-white/35">
            One moment.
          </p>

          <div className="w-16 h-px bg-amber-300/40 mx-auto my-8" />

          <p className="text-white/45 leading-relaxed text-sm md:text-base">
            The Panchāṅga does not describe five different moments.
            Each measurement describes a different relationship within
            the same selected moment in time.
          </p>

        </motion.div>

        {/* =================================================
            SELECTED MOMENT
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-20 flex justify-center"
        >

          <div className="relative rounded-3xl border border-amber-300/15 bg-[#0b0d12]/80 backdrop-blur-sm px-8 py-8 md:px-14 md:py-10 text-center">

            <div className="absolute -top-2 left-1/2 -translate-x-1/2">
              <div className="w-4 h-4 rounded-full bg-amber-300 shadow-[0_0_30px_rgba(251,191,36,0.45)]" />
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-white/25">
              The selected moment
            </p>

            <p className="mt-4 text-2xl md:text-3xl font-light text-amber-100">
              {date}
            </p>

            <p className="mt-1 text-xl md:text-2xl font-light text-white/70">
              {time}
            </p>

            <p className="mt-4 text-sm text-white/30">
              {city}
              {state ? `, ${state}` : ""}
            </p>

          </div>

        </motion.div>

        {/* =================================================
            VERTICAL CONNECTION
        ================================================= */}

        <div className="flex justify-center py-10">

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 70 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-px bg-gradient-to-b from-amber-300/40 to-white/10"
          />

        </div>

        {/* =================================================
            FIVE MEASUREMENTS
        ================================================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/10 border border-white/10">

          {ITEMS.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.key}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                }}
                whileHover={{
                  backgroundColor: "rgba(251,191,36,0.045)",
                }}
                className="relative min-h-[310px] bg-[#090b0f] p-7 md:p-8 transition-colors"
              >

                {/* Number */}

                <div className="flex items-center justify-between">

                  <span className="text-[10px] tracking-[0.3em] text-amber-300/60">
                    {item.number}
                  </span>

                  <Icon
                    size={17}
                    strokeWidth={1}
                    className="text-white/20"
                  />

                </div>

                {/* Content */}

                <div className="mt-14">

                  <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                    {item.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-light text-white/80">
                    {item.title}
                  </h3>

                  <div className="w-8 h-px bg-amber-300/30 my-7" />

                  <p className="text-xl md:text-2xl font-light text-amber-100 break-words">
                    {item.getValue(data)}
                  </p>

                  <p className="mt-3 text-xs leading-relaxed text-white/30">
                    {item.getMeta(data)}
                  </p>

                </div>

                {/* Bottom marker */}

                <div
                  className={`absolute bottom-0 left-0 right-0 h-px ${
                    index === 0
                      ? "bg-amber-300/50"
                      : "bg-white/5"
                  }`}
                />

              </motion.div>
            );
          })}

        </div>

        {/* =================================================
            CONVERGENCE STATEMENT
        ================================================= */}

        <div className="flex justify-center">

          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: 90 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-px bg-gradient-to-b from-white/10 to-amber-300/40"
          />

        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 0.8,
          }}
          className="text-center"
        >

          <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12">

            <p className="text-xs uppercase tracking-[0.4em] text-amber-300/60">
              The Panchāṅga
            </p>

            <h3 className="mt-6 text-3xl md:text-5xl font-light">
              A language for measuring time.
            </h3>

            <p className="mt-6 text-sm md:text-base text-white/40 leading-relaxed max-w-2xl mx-auto">
              Tithi follows the changing relationship of the Sun and Moon.
              Nakṣatra follows the Moon's position among the stars.
              Yoga combines the two celestial longitudes.
              Karaṇa divides the lunar day.
              Vāra places the moment within the seven-day cycle.
            </p>

          </div>

        </motion.div>

        {/* =================================================
            CONTINUE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-20 text-center"
        >

          <p className="text-xs uppercase tracking-[0.3em] text-white/25 mb-6">
            The final exhibit awaits
          </p>

          <button
            type="button"
            onClick={onContinue}
            className="group inline-flex items-center gap-4 rounded-full border border-amber-300/30 bg-amber-300/[0.04] px-7 py-4 text-sm text-amber-100 transition-all hover:border-amber-300/60 hover:bg-amber-300/10"
          >

            <span>
              Test what you discovered
            </span>

            <ArrowDown
              size={16}
              className="transition-transform group-hover:translate-y-1"
            />

          </button>

        </motion.div>

      </div>

    </section>
  );
}

export default FiveMeasurements;