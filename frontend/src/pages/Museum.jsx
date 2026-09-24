import { useNavigate, useSearchParams } from "react-router-dom";
import FiveMeasurements from "../components/museum/FiveMeasurements";
import VaraCycle from "../components/panchanga/VaraCycle";
import KaranaDiagram from "../components/panchanga/KaranaDiagram";
import YogaDiagram from "../components/panchanga/YogaDiagram";
import NakshatraWheel from "../components/panchanga/NakshatraWheel";
import TithiWheel from "../components/panchanga/TithiWheel";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ArrowDownRight } from "lucide-react";
import { getPanchanga } from "../services/panchangaService";

function Museum() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // -------------------------------------------------------
  // Read selected date, time and location from URL
  // -------------------------------------------------------

  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const city = searchParams.get("city");
  const state = searchParams.get("state");

  const latitude = Number(searchParams.get("latitude"));
  const longitude = Number(searchParams.get("longitude"));

  // Current backend expects timezone as a numeric UTC offset.
  // India = UTC +5:30
  const timezone = Number(searchParams.get("timezone")) || 5.5;

  // -------------------------------------------------------
  // State
  // -------------------------------------------------------

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -------------------------------------------------------
  // Fetch Panchanga
  // -------------------------------------------------------

  useEffect(() => {
    async function loadPanchanga() {
      try {
        setLoading(true);
        setError("");

        const result = await getPanchanga({
          date,
          time,
          latitude,
          longitude,
          timezone,
        });

        setData(result);
      } catch (err) {
        console.error("Panchanga API error:", err);

        setError(
          err.message ||
            "Something went wrong while calculating the Panchāṅga."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPanchanga();
  }, [date, time, latitude, longitude, timezone]);

  // -------------------------------------------------------
  // Scroll to exhibit
  // -------------------------------------------------------

  function scrollToExhibit(exhibitId) {
    const element = document.getElementById(exhibitId);

    if (!element) {
      console.warn(`Could not find exhibit: ${exhibitId}`);
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  // -------------------------------------------------------
  // Main UI
  // -------------------------------------------------------

  return (
    <main className="min-h-screen bg-[#08090d] text-[#f5f1e8] px-6 py-16 md:px-10 md:py-24">
      <section className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-amber-300/70 mb-5">
            The Museum
          </p>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight">
            Your Panchāṅga
          </h1>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/40">
            <span>{date}</span>

            <span>{time}</span>

            <span>
              {city}
              {state ? `, ${state}` : ""}
            </span>
          </div>

          <div className="w-full h-px bg-white/10 my-12" />
        </motion.div>

        {/* =================================================
            LOADING STATE
        ================================================= */}

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-[350px] flex flex-col items-center justify-center"
          >
            {/* Animated celestial circle */}

            <div className="relative w-24 h-24 mb-8">

              {/* Outer circle */}

              <div className="absolute inset-0 rounded-full border border-amber-300/20" />

              {/* Rotating orbit */}

              <motion.div
                className="absolute inset-2 rounded-full border border-amber-300/50"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Center */}

              <div className="absolute inset-0 flex items-center justify-center text-amber-300 text-2xl">
                ☼
              </div>
            </div>

            <p className="text-xs uppercase tracking-[0.35em] text-white/40">
              Reading the sky
            </p>

            <p className="mt-3 text-sm text-white/25">
              Calculating your Panchāṅga...
            </p>
          </motion.div>
        )}

        {/* =================================================
            ERROR STATE
        ================================================= */}

        {!loading && error && (
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="max-w-2xl mx-auto rounded-2xl border border-red-300/10 bg-red-300/[0.03] p-8 text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-red-300/60 mb-4">
              Calculation Error
            </p>

            <h2 className="text-2xl font-light mb-4">
              The sky could not be read.
            </h2>

            <p className="text-sm text-white/40 leading-relaxed">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-sm text-white/60 hover:text-white hover:border-amber-300/30 transition"
            >
              <RefreshCw size={15} />

              Try again
            </button>
          </motion.div>
        )}

        {/* =================================================
            PANCHANGA CONTENT
        ================================================= */}

        {!loading && !error && data && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* Introduction */}

            <p className="max-w-2xl text-white/40 leading-relaxed mb-12">
              Five measurements describe the selected moment. Each reveals a
              different relationship between the Earth, Sun, Moon, and the
              rhythm of time.
            </p>

            {/* =================================================
                FIVE PANCHANGA CARDS
            ================================================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">

              {/* TITHI */}

              <PanchangaCard
                number="01"
                label="Tithi"
                subtitle="The lunar day"
                value={data.panchanga.tithi.name}
                detail={`Tithi ${data.panchanga.tithi.number} · ${data.panchanga.tithi.paksha} Pakṣa`}
                onClick={() => scrollToExhibit("exhibit-tithi")}
              />

              {/* NAKSHATRA */}

              <PanchangaCard
                number="02"
                label="Nakṣatra"
                subtitle="The Moon's celestial sector"
                value={data.panchanga.nakshatra.name}
                detail={`Nakṣatra ${data.panchanga.nakshatra.number} · Pada ${data.panchanga.nakshatra.pada}`}
                onClick={() => scrollToExhibit("exhibit-nakshatra")}
              />

              {/* YOGA */}

              <PanchangaCard
                number="03"
                label="Yoga"
                subtitle="The combined Sun–Moon position"
                value={data.panchanga.yoga.name}
                detail={`Yoga ${data.panchanga.yoga.number}`}
                onClick={() => scrollToExhibit("exhibit-yoga")}
              />

              {/* KARANA */}

              <PanchangaCard
                number="04"
                label="Karaṇa"
                subtitle="Half of a Tithi"
                value={data.panchanga.karana.name}
                detail={`Sequence position ${data.panchanga.karana.number}`}
                onClick={() => scrollToExhibit("exhibit-karana")}
              />

              {/* VARA */}

              <PanchangaCard
                number="05"
                label="Vāra"
                subtitle="The weekday"
                value={data.panchanga.vara.name}
                detail={`Day ${Number(data.panchanga.vara.number) + 1} of 7`}
                onClick={() => scrollToExhibit("exhibit-vara")}
              />

              {/* MOMENT CARD */}

              <div className="bg-[#0b0d12] p-8 md:p-10 flex flex-col justify-center">

                <p className="text-xs uppercase tracking-[0.3em] text-amber-300/50 mb-4">
                  The moment
                </p>

                <p className="text-lg font-light text-white/70">
                  {date}
                </p>

                <p className="text-3xl font-light text-amber-200 mt-1">
                  {time}
                </p>

                <p className="text-sm text-white/30 mt-4">
                  {city}
                  {state ? `, ${state}` : ""}
                </p>

              </div>

            </div>


            {/* =================================================
                EXHIBIT 01 — TITHI
            ================================================= */}

            <section
              id="exhibit-tithi"
              className="pt-32 scroll-mt-10"
            >
              <div className="w-full h-px bg-white/10 mb-20" />

              <TithiWheel
                tithi={data.panchanga.tithi}
                phaseDegrees={data.panchanga.tithi.phase_degrees}
              />
            </section>


            {/* =================================================
                EXHIBIT 02 — NAKṢATRA
            ================================================= */}

            <section
              id="exhibit-nakshatra"
              className="pt-32 scroll-mt-10"
            >
              <div className="w-full h-px bg-white/10 mb-20" />

              <NakshatraWheel
                nakshatra={data.panchanga.nakshatra}
              />
            </section>


            {/* =================================================
                EXHIBIT 03 — YOGA
            ================================================= */}

            <section
              id="exhibit-yoga"
              className="pt-32 scroll-mt-10"
            >
              <div className="w-full h-px bg-white/10 mb-20" />

              <YogaDiagram
                yoga={data.panchanga.yoga}
                astronomy={data.astronomy}
              />
            </section>


            {/* =================================================
                EXHIBIT 04 — KARAṆA
            ================================================= */}

            <section
              id="exhibit-karana"
              className="pt-32 scroll-mt-10"
            >
              <div className="w-full h-px bg-white/10 mb-20" />

              <KaranaDiagram
                karana={data.panchanga.karana}
                tithi={data.panchanga.tithi}
              />
            </section>


            {/* =================================================
                EXHIBIT 05 — VĀRA
            ================================================= */}

            <section
              id="exhibit-vara"
              className="pt-32 scroll-mt-10"
            >
              <div className="w-full h-px bg-white/10 mb-20" />

              <VaraCycle
                vara={data.panchanga.vara}
              />
            </section>


            {/* =================================================
                THE CONVERGENCE — FIVE MEASUREMENTS
            ================================================= */}

            <section className="mt-32">

              <div className="w-full h-px bg-white/10 mb-20" />

              <FiveMeasurements
                data={data}
                date={date}
                time={time}
                city={city}
                state={state}
                onContinue={() =>
                  navigate(
                    `/quiz?${searchParams.toString()}`
                  )
                }
              />

            </section>


            {/* =================================================
                CELESTIAL GEOMETRY
            ================================================= */}

            <section className="mt-20">

              <p className="text-xs uppercase tracking-[0.35em] text-amber-300/60 mb-4">
                Behind the calculation
              </p>

              <h2 className="text-3xl md:text-4xl font-light">
                The celestial geometry
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/35">
                The Panchāṅga measurements are derived from the calculated
                positions of the Sun and Moon at the selected moment.
              </p>

              {/* Astronomy cards */}

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <AstronomyValue
                  label="Sun"
                  value={`${data.astronomy.sun_sidereal_longitude.toFixed(
                    2
                  )}°`}
                  subtitle="Sidereal longitude"
                />

                <AstronomyValue
                  label="Moon"
                  value={`${data.astronomy.moon_sidereal_longitude.toFixed(
                    2
                  )}°`}
                  subtitle="Sidereal longitude"
                />

                <AstronomyValue
                  label="Lunar phase"
                  value={`${data.panchanga.tithi.phase_degrees.toFixed(
                    2
                  )}°`}
                  subtitle="Sun–Moon separation"
                />

                <AstronomyValue
                  label="Ayanāṃśa"
                  value={`${data.astronomy.ayanamsa.toFixed(2)}°`}
                  subtitle="Sidereal correction"
                />

              </div>

            </section>

          </motion.div>
        )}

      </section>
    </main>
  );
}


