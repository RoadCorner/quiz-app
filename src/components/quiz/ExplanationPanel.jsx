export default function ExplanationPanel({ result, bonus, q }) {
  if (!result) return null;

  return (
    <div style={box}>
      <h3>{result}</h3>

      {bonus > 0 && (
        <p style={{ color: "#facc15" }}>
          +{bonus} Speed Bonus
        </p>
      )}
          
      <p>Correct: {q.choices[q.answer]}</p>

      {q.explanation && (
        <>
          <div style={correct}>
            <strong>✔ Why Correct</strong>
            <p>{q.explanation.correct}</p>
          </div>

          <div style={wrong}>
            <strong>✖ Why Others Are Wrong</strong>
            <ul>
              {q.explanation.incorrect?.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

const box = {
  flex: 1,
  background: "#020617",
  borderRadius: "12px",
  padding: "15px",
  overflowY: "auto",
};

const correct = {
  background: "rgba(34,197,94,0.1)",
  border: "1px solid #22c55e",
  borderRadius: "8px",
  padding: "10px",
  marginTop: "10px",
};

const wrong = {
  background: "rgba(239,68,68,0.1)",
  border: "1px solid #ef4444",
  borderRadius: "8px",
  padding: "10px",
  marginTop: "10px",
};