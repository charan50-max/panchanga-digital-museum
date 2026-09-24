import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin, CalendarDays, Clock3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const cities = [
  {
    name: "Mumbai",
    state: "Maharashtra",
    latitude: 19.076,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
  },
  {
    name: "Navi Mumbai",
    state: "Maharashtra",
    latitude: 19.033,
    longitude: 73.0297,
    timezone: "Asia/Kolkata",
  },
  {
    name: "Pune",
    state: "Maharashtra",
    latitude: 18.5204,
    longitude: 73.8567,
    timezone: "Asia/Kolkata",
  },
  {
    name: "Bengaluru",
    state: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: "Asia/Kolkata",
  },
  {
    name: "New Delhi",
    state: "Delhi",
    latitude: 28.6139,
    longitude: 77.209,
    timezone: "Asia/Kolkata",
  },
];

function Input() {
  const navigate = useNavigate();

  const [date, setDate] = useState("2026-09-24");
  const [time, setTime] = useState("10:30");
  const [cityIndex, setCityIndex] = useState(0);

  const selectedCity = cities[cityIndex];

  function handleContinue() {
    const params = new URLSearchParams({
      date,
      time,
      city: selectedCity.name,
      state: selectedCity.state,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezone: selectedCity.timezone,
    });

    navigate(`/museum?${params.toString()}`);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08090d] text-[#f5f1e8]">

      {/* Ambient celestial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[500px] rounded-full
                      bg-amber-300/[0.025] blur-3xl pointer-events-none" />

      {/* Decorative orbital rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[650px] h-[650px] rounded-full
                   border border-amber-300/[0.05] pointer-events-none"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[420px] h-[420px] rounded-full
                   border border-white/[0.035] pointer-events-none"
      />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">

        <div className="w-full max-w-3xl">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.45em]
                          text-amber-300/75 mb-5">
              Exhibit 01
            </p>

            <h1 className="text-4xl md:text-6xl font-light tracking-tight">
              Choose a Moment
            </h1>

            <p className="mt-3 text-2xl md:text-3xl font-light text-white/40">
              in Time
            </p>

            <div className="w-16 h-px bg-amber-300/40 mx-auto my-7" />

            <p className="max-w-xl mx-auto text-sm md:text-base
                          leading-relaxed text-white/45">
              Every Panchāṅga begins with a moment in time.
              Choose when and where you would like to observe the sky.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="space-y-5"
          >

            {/* Date */}
            <div className="group rounded-2xl border border-white/10
                            bg-white/[0.025] p-5 md:p-6
                            hover:border-amber-300/25 transition-colors">

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full
                                border border-amber-300/20
                                flex items-center justify-center">
                  <CalendarDays size={18} className="text-amber-300/80" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em]
                                text-amber-300/60">
                    Date
                  </p>

                  <p className="text-sm text-white/40 mt-1">
                    Which day shall we observe?
                  </p>
                </div>
              </div>

              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="w-full bg-transparent border border-white/10
                           rounded-xl px-4 py-3 text-white
                           outline-none focus:border-amber-300/50
                           color-scheme-dark"
              />
            </div>

            {/* Time */}
            <div className="group rounded-2xl border border-white/10
                            bg-white/[0.025] p-5 md:p-6
                            hover:border-amber-300/25 transition-colors">

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full
                                border border-amber-300/20
                                flex items-center justify-center">
                  <Clock3 size={18} className="text-amber-300/80" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em]
                                text-amber-300/60">
                    Time
                  </p>

                  <p className="text-sm text-white/40 mt-1">
                    Choose the exact moment.
                  </p>
                </div>
              </div>

              <input
                type="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className="w-full bg-transparent border border-white/10
                           rounded-xl px-4 py-3 text-white
                           outline-none focus:border-amber-300/50
                           color-scheme-dark"
              />
            </div>

            {/* Location */}
            <div className="group rounded-2xl border border-white/10
                            bg-white/[0.025] p-5 md:p-6
                            hover:border-amber-300/25 transition-colors">

              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full
                                border border-amber-300/20
                                flex items-center justify-center">
                  <MapPin size={18} className="text-amber-300/80" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em]
                                text-amber-300/60">
                    Location
                  </p>

                  <p className="text-sm text-white/40 mt-1">
                    Where are we observing from?
                  </p>
                </div>
              </div>

              <select
                value={cityIndex}
                onChange={(event) => setCityIndex(Number(event.target.value))}
                className="w-full bg-[#111217] border border-white/10
                           rounded-xl px-4 py-3 text-white
                           outline-none focus:border-amber-300/50"
              >
                {cities.map((city, index) => (
                  <option key={city.name} value={index}>
                    {city.name}, {city.state}
                  </option>
                ))}
              </select>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1
                              text-xs text-white/25">
                <span>
                  Latitude: {selectedCity.latitude}
                </span>

                <span>
                  Longitude: {selectedCity.longitude}
                </span>

                <span>
                  {selectedCity.timezone}
                </span>
              </div>
            </div>

          </motion.div>

          {/* Selected moment preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-[10px] uppercase tracking-[0.3em]
                          text-white/25 mb-3">
              Your observation
            </p>

            <p className="text-sm text-white/55">
              {date} · {time} · {selectedCity.name}
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex justify-center gap-4 mt-9"
          >

            <button
              type="button"
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 px-5 py-3
                         rounded-full border border-white/10
                         text-white/50 hover:text-white
                         hover:border-white/20 transition"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            <button
              type="button"
              onClick={handleContinue}
              className="inline-flex items-center gap-2 px-7 py-3
                         rounded-full bg-amber-300
                         text-black font-medium
                         hover:bg-amber-200 transition"
            >
              Continue
              <ArrowRight size={16} />
            </button>

          </motion.div>

        </div>

      </section>
    </main>
  );
}

export default Input;