/* =========================================================
   PANCHANGA CARD COMPONENT
========================================================= */

function PanchangaCard({
  number,
  label,
  subtitle,
  value,
  detail,
  onClick,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.995,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        relative
        text-left
        bg-[#0b0d12]
        p-8
        md:p-10
        min-h-[260px]
        flex
        flex-col
        justify-between
        group
        cursor-pointer
        focus:outline-none
        focus-visible:ring-1
        focus-visible:ring-amber-300/60
      "
    >

      {/* Top */}

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-amber-300/60">
            {number}
          </p>

          <h2 className="mt-3 text-2xl font-light">
            {label}
          </h2>

          <p className="mt-2 text-xs text-white/30">
            {subtitle}
          </p>

        </div>

        {/* Indicator */}

        <div className="flex items-center gap-3">

          <div className="w-2 h-2 rounded-full bg-amber-300/40 group-hover:bg-amber-200 transition" />

          <ArrowDownRight
            size={16}
            className="
              text-white/15
              transition-all
              duration-300
              group-hover:text-amber-300/70
              group-hover:translate-x-0.5
              group-hover:translate-y-0.5
            "
          />

        </div>

      </div>

      {/* Bottom */}

      <div>

        <p className="text-2xl md:text-3xl font-light text-amber-100">
          {value}
        </p>

        <p className="mt-3 text-xs text-white/30">
          {detail}
        </p>

        {/* Hover hint */}

        <p
          className="
            mt-5
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-amber-300/0
            group-hover:text-amber-300/50
            transition-colors
            duration-300
          "
        >
          View exhibit
        </p>

      </div>

    </motion.button>
  );
}


/* =========================================================
   ASTRONOMY VALUE COMPONENT
========================================================= */

function AstronomyValue({
  label,
  value,
  subtitle,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">

      <p className="text-xs uppercase tracking-[0.25em] text-white/30">
        {label}
      </p>

      <p className="mt-4 text-2xl font-light text-amber-100">
        {value}
      </p>

      <p className="mt-2 text-xs text-white/25">
        {subtitle}
      </p>

    </div>
  );
}


export default Museum;