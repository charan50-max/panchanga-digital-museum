import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const BASE_QUESTIONS = [
  {
    id: 1,
    type: "multiple",
    category: "Tithi",
    question: "What does a Tithi primarily measure?",
    options: [
      "The position of the Sun in the zodiac",
      "A lunar day based on the angular separation of the Moon and Sun",
      "The weekday",
      "A division of the Earth's orbit",
    ],
    answer: 1,
    explanation:
      "A Tithi is a lunar day determined by the angular separation between the Moon and Sun. Each Tithi spans 12° of separation.",
  },

  {
    id: 2,
    type: "multiple",
    category: "Nakṣatra",
    question: "How many Nakṣatras divide the 360° celestial circle?",
    options: [
      "12",
      "24",
      "27",
      "30",
    ],
    answer: 2,
    explanation:
      "The traditional system divides the 360° circle into 27 Nakṣatras. Each Nakṣatra therefore spans 13°20′.",
  },

  {
    id: 3,
    type: "multiple",
    category: "Nakṣatra",
    question: "Each Nakṣatra is divided into how many Padas?",
    options: [
      "2",
      "3",
      "4",
      "8",
    ],
    answer: 2,
    explanation:
      "Each Nakṣatra has four Padas. Since a Nakṣatra spans 13°20′, each Pada spans 3°20′.",
  },

  {
    id: 4,
    type: "multiple",
    category: "Yoga",
    question: "How is the Panchāṅga Yoga conceptually determined?",
    options: [
      "By adding the Sun's and Moon's longitudes",
      "By subtracting the weekday from the lunar day",
      "By measuring sunrise duration",
      "By dividing the zodiac into 12 signs",
    ],
    answer: 0,
    explanation:
      "Yoga is based on the combined longitude of the Sun and Moon. The result is normalized within 360° and divided into 27 equal sections.",
  },

  {
    id: 5,
    type: "multiple",
    category: "Karaṇa",
    question: "What is a Karaṇa?",
    options: [
      "A complete lunar month",
      "Half of a Tithi",
      "One quarter of a Nakṣatra",
      "A weekday",
    ],
    answer: 1,
    explanation:
      "A Karaṇa is half of a Tithi. Since a Tithi covers 12°, each Karaṇa covers 6° of Sun–Moon angular separation.",
  },

  {
    id: 6,
    type: "multiple",
    category: "Vāra",
    question: "What determines Vāra?",
    options: [
      "The Moon's Nakṣatra",
      "The Sun–Moon angular separation",
      "The civil weekday",
      "The current Yoga",
    ],
    answer: 2,
    explanation:
      "Vāra corresponds to the weekday: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday and Saturday.",
  },

  {
    id: 7,
    type: "truefalse",
    category: "Tithi",
    question: "A Tithi is always exactly the same amount of clock time.",
    options: [
      "True",
      "False",
    ],
    answer: 1,
    explanation:
      "False. A Tithi is defined astronomically by angular separation, not by a fixed number of clock hours. Its duration can therefore vary.",
  },

  {
    id: 8,
    type: "multiple",
    category: "Panchāṅga",
    question: "Why are the five Angas considered different measurements of the same moment?",
    options: [
      "They are five names for the same calculation",
      "They describe different astronomical or calendrical relationships at a given moment",
      "They only apply during festivals",
      "They are based only on sunrise",
    ],
    answer: 1,
    explanation:
      "The five Angas describe different dimensions of a moment: Tithi, Nakṣatra, Yoga, Karaṇa and Vāra.",
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  /*
   * Values from the Panchāṅga calculation selected by the visitor.
   */
  const selectedDate = searchParams.get("date");
  const selectedTime = searchParams.get("time");
  const selectedCity = searchParams.get("city");
  const selectedState = searchParams.get("state");

  /*
   * Dynamic questions based on the actual Panchāṅga explored.
   */
  const questions = useMemo(() => {
    const dynamicQuestions = [...BASE_QUESTIONS];

    /*
     * If the selected moment contains Panchāṅga values in the URL,
     * we can later expand this into personalized questions.
     *
     * For now, the core quiz remains concept-based so it tests
     * what the visitor actually learned in the exhibits.
     */

    return dynamicQuestions;
  }, []);

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const score = Object.values(answers).filter(
    (answer) => answer.correct
  ).length;

  function handleSelect(index) {
    if (selectedAnswer !== null) return;

    const correct = index === question.answer;

    setSelectedAnswer(index);

    setAnswers((previous) => ({
      ...previous,
      [question.id]: {
        selected: index,
        correct,
      },
    }));

    setShowExplanation(true);
  }

  function handleNext() {
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((previous) => previous + 1);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }

  function handleRestart() {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers({});
    setShowExplanation(false);
    setFinished(false);
  }

  function handleExploreAgain() {
    navigate("/");
  }

  if (finished) {
    return (
      <QuizResult
        score={score}
        total={questions.length}
        date={selectedDate}
        time={selectedTime}
        city={selectedCity}
        state={selectedState}
        onRestart={handleRestart}
        onExploreAgain={handleExploreAgain}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-[#f5f1e8] overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[10%] w-[500px] h-[500px] rounded-full bg-amber-300/[0.025] blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[5%] w-[500px] h-[500px] rounded-full bg-orange-400/[0.02] blur-[120px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-amber-300/60">
              Final Exhibit
            </p>

            <h1 className="text-xl md:text-2xl font-light tracking-wide mt-1">
              Panchāṅga Knowledge
            </h1>
          </div>

          <div className="text-right">
            <p className="text-xs text-white/30">
              Question
            </p>

            <p className="text-sm text-white/70 mt-1">
              {currentQuestion + 1} / {questions.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-px bg-white/5">
          <motion.div
            className="h-px bg-amber-300"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </header>

      {/* Main */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Selected moment */}
        {selectedDate && selectedCity && (
          <div className="mb-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-white/25">
              Your Museum Journey
            </p>

            <p className="text-sm text-white/45 mt-3">
              {selectedDate} · {selectedTime} · {selectedCity}
              {selectedState ? `, ${selectedState}` : ""}
            </p>
          </div>
        )}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -25 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-300/20 bg-amber-300/[0.04]">
                <Sparkles size={13} className="text-amber-300/70" />

                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-300/70">
                  {question.category}
                </span>
              </div>

              <h2 className="mt-7 text-3xl md:text-5xl font-light leading-tight">
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.answer;

                let optionClass =
                  "border-white/10 bg-white/[0.02] hover:border-amber-300/30 hover:bg-white/[0.04]";

                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    optionClass =
                      "border-emerald-400/40 bg-emerald-400/[0.08]";
                  } else if (isSelected) {
                    optionClass =
                      "border-red-400/40 bg-red-400/[0.07]";
                  } else {
                    optionClass =
                      "border-white/5 bg-white/[0.01] opacity-50";
                  }
                }

                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileHover={
                      selectedAnswer === null
                        ? { x: 4 }
                        : {}
                    }
                    whileTap={
                      selectedAnswer === null
                        ? { scale: 0.995 }
                        : {}
                    }
                    onClick={() => handleSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-5 md:p-6 rounded-xl border transition-all duration-300 ${optionClass}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs shrink-0 ${
                          selectedAnswer !== null &&
                          isCorrect
                            ? "border-emerald-400/50 text-emerald-300"
                            : selectedAnswer !== null &&
                              isSelected
                            ? "border-red-400/50 text-red-300"
                            : "border-white/15 text-white/40"
                        }`}
                      >
                        {selectedAnswer !== null &&
                        isCorrect ? (
                          <Check size={15} />
                        ) : selectedAnswer !== null &&
                          isSelected ? (
                          <X size={15} />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>

                      <span className="text-sm md:text-base text-white/75 leading-relaxed">
                        {option}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  className="mt-7 overflow-hidden"
                >
                  <div
                    className={`rounded-xl border p-6 ${
                      selectedAnswer === question.answer
                        ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                        : "border-amber-300/20 bg-amber-300/[0.035]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-3">
                      {selectedAnswer === question.answer
                        ? "Correct"
                        : "The museum explains"}
                    </p>

                    <p className="text-sm text-white/55 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next */}
            <div className="mt-10 flex justify-end">
              <button
                type="button"
                disabled={selectedAnswer === null}
                onClick={handleNext}
                className={`group inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all ${
                  selectedAnswer === null
                    ? "border-white/5 text-white/20 cursor-not-allowed"
                    : "border-amber-300/30 text-amber-200 hover:bg-amber-300/[0.07]"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.2em]">
                  {currentQuestion === questions.length - 1
                    ? "See your result"
                    : "Next question"}
                </span>

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </main>
  );
}


/* -------------------------------------------------------
   RESULT SCREEN
------------------------------------------------------- */

function QuizResult({
  score,
  total,
  date,
  time,
  city,
  state,
  onRestart,
  onExploreAgain,
}) {
  const percentage = Math.round((score / total) * 100);

  let message = "";

  if (percentage === 100) {
    message = "You completed the museum with a complete understanding of its five measurements.";
  } else if (percentage >= 75) {
    message = "You have a strong understanding of the Panchāṅga concepts explored in the museum.";
  } else if (percentage >= 50) {
    message = "You have discovered the foundations of the Panchāṅga. A second visit can reveal more.";
  } else {
    message = "The museum journey is only beginning. Explore the exhibits once more and discover the relationships again.";
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-[#f5f1e8] flex items-center justify-center px-6 py-20">
      <div className="relative w-full max-w-3xl text-center">
        {/* Glow */}
        <div className="absolute inset-x-1/2 top-20 -translate-x-1/2 w-72 h-72 bg-amber-300/[0.06] blur-[100px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <p className="text-[10px] uppercase tracking-[0.45em] text-amber-300/60">
            Final Exhibit
          </p>

          <h1 className="text-5xl md:text-7xl font-light tracking-tight mt-5">
            Your Journey
          </h1>

          <div className="w-16 h-px bg-amber-300/40 mx-auto my-7" />

          {/* Score */}
          <div className="relative mx-auto w-52 h-52 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-amber-300/20" />

            <div className="absolute inset-4 rounded-full border border-white/5" />

            <div>
              <p className="text-6xl font-light text-amber-200">
                {score}
              </p>

              <p className="text-xs uppercase tracking-[0.25em] text-white/30 mt-2">
                of {total}
              </p>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-light mt-10">
            {percentage}% · Panchāṅga Explorer
          </h2>

          <p className="max-w-xl mx-auto mt-6 text-sm md:text-base text-white/45 leading-relaxed">
            {message}
          </p>

          {/* Journey details */}
          {date && city && (
            <div className="mt-10 inline-flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/25">
              <span>{date}</span>
              <span>·</span>
              <span>{time}</span>
              <span>·</span>
              <span>{city}</span>
              {state && (
                <>
                  <span>·</span>
                  <span>{state}</span>
                </>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onRestart}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-amber-300/30 text-amber-200 hover:bg-amber-300/[0.07] transition"
            >
              <RotateCcw
                size={15}
                className="transition-transform group-hover:-rotate-45"
              />

              <span className="text-xs uppercase tracking-[0.2em]">
                Try Again
              </span>
            </button>

            <button
              type="button"
              onClick={onExploreAgain}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 transition"
            >
              <ArrowLeft size={15} />

              <span className="text-xs uppercase tracking-[0.2em]">
                Explore Museum Again
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default Quiz;