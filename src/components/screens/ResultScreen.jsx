export default function ResultScreen({
  score,
  correct,
  total,
  fullTotal,
  exited,
  onBack,
}) {
  const accuracy =
    total > 0 && correct != null
      ? Math.round((correct / total) * 100)
      : 0;

  const getRank = () => {
    if (accuracy === 100) return "S";
    if (accuracy >= 80) return "A";
    if (accuracy >= 60) return "B";
    return "C";
  };

  const getRankColor = () => {
    if (accuracy === 100) return "#a855f7";
    if (accuracy >= 80) return "#22c55e";
    if (accuracy >= 60) return "#facc15";
    return "#ef4444";
  };

  return (
    <div style={center}>
      <div style={box}>
        <h1 style={title}>{exited ? "Quiz Ended" : "Result"}</h1>

        <div style={scoreBox}>
          <p style={label}>Score</p>
          <h2 style={scoreText}>{score}</h2>
        </div>

        <div style={statBox}>
          <p>Correct: {correct} / {total}</p>
          <p>Accuracy: {accuracy}%</p>

          {exited && (
            <p style={exitText}>
              途中終了: 全 {fullTotal} 問中、{total} 問時点の結果です
            </p>
          )}
        </div>

        <div
          style={{
            ...rankBox,
            color: getRankColor(),
            borderColor: getRankColor(),
          }}
        >
          {getRank()}
        </div>

        <button onClick={onBack} style={btn}>
          Back
        </button>
      </div>
    </div>
  );
}

/* ===== スタイル ===== */

const center = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#020617",
  color: "white",
};

const box = {
  background: "#1e293b",
  padding: "40px",
  borderRadius: "20px",
  textAlign: "center",
  width: "360px",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const title = {
  margin: 0,
  fontSize: "28px",
};

const scoreBox = {
  marginTop: "10px",
};

const label = {
  fontSize: "14px",
  opacity: 0.7,
  margin: 0,
};

const scoreText = {
  fontSize: "36px",
  margin: 0,
};

const statBox = {
  fontSize: "16px",
  lineHeight: "1.6",
};

const exitText = {
  color: "#facc15",
  fontSize: "14px",
};

const rankBox = {
  marginTop: "10px",
  fontSize: "32px",
  fontWeight: "bold",
  border: "2px solid",
  borderRadius: "12px",
  padding: "10px",
};

const btn = {
  marginTop: "20px",
  padding: "12px",
  background: "#64748b",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  border: "none",
};