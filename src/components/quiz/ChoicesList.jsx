export default function ChoicesList({
  choices,
  selected,
  result,
  answer,
  onSelect,
  interactive = true,
}) {
  return (
    <div>
      {choices.map((c, i) => (
        <button
          key={i}
          type="button"
          onClick={() => {
            if (interactive) {
              onSelect(i);
            }
          }}
          disabled={!interactive}
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid #334155",
            color: "white",
            textAlign: "left",
            cursor: interactive ? "pointer" : "default",
            opacity: interactive ? 1 : 0.95,
            background:
              !result
                ? selected === i ? "#334155" : "#1e293b"
                : i === answer
                ? "#22c55e"
                : i === selected
                ? "#ef4444"
                : "#1e293b",
          }}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
