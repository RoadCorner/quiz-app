import { useEffect, useRef, useState } from "react";
import ResultScreen from "../screens/ResultScreen";
import ChoicesList from "./ChoicesList";
import ExplanationPanel from "./ExplanationPanel";
import QuizHeader from "./QuizHeader";
import ComboBar from "./ComboBar";
import TextAnswerInput from "./TextAnswerInput";

function normalizeAnswerText(value) {
  return value
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'[\]\\]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function resolveTypedChoiceIndex(input, choices) {
  const normalizedInput = normalizeAnswerText(input);

  if (!normalizedInput) {
    return null;
  }

  const matches = choices.reduce((indices, choice, index) => {
    if (normalizeAnswerText(choice) === normalizedInput) {
      indices.push(index);
    }

    return indices;
  }, []);

  return matches.length === 1 ? matches[0] : null;
}

function createSessionState(sessionQuestions, reviewMode = false) {
  return {
    activeQuestions: sessionQuestions,
    current: 0,
    selected: null,
    typedAnswer: "",
    result: null,
    inputFeedback: "",
    score: 0,
    streak: 0,
    correctCount: 0,
    time: 0,
    bonus: 0,
    anim: "",
    finished: false,
    flash: "",
    exited: false,
    wrongQuestions: [],
    isReviewMode: reviewMode,
  };
}

export default function QuizPlayer({
  questions,
  shuffleChoices,
  shuffleQuestionsOrder,
  answerMode,
  showTextInputChoices,
  onBack,
}) {
  const [session, setSession] = useState(() => createSessionState(questions));

  const audioCtxRef = useRef(null);
  const {
    activeQuestions,
    current,
    selected,
    typedAnswer,
    result,
    inputFeedback,
    score,
    streak,
    correctCount,
    time,
    bonus,
    anim,
    finished,
    flash,
    exited,
    wrongQuestions,
    isReviewMode,
  } = session;
  const q = activeQuestions[current];

  useEffect(() => {
    setSession(createSessionState(questions));
  }, [questions]);

  useEffect(() => {
    if (finished || result !== null) return;

    const start = Date.now();
    const timer = setInterval(() => {
      setSession((prev) => ({
        ...prev,
        time: (Date.now() - start) / 1000,
      }));
    }, 50);

    return () => clearInterval(timer);
  }, [current, result, finished]);

  const handleExit = () => {
    setSession((prev) => ({
      ...prev,
      exited: true,
      finished: true,
    }));
  };

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

  const getComboColor = () => {
    if (streak >= 10) return "#a855f7";
    if (streak >= 7) return "#ef4444";
    if (streak >= 5) return "#facc15";
    if (streak >= 3) return "#22c55e";
    return "#38bdf8";
  };

  const check = () => {
    if (result !== null || !q) return;

    const resolvedSelected =
      answerMode === "text-input"
        ? resolveTypedChoiceIndex(typedAnswer, q.choices)
        : selected;

    if (answerMode === "text-input" && resolvedSelected === null) {
      setSession((prev) => ({
        ...prev,
        inputFeedback: "Enter one of the listed choices to check your answer.",
      }));
      return;
    }

    if (resolvedSelected === null) return;

    if (resolvedSelected === q.answer) {
      const speedBonus = Math.max(0, 20 - Math.floor(time / 5));

      setSession((prev) => ({
        ...prev,
        selected: resolvedSelected,
        result: "Correct!",
        inputFeedback: "",
        score: prev.score + 1 + speedBonus,
        correctCount: prev.correctCount + 1,
        bonus: speedBonus,
        streak: prev.streak + 1,
        anim: "pop",
        flash: "correct",
      }));
      setTimeout(() => {
        setSession((prev) => ({
          ...prev,
          flash: "",
        }));
      }, 200);

      play("correct");
      setTimeout(() => play("correct"), 120);
      setTimeout(() => play("correct"), 240);
    } else {
      setSession((prev) => ({
        ...prev,
        selected: resolvedSelected,
        result: "Wrong",
        inputFeedback: "",
        streak: 0,
        anim: "shake",
        flash: "wrong",
        wrongQuestions: [...prev.wrongQuestions, q],
      }));
      setTimeout(() => {
        setSession((prev) => ({
          ...prev,
          flash: "",
        }));
      }, 200);

      play("wrong");
    }
  };

  const next = () => {
    if (current + 1 >= activeQuestions.length) {
      setSession((prev) => ({
        ...prev,
        finished: true,
      }));
      return;
    }

    setSession((prev) => ({
      ...prev,
      current: prev.current + 1,
      selected: null,
      typedAnswer: "",
      result: null,
      inputFeedback: "",
      time: 0,
      bonus: 0,
      anim: "",
    }));
  };

  const restartWithWrongQuestions = () => {
    if (wrongQuestions.length === 0) return;

    setSession(createSessionState(wrongQuestions, true));
  };

  if (finished) {
    const answeredCount = exited
      ? current + (result !== null || selected !== null ? 1 : 0)
      : activeQuestions.length;

    return (
      <ResultScreen
        score={score}
        correct={correctCount}
        total={answeredCount}
        fullTotal={activeQuestions.length}
        exited={exited}
        isReviewMode={isReviewMode}
        reviewCount={wrongQuestions.length}
        onBack={onBack}
        onRetryWrong={wrongQuestions.length > 0 ? restartWithWrongQuestions : null}
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
        <div style={left}>
          <QuizHeader
            time={time}
            score={score}
            current={current}
            total={activeQuestions.length}
            shuffleChoices={shuffleChoices}
            shuffleQuestionsOrder={shuffleQuestionsOrder}
            answerMode={answerMode}
            showTextInputChoices={showTextInputChoices}
            onExit={handleExit}
          />

          <ComboBar streak={streak} getColor={getComboColor} />

          <div style={questionArea}>
            <h3 style={getQuestionStyle(anim)}>
              {q.question}
            </h3>
          </div>

          {answerMode === "text-input" && showTextInputChoices ? (
            <ChoicesList
              choices={q.choices}
              selected={selected}
              result={result}
              answer={q.answer}
              onSelect={() => {}}
              interactive={false}
            />
          ) : answerMode === "text-input" ? null : (
            <ChoicesList
              choices={q.choices}
              selected={selected}
              result={result}
              answer={q.answer}
              onSelect={(value) => {
                setSession((prev) => ({
                  ...prev,
                  selected: value,
                }));
              }}
            />
          )}
        </div>

        <div style={right}>
          <ExplanationPanel result={result} bonus={bonus} q={q} />

          <div style={actionArea}>
            {answerMode === "text-input" ? (
              <TextAnswerInput
                value={typedAnswer}
                onChange={(value) => {
                  setSession((prev) => ({
                    ...prev,
                    typedAnswer: value,
                    inputFeedback: "",
                  }));
                }}
                onSubmit={check}
              disabled={result !== null}
              feedback={inputFeedback}
            />
            ) : null}

            <button
              onClick={() => (!result ? check() : next())}
              disabled={
                answerMode === "text-input"
                  ? typedAnswer.trim().length === 0 && result === null
                  : selected === null && result === null
              }
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

const center = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  padding: "24px",
  boxSizing: "border-box",
};

const container = {
  width: "1180px",
  height: "760px",
  maxWidth: "calc(100vw - 48px)",
  maxHeight: "calc(100vh - 48px)",
  display: "flex",
  gap: "20px",
  background: "#1e293b",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  overflow: "hidden",
};

const left = {
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
};

const right = {
  flex: 1,
  minWidth: 0,
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

const actionArea = {
  marginTop: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
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
