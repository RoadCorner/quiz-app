export default function ResultScreen({
  score,
  correct,
  total,
  fullTotal,
  exited,
  isReviewMode,
  reviewCount,
  onBack,
  onRetryWrong,
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
        <h1 style={title}>
          {exited ? "Quiz Ended" : isReviewMode ? "Review Result" : "Result"}
        </h1>

        <div style={scoreBox}>
          <p style={label}>Score</p>
          <h2 style={scoreText}>{score}</h2>
        </div>

        <div style={statBox}>
          <p>Correct: {correct} / {total}</p>
          <p>Accuracy: {accuracy}%</p>

          {!exited && reviewCount > 0 && (
            <p style={reviewText}>間違えた {reviewCount} 問を復習できます。</p>
          )}

          {exited && (
            <p style={exitText}>
              全 {fullTotal} 問中、{total} 問回答した時点で終了しました。
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

        <div style={actions}>
          {onRetryWrong && (
            <button onClick={onRetryWrong} style={secondaryBtn}>
              間違えた問題を復習
            </button>
          )}

          <button onClick={onBack} style={btn}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

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

const reviewText = {
  color: "#38bdf8",
  fontSize: "14px",
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

const actions = {
  marginTop: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const btn = {
  padding: "12px",
  background: "#64748b",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  border: "none",
};

const secondaryBtn = {
  padding: "12px",
  background: "#0f766e",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  border: "none",
};
