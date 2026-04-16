import { useState, useEffect, useRef } from "react";
import ResultScreen from "../screens/ResultScreen";
import ChoicesList from "./ChoicesList";
import ExplanationPanel from "./ExplanationPanel";
import QuizHeader from "./QuizHeader";
import ComboBar from "./ComboBar";

export default function QuizPlayer({ questions, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [time, setTime] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [anim, setAnim] = useState("");
  const [finished, setFinished] = useState(false);
  const [flash, setFlash] = useState("");
  const [exited, setExited] = useState(false);

  const audioCtxRef = useRef(null);
  const q = questions[current];

  /* ===== タイマー ===== */
  useEffect(() => {
    if (finished || result !== null) return;

    const start = Date.now();
    const t = setInterval(() => {
      setTime((Date.now() - start) / 1000);
    }, 50);

    return () => clearInterval(t);
  }, [current, result, finished]);

  /* ===== Exit ===== */
  const handleExit = () => {
    setExited(true);
    setFinished(true);
  };

  /* ===== Audio ===== */
  const getAudioCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const play = async (type) => {
    const ctx = getAudioCtx();

    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      osc.type = "square";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
    } else {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.2);
    }

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  /* ===== コンボ色 ===== */
  const getComboColor = () => {
    if (streak >= 10) return "#a855f7";
    if (streak >= 7) return "#ef4444";
    if (streak >= 5) return "#facc15";
    if (streak >= 3) return "#22c55e";
    return "#38bdf8";
  };

  /* ===== 判定 ===== */
  const check = () => {
    if (result !== null || selected === null) return;

    if (selected === q.answer) {
      const speedBonus = Math.max(0, 20 - Math.floor(time / 5));

      setResult("Correct!");
      setScore((s) => s + 1 + speedBonus);
      setCorrectCount((c) => c + 1);
      setBonus(speedBonus);
      setStreak((s) => s + 1);
      setAnim("pop");

      setFlash("correct");
      setTimeout(() => setFlash(""), 200);

      play("correct");
      setTimeout(() => play("correct"), 120);
      setTimeout(() => play("correct"), 240);
    } else {
      setResult("Wrong");
      setStreak(0);
      setAnim("shake");

      setFlash("wrong");
      setTimeout(() => setFlash(""), 200);

      play("wrong");
    }
  };

  /* ===== 次へ ===== */
  const next = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      return;
    }

    setCurrent((c) => c + 1);
    setSelected(null);
    setResult(null);
    setTime(0);
    setBonus(0);
    setAnim("");
  };

  /* ===== リザルト ===== */
  if (finished) {
    const answeredCount = exited
      ? current + (result !== null || selected !== null ? 1 : 0)
      : questions.length;

    return (
      <ResultScreen
        score={score}
        correct={correctCount}
        total={answeredCount}
        fullTotal={questions.length}
        exited={exited}
        onBack={onBack}
      />
    );
  }

  if (!q) return <div style={center}>No Questions</div>;

  return (
    <div style={center}>
      <div
        style={{
          ...container,
          ...(flash === "correct" && flashCorrect),
          ...(flash === "wrong" && flashWrong),
        }}
      >
        {/* 左 */}
        <div style={left}>
          <QuizHeader
            time={time}
            score={score}
            current={current}
            total={questions.length}
            onExit={handleExit}
          />

          <ComboBar streak={streak} getColor={getComboColor} />

          <div style={questionArea}>
            <h3 style={getQuestionStyle(anim)}>
              {q.question}
            </h3>
          </div>

          <ChoicesList
            choices={q.choices}
            selected={selected}
            result={result}
            answer={q.answer}
            onSelect={setSelected}
          />
        </div>

        {/* 右 */}
        <div style={right}>
          <ExplanationPanel result={result} bonus={bonus} q={q} />

          <div style={{ marginTop: "auto" }}>
            <button
              onClick={() => (!result ? check() : next())}
              disabled={selected === null && result === null}
              style={mainBtn}
            >
              {result ? "Next" : "Check"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

/* ===== スタイル ===== */

const center = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const container = {
  width: "1000px",
  height: "80vh",
  display: "flex",
  gap: "20px",
  background: "#1e293b",
  padding: "20px",
  borderRadius: "15px",
};

const left = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const right = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
};

const questionArea = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const mainBtn = {
  padding: "12px",
  borderRadius: "10px",
  background: "#64748b",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const flashCorrect = {
  boxShadow: "0 0 40px rgba(34,197,94,0.8)",
};

const flashWrong = {
  boxShadow: "0 0 40px rgba(239,68,68,0.8)",
};

const getQuestionStyle = (anim) => ({
  textAlign: "center",
  lineHeight: "1.6",
  ...(anim === "pop" ? { animation: "pop 0.2s ease" } : {}),
  ...(anim === "shake" ? { animation: "shake 0.3s" } : {}),
});