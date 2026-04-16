export default function QuizHeader({
  time,
  score,
  current,
  total,
  shuffleChoices,
  shuffleQuestionsOrder,
  answerMode,
  showTextInputChoices,
  onExit,
}) {
  return (
    <div style={header}>
      <div style={headerMain}>
        <button onClick={onExit} style={exitBtn}>Exit</button>
        <div style={titleBlock}>
          <h2 style={title}>Quiz</h2>
          <div style={stats}>
            <span>Time {time.toFixed(1)}s</span>
            <span>Score: {score}</span>
            <span>{current + 1}/{total}</span>
          </div>
        </div>
      </div>

      <div style={options}>
        <span style={shuffleChoices ? shuffleOn : shuffleOff}>
          Choices: {shuffleChoices ? "Shuffled" : "Fixed"}
        </span>
        <span style={shuffleQuestionsOrder ? shuffleOn : shuffleOff}>
          Order: {shuffleQuestionsOrder ? "Shuffled" : "Fixed"}
        </span>
        <span style={answerMode === "text-input" ? shuffleOn : shuffleOff}>
          Mode: {answerMode === "text-input" ? "Text Input" : "Multiple Choice"}
        </span>
        {answerMode === "text-input" ? (
          <span style={showTextInputChoices ? shuffleOn : shuffleOff}>
            Choices: {showTextInputChoices ? "Visible" : "Hidden"}
          </span>
        ) : null}
      </div>
    </div>
  );
}

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
  flexWrap: "wrap",
};

const headerMain = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
};

const titleBlock = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  minWidth: 0,
};

const title = {
  margin: 0,
  fontSize: "24px",
  lineHeight: 1,
};

const stats = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
  color: "#cbd5e1",
  fontSize: "13px",
};

const options = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginLeft: "auto",
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
  padding: "3px 7px",
  borderRadius: "999px",
  background: "rgba(37, 99, 235, 0.2)",
  color: "#bfdbfe",
  border: "1px solid rgba(147, 197, 253, 0.4)",
  fontSize: "11px",
};

const shuffleOff = {
  padding: "3px 7px",
  borderRadius: "999px",
  background: "rgba(100, 116, 139, 0.18)",
  color: "#cbd5e1",
  border: "1px solid rgba(148, 163, 184, 0.28)",
  fontSize: "11px",
};
