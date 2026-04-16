export default function TextAnswerInput({
  value,
  onChange,
  onSubmit,
  disabled,
  feedback,
  result,
}) {
  return (
    <div style={wrapper}>
      <label style={label} htmlFor="typed-answer">
        Type the answer
      </label>

      <div style={inputRow}>
        <input
          id="typed-answer"
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !disabled) {
              event.preventDefault();
              onSubmit();
            }
          }}
          disabled={disabled}
          placeholder="Type one of the choices"
          autoComplete="off"
          spellCheck={false}
          style={{
            ...input,
            ...(feedback ? inputWarning : {}),
            ...(result === "Correct!" ? inputCorrect : {}),
            ...(result === "Wrong" ? inputWrong : {}),
          }}
        />
      </div>

      <div style={helperRow}>
        <span style={helperText}>
          Match one of the listed choices to submit your answer.
        </span>
        {feedback ? <span style={feedbackText}>{feedback}</span> : null}
      </div>

    </div>
  );
}

const wrapper = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const label = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#cbd5e1",
};

const inputRow = {
  display: "flex",
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "16px",
  outline: "none",
};

const inputWarning = {
  borderColor: "#f59e0b",
};

const inputCorrect = {
  borderColor: "#22c55e",
};

const inputWrong = {
  borderColor: "#ef4444",
};

const helperRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  minHeight: "20px",
};

const helperText = {
  fontSize: "12px",
  color: "#94a3b8",
};

const feedbackText = {
  fontSize: "12px",
  color: "#fbbf24",
  fontWeight: 600,
};
