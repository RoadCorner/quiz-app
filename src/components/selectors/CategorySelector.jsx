export default function CategorySelector({
  categories,
  allQuestions,
  selectedCategories,
  onChange,
  onStart,
  onBack,
}) {
  const isAllSelected = selectedCategories.length === 0;

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
          <h2 style={{ margin: 0 }}>Select Category</h2>
        </div>

        <p style={description}>
          Select one or more categories. If none are selected, all categories will be included.
        </p>

        <div style={actions}>
          <button onClick={() => onChange(categories)} style={secondaryBtn}>
            Select Every Category
          </button>
        </div>

        <button
          onClick={() => onChange([])}
          style={{
            ...btn,
            ...(isAllSelected ? activeBtn : {}),
          }}
        >
          All Categories ({allQuestions.length})
        </button>

        <div style={status}>
          {isAllSelected
            ? "Current selection: all categories"
            : `Current selection: ${selectedCategories.length} categories`}
        </div>

        {categories.map((cat) => {
          const count = allQuestions.filter((q) => q.category === cat).length;
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
              {cat} ({count})
            </button>
          );
        })}

        <button onClick={onStart} style={startBtn}>
          Start Quiz
        </button>
      </div>
    </div>
  );
}

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

const description = {
  margin: "0 0 14px",
  color: "#cbd5e1",
  lineHeight: 1.5,
  fontSize: "14px",
};

const actions = {
  display: "block",
  marginBottom: "12px",
};

const backBtn = {
  border: "none",
  background: "transparent",
  color: "#94a3b8",
  cursor: "pointer",
};

const secondaryBtn = {
  width: "100%",
  padding: "10px 8px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
};

const status = {
  marginTop: "10px",
  color: "#94a3b8",
  fontSize: "13px",
};

const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "8px",
  border: "1px solid transparent",
  background: "#334155",
  color: "white",
  cursor: "pointer",
  textAlign: "left",
};

const activeBtn = {
  background: "#2563eb",
  borderColor: "#93c5fd",
};

const startBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "16px",
  borderRadius: "8px",
  border: "none",
  background: "#22c55e",
  color: "#06210f",
  cursor: "pointer",
  fontWeight: 700,
};
