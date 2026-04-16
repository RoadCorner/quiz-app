export default function QuizHeader({ time, score, current, total, onExit }) {
  return (
    <div style={header}>
      <button onClick={onExit} style={exitBtn}>Exit</button>

      <h2 style={{ margin: 0 }}>Quiz</h2>

      <div>
        ⏱ {time.toFixed(1)}s &nbsp;
        Score: {score} &nbsp;
        {current + 1}/{total}
      </div>
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const exitBtn = {
  background: "#ef4444",
  padding: "6px 12px",
  borderRadius: "8px",
  color: "white",
  border: "none",
  cursor: "pointer",
};