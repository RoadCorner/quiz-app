export default function CategorySelector({
  categories,
  allQuestions,
  selectedCategories,
  shuffleChoices,
  onChange,
  onShuffleChange,
  onStart,
  onBack,
}) {
  const isAllSelected = selectedCategories.length === 0;
  const categoryCounts = new Map();

  allQuestions.forEach((question) => {
    categoryCounts.set(
      question.category,
      (categoryCounts.get(question.category) ?? 0) + 1,
    );
  });

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      onChange(selectedCategories.filter((item) => item !== category));
      return;
    }

    onChange([...selectedCategories, category]);
  };

  return (
    <div style={center}>
      <div style={card}>
        <div style={header}>
          <button onClick={onBack} style={backBtn}>
            Back
          </button>
          <div>
            <p style={eyebrow}>Quiz Setup</p>
            <h2 style={title}>Select Category</h2>
          </div>
          <div style={headerMeta}>
            {categories.length} groups / {allQuestions.length} questions
          </div>
        </div>

        <p style={description}>
          Choose categories to narrow the quiz. Leave everything off to include all.
        </p>

        <div style={actions}>
          <button
            onClick={() => onChange([])}
            style={{
              ...secondaryBtn,
              ...(isAllSelected ? activeBtn : {}),
            }}
          >
            All Categories ({allQuestions.length})
          </button>
          <button
            type="button"
            onClick={() => onShuffleChange(!shuffleChoices)}
            aria-pressed={shuffleChoices}
            style={{
              ...secondaryBtn,
              ...shuffleBtn,
              ...(shuffleChoices ? activeBtn : {}),
            }}
          >
            Shuffle Choices
          </button>
        </div>

        <div style={statusRow}>
          <div style={status}>
            {isAllSelected
              ? "Current selection: all categories"
              : `Current selection: ${selectedCategories.length} categories`}
          </div>
          <div style={categoryMeta}>{categories.length} category groups</div>
        </div>

        <div style={list}>
          {categories.map((cat) => {
            const count = categoryCounts.get(cat) ?? 0;
            const isSelected = selectedCategories.includes(cat);

            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                style={{
                  ...btn,
                  ...(isSelected ? activeBtn : {}),
                }}
              >
                <span style={categoryName}>{cat}</span>
                <span style={countBadge}>{count} questions</span>
              </button>
            );
          })}
        </div>

        <button onClick={onStart} style={startBtn}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

const center = {
  minHeight: "100vh",
  background: "#020617",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "24px",
  boxSizing: "border-box",
};

const card = {
  width: "1180px",
  height: "760px",
  maxWidth: "calc(100vw - 48px)",
  maxHeight: "calc(100vh - 48px)",
  background: "#1e293b",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

const header = {
  display: "flex",
  alignItems: "flex-start",
  gap: "14px",
  marginBottom: "8px",
  flexWrap: "wrap",
};

const eyebrow = {
  margin: "0 0 4px",
  color: "#7dd3fc",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const title = {
  margin: 0,
  fontSize: "clamp(24px, 3vw, 32px)",
  lineHeight: 1.1,
};

const headerMeta = {
  marginLeft: "auto",
  color: "#94a3b8",
  fontSize: "13px",
};

const description = {
  margin: "0 0 14px",
  color: "#cbd5e1",
  lineHeight: 1.4,
  fontSize: "14px",
  maxWidth: "720px",
};

const actions = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "stretch",
  gap: "8px",
  marginBottom: "10px",
};

const backBtn = {
  border: "1px solid rgba(125, 211, 252, 0.45)",
  background: "rgba(14, 165, 233, 0.18)",
  color: "#e0f2fe",
  cursor: "pointer",
  padding: "8px 14px",
  fontSize: "14px",
  fontWeight: 700,
  borderRadius: "999px",
  marginTop: "-4px",
  boxShadow: "0 10px 24px rgba(14, 165, 233, 0.14)",
};

const secondaryBtn = {
  width: "auto",
  minWidth: "180px",
  maxWidth: "240px",
  padding: "9px 12px",
  borderRadius: "10px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
};

const shuffleBtn = {
  minWidth: "150px",
  maxWidth: "200px",
};

const status = {
  color: "#94a3b8",
  fontSize: "13px",
};

const statusRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "10px",
  flexWrap: "wrap",
};

const categoryMeta = {
  color: "#64748b",
  fontSize: "12px",
};

const list = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "10px",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  paddingRight: "4px",
  alignContent: "start",
};

const btn = {
  width: "100%",
  padding: "12px 14px",
  marginTop: 0,
  borderRadius: "12px",
  border: "1px solid transparent",
  background: "#334155",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  minHeight: "58px",
};

const categoryName = {
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: 1.2,
};

const countBadge = {
  flexShrink: 0,
  padding: "4px 8px",
  borderRadius: "999px",
  background: "rgba(148, 163, 184, 0.16)",
  color: "#cbd5e1",
  fontSize: "11px",
};

const activeBtn = {
  background: "#2563eb",
  borderColor: "#93c5fd",
};

const startBtn = {
  width: "100%",
  padding: "13px",
  marginTop: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#22c55e",
  color: "#06210f",
  cursor: "pointer",
  fontWeight: 700,
};
