export default function CategorySelector({
  categories,
  allQuestions,
  onSelect,
  onBack,
}) {
  return (
    <div style={center}>
      <div style={card}>

        {/* ヘッダー */}
        <div style={header}>
          <button onClick={onBack} style={backBtn}>
            ← Back
          </button>
          <h2 style={{ margin: 0 }}>Select Category</h2>
        </div>

        {/* All */}
        <button onClick={() => onSelect(null)} style={btn}>
          All ({allQuestions.length})
        </button>

        {/* カテゴリ */}
        {categories.map((cat, i) => {
          const count = allQuestions.filter(q => q.category === cat).length;

          return (
            <button key={i} onClick={() => onSelect(cat)} style={btn}>
              {cat} ({count})
            </button>
          );
        })}

      </div>
    </div>
  );
}

/* UI */
const center = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const card = {
  width: "320px",
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
};

const header = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "10px",
};

const backBtn = {
  border: "none",
  background: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#334155",
  color: "white",
  cursor: "pointer",
};
