export default function QuizHeader({
  time,
  score,
  current,
  total,
  shuffleChoices,
  onExit,
}) {
  return (
    <div style={header}>
      <button onClick={onExit} style={exitBtn}>Exit</button>

      <h2 style={{ margin: 0 }}>Quiz</h2>

      <div style={stats}>
        <span>Time {time.toFixed(1)}s</span>
        <span>Score: {score}</span>
        <span>{current + 1}/{total}</span>
        <span style={shuffleChoices ? shuffleOn : shuffleOff}>
          Choices: {shuffleChoices ? "Shuffled" : "Fixed"}
        </span>
      </div>
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const stats = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  color: "#cbd5e1",
};

const exitBtn = {
  background: "#ef4444",
  padding: "6px 12px",
  borderRadius: "8px",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const shuffleOn = {
  padding: "4px 8px",
  borderRadius: "999px",
  background: "rgba(37, 99, 235, 0.2)",
  color: "#bfdbfe",
  border: "1px solid rgba(147, 197, 253, 0.4)",
};

const shuffleOff = {
  padding: "4px 8px",
  borderRadius: "999px",
  background: "rgba(100, 116, 139, 0.18)",
  color: "#cbd5e1",
  border: "1px solid rgba(148, 163, 184, 0.28)",
};
