export default function CategorySelector({
  categories,
  allQuestions,
  selectedCategories,
  shuffleChoices,
  shuffleQuestionsOrder,
  answerMode,
  showTextInputChoices,
  onChange,
  onShuffleChange,
  onShuffleQuestionsOrderChange,
  onAnswerModeChange,
  onShowTextInputChoicesChange,
  onStart,
  onBack,
}) {
  const isAllSelected = selectedCategories.length === 0;
  const categoryCounts = new Map();
  const visibleCategories = ["All Categories", ...categories];

  allQuestions.forEach((question) => {
    categoryCounts.set(
      question.category,
      (categoryCounts.get(question.category) ?? 0) + 1,
    );
  });

  const toggleCategory = (category) => {
    if (category === "All Categories") {
      onChange([]);
      return;
    }

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
          <div style={settingBlock}>
            <div style={settingCopy}>
              <div style={settingLabel}>Answer Mode</div>
              <div style={settingHint}>Multiple choice is the default mode.</div>
            </div>

            <div
              style={{
                ...modeGroup,
                ...(answerMode === "text-input" ? modeGroupActive : {}),
              }}
            >
              <button
                type="button"
                onClick={() => onAnswerModeChange("multiple-choice")}
                aria-pressed={answerMode === "multiple-choice"}
                style={{
                  ...groupBtn,
                  ...(answerMode === "multiple-choice" ? groupBtnActive : {}),
                }}
              >
                Multiple Choice
              </button>
              <button
                type="button"
                onClick={() => onAnswerModeChange("text-input")}
                aria-pressed={answerMode === "text-input"}
                style={{
                  ...groupBtn,
                  ...groupSubBtn,
                  ...(answerMode === "text-input" ? groupBtnActive : {}),
                }}
              >
                Text Input
              </button>
              <button
                type="button"
                onClick={() => onShowTextInputChoicesChange(!showTextInputChoices)}
                aria-pressed={showTextInputChoices}
                style={{
                  ...groupBtn,
                  ...groupSubBtn,
                  ...(answerMode !== "text-input" ? disabledBtn : {}),
                  ...(showTextInputChoices && answerMode === "text-input"
                    ? groupBtnActive
                    : {}),
                }}
                disabled={answerMode !== "text-input"}
              >
                {showTextInputChoices ? "Choices Visible" : "Choices Hidden"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (answerMode !== "text-input") {
                onShuffleChange(!shuffleChoices);
              }
            }}
            aria-pressed={shuffleChoices}
            style={{
              ...secondaryBtn,
              ...shuffleBtn,
              ...(answerMode === "text-input" ? disabledBtn : {}),
              ...(shuffleChoices ? activeBtn : {}),
            }}
            disabled={answerMode === "text-input"}
          >
            Shuffle Choices
          </button>

          <button
            type="button"
            onClick={() => onShuffleQuestionsOrderChange(!shuffleQuestionsOrder)}
            aria-pressed={shuffleQuestionsOrder}
            style={{
              ...secondaryBtn,
              ...shuffleBtn,
              ...(shuffleQuestionsOrder ? activeBtn : {}),
            }}
          >
            Shuffle Order
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
          {visibleCategories.map((cat) => {
            const isAllCategory = cat === "All Categories";
            const count = isAllCategory
              ? allQuestions.length
              : (categoryCounts.get(cat) ?? 0);
            const isSelected = isAllCategory
              ? isAllSelected
              : selectedCategories.includes(cat);

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
  alignItems: "flex-end",
  gap: "8px",
  marginBottom: "10px",
};

const settingBlock = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const settingCopy = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const settingLabel = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#e2e8f0",
  letterSpacing: "0.04em",
};

const settingHint = {
  fontSize: "12px",
  color: "#94a3b8",
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

const modeGroup = {
  display: "flex",
  alignItems: "stretch",
  borderRadius: "12px",
  border: "1px solid #475569",
  background: "#0f172a",
  overflow: "hidden",
};

const modeGroupActive = {
  borderColor: "#93c5fd",
  boxShadow: "0 0 0 1px rgba(147, 197, 253, 0.15)",
};

const groupBtn = {
  width: "auto",
  minWidth: "150px",
  padding: "9px 12px",
  border: "none",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: 600,
};

const groupSubBtn = {
  minWidth: "170px",
  borderLeft: "1px solid rgba(100, 116, 139, 1)",
};

const groupBtnActive = {
  background: "#2563eb",
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

const disabledBtn = {
  opacity: 0.45,
  cursor: "not-allowed",
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
