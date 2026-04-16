import { useEffect, useRef, useState } from "react";

export default function FileSelector({
  onLoad,
  count,
  onNext,
  preview,
  loadReport,
  importedFiles,
  onRemoveFile,
}) {
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [activeFileId, setActiveFileId] = useState(null);
  const [hoveredCloseId, setHoveredCloseId] = useState(null);
  const fileInputRef = useRef(null);

  const processFiles = (files) => {
    onLoad(files);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template);
      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const hasLoadAttempt = loadReport.loadedFiles > 0;
  const visibleErrors = loadReport.errors.slice(0, 5);
  const activeFile =
    importedFiles.find((file) => file.id === activeFileId) ?? importedFiles[0];
  const visiblePreview = activeFile ? activeFile.questions.slice(0, 5) : preview;
  const showInlineDropzone = importedFiles.length === 0;

  useEffect(() => {
    if (importedFiles.length === 0) {
      setActiveFileId(null);
      return;
    }

    setActiveFileId((current) => {
      if (current && importedFiles.some((file) => file.id === current)) {
        return current;
      }

      return importedFiles[importedFiles.length - 1].id;
    });
  }, [importedFiles]);

  return (
    <div style={center}>
      <div style={card}>
        <div style={left}>
          <div style={header}>
            <h2 style={{ margin: 0 }}>Select JSON</h2>
          </div>

          <div style={divider} />

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".json"
            hidden
            onChange={(e) => processFiles(Array.from(e.target.files ?? []))}
          />

          {!showInlineDropzone && (
            <button type="button" onClick={openFilePicker} style={compactUploadBtn}>
              + Add more JSON files
            </button>
          )}

          <div style={statusBox}>
            <div style={statusMetric}>
              <span style={statusLabel}>Valid questions</span>
              <strong>{count}</strong>
            </div>

            {hasLoadAttempt && (
              <p style={statusSubtext}>
                Last import: {loadReport.validQuestions} valid,{" "}
                {loadReport.invalidQuestions} invalid from {loadReport.loadedFiles} file
                {loadReport.loadedFiles === 1 ? "" : "s"}
              </p>
            )}

            {count === 0 && (
              <p style={warningText}>
                Add at least one valid question set before starting the quiz.
              </p>
            )}
          </div>

          {importedFiles.length > 0 && (
            <div style={fileListBox}>
              <div style={fileListHeader}>
                <strong>Imported files</strong>
                <span style={fileCount}>{importedFiles.length}</span>
              </div>

              <div style={fileTabs}>
                {importedFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => setActiveFileId(file.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setActiveFileId(file.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    style={{
                      ...fileTab,
                      ...(file.id === activeFile?.id ? activeFileTab : null),
                    }}
                  >
                    <div style={fileInfo}>
                      <div style={fileName}>{file.name}</div>
                      <div style={fileMeta}>
                        {file.questions.length} question
                        {file.questions.length === 1 ? "" : "s"}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`${file.name} を削除`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onRemoveFile(file.id);
                      }}
                      onMouseEnter={() => setHoveredCloseId(file.id)}
                      onMouseLeave={() =>
                        setHoveredCloseId((current) =>
                          current === file.id ? null : current,
                        )
                      }
                      onFocus={() => setHoveredCloseId(file.id)}
                      onBlur={() =>
                        setHoveredCloseId((current) =>
                          current === file.id ? null : current,
                        )
                      }
                      style={{
                        ...tabCloseBtn,
                        ...(hoveredCloseId === file.id ? tabCloseBtnHover : null),
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {visibleErrors.length > 0 && (
            <div style={errorBox}>
              <strong>Import issues</strong>
              <ul style={errorList}>
                {visibleErrors.map((error, index) => (
                  <li key={`${error}-${index}`}>{error}</li>
                ))}
              </ul>
              {loadReport.errors.length > visibleErrors.length && (
                <p style={moreText}>
                  +{loadReport.errors.length - visibleErrors.length} more issue
                  {loadReport.errors.length - visibleErrors.length === 1 ? "" : "s"}
                </p>
              )}
            </div>
          )}

          <div style={previewBox}>
            {activeFile && (
              <div style={previewHeader}>
                <div style={previewTitle}>{activeFile.name}</div>
                <div style={previewSummary}>
                  {activeFile.questions.length} question
                  {activeFile.questions.length === 1 ? "" : "s"} loaded
                </div>
              </div>
            )}

            {visiblePreview.map((q, i) => (
              <div key={i} style={previewCard}>
                <div style={qTitle}>{q.question}</div>
                <div style={qCat}>{q.category}</div>
              </div>
            ))}

            {visiblePreview.length === 0 && showInlineDropzone && (
              <label
                style={{
                  ...inlineDropzone,
                  border: dragging
                    ? "2px solid #818cf8"
                    : "2px dashed #6366f1",
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  processFiles(Array.from(e.dataTransfer.files));
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
              >
                <div style={inlineDropTitle}>
                  {dragging ? "Drop JSON here" : "Click or Drop JSON"}
                </div>
                <div style={inlineDropText}>
                  Import your quiz files here. Valid question previews will appear in
                  this area after import.
                </div>
                <button type="button" onClick={openFilePicker} style={inlineDropBtn}>
                  Select JSON files
                </button>
              </label>
            )}

            {visiblePreview.length === 0 && !showInlineDropzone && (
              <div style={emptyPreview}>
                Valid question previews will appear here after import.
              </div>
            )}
          </div>

          <button
            onClick={onNext}
            disabled={count === 0}
            style={{
              ...mainBtn,
              opacity: count === 0 ? 0.4 : 1,
            }}
          >
            Start ({count})
          </button>
        </div>

        <div style={right}>
          <div style={header}>
            <h3 style={{ margin: 0 }}>Guide</h3>
          </div>

          <div style={divider} />

          <div style={guideBox}>
            <p>1. Upload one or more JSON files.</p>
            <p>2. We validate each question before adding it.</p>
            <p>3. Start after at least one valid question is loaded.</p>
            <p>Copy this prompt into your AI to generate quiz data.</p>
          </div>

          <div style={divider} />

          <h4>Prompt</h4>

          <div style={codeBox}>
            <pre style={code}>
{`Create multiple-choice quiz questions in JSON format.

[
  {
    "question": "",
    "choices": ["", "", "", ""],
    "answer": 0,
    "category": "",
    "explanation": {
      "correct": "",
      "incorrect": ["", "", ""]
    }
  }
]
`}
            </pre>
          </div>

          <button onClick={handleCopy} style={copyBtn}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

const center = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  padding: "24px",
  boxSizing: "border-box",
};

const card = {
  width: "min(1180px, 100%)",
  height: "min(760px, calc(100vh - 48px))",
  display: "flex",
  background: "#1e293b",
  borderRadius: "20px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  overflow: "hidden",
};

const left = {
  flex: "1.15 1 0",
  minWidth: 0,
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #334155",
};

const right = {
  flex: "0.85 1 0",
  minWidth: 0,
  padding: "25px",
  display: "flex",
  flexDirection: "column",
};

const header = {
  marginBottom: "10px",
};

const divider = {
  height: "1px",
  background: "#334155",
  margin: "10px 0",
};

const statusBox = {
  marginTop: "12px",
  textAlign: "left",
  fontSize: "14px",
  lineHeight: "1.6",
  color: "#cbd5e1",
};

const statusMetric = {
  display: "flex",
  alignItems: "baseline",
  gap: "8px",
};

const statusLabel = {
  color: "#cbd5e1",
};

const statusSubtext = {
  marginTop: "2px",
};

const warningText = {
  color: "#fbbf24",
  marginTop: "4px",
};

const compactUploadBtn = {
  marginTop: "4px",
  minHeight: "44px",
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px dashed #6366f1",
  background: "rgba(99,102,241,0.08)",
  color: "#e2e8f0",
  cursor: "pointer",
  textAlign: "center",
};

const errorBox = {
  marginTop: "12px",
  background: "rgba(239,68,68,0.12)",
  border: "1px solid rgba(248,113,113,0.45)",
  borderRadius: "10px",
  padding: "12px",
  textAlign: "left",
};

const errorList = {
  margin: "8px 0 0",
  paddingLeft: "18px",
  color: "#fecaca",
};

const moreText = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#fecaca",
};

const fileListBox = {
  marginTop: "12px",
  textAlign: "left",
};

const fileListHeader = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

const fileCount = {
  minWidth: "28px",
  height: "28px",
  borderRadius: "999px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: "bold",
  color: "#cbd5e1",
  background: "rgba(51,65,85,0.8)",
};

const fileTabs = {
  marginTop: "8px",
  display: "flex",
  gap: "6px",
  overflowX: "auto",
  paddingBottom: "6px",
};

const fileTab = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "10px",
  minWidth: "160px",
  maxWidth: "220px",
  padding: "7px 9px",
  background: "rgba(15,23,42,0.72)",
  border: "1px solid #334155",
  borderRadius: "8px",
  color: "inherit",
  cursor: "pointer",
  textAlign: "left",
  flexShrink: 0,
};

const activeFileTab = {
  background: "rgba(30,41,59,0.98)",
  borderColor: "#6366f1",
  boxShadow: "inset 0 0 0 1px rgba(129,140,248,0.35)",
};

const fileInfo = {
  minWidth: 0,
  flex: 1,
};

const fileName = {
  fontWeight: "bold",
  color: "#e2e8f0",
  fontSize: "13px",
  lineHeight: "1.3",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const fileMeta = {
  marginTop: "2px",
  fontSize: "11px",
  color: "#94a3b8",
};

const tabCloseBtn = {
  flexShrink: 0,
  width: "24px",
  height: "24px",
  borderRadius: "6px",
  border: "none",
  background: "transparent",
  color: "#fca5a5",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
  lineHeight: 1,
  transition: "background 0.18s ease, color 0.18s ease, transform 0.18s ease",
};

const tabCloseBtnHover = {
  background: "rgba(239,68,68,0.2)",
  color: "#fee2e2",
  transform: "scale(1.05)",
};

const previewBox = {
  marginTop: "12px",
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
};

const previewHeader = {
  marginBottom: "8px",
  textAlign: "left",
};

const previewTitle = {
  fontWeight: "bold",
  color: "#e2e8f0",
};

const previewSummary = {
  marginTop: "2px",
  fontSize: "12px",
  color: "#94a3b8",
};

const emptyPreview = {
  padding: "14px",
  background: "#020617",
  borderRadius: "8px",
  color: "#94a3b8",
};

const inlineDropzone = {
  minHeight: "100%",
  padding: "28px",
  background: "rgba(2,6,23,0.72)",
  borderRadius: "12px",
  color: "#cbd5e1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  cursor: "pointer",
  boxSizing: "border-box",
};

const inlineDropTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#f8fafc",
};

const inlineDropText = {
  marginTop: "10px",
  maxWidth: "420px",
  lineHeight: 1.6,
};

const inlineDropBtn = {
  marginTop: "18px",
  padding: "10px 16px",
  borderRadius: "999px",
  border: "1px solid rgba(129,140,248,0.6)",
  background: "rgba(99,102,241,0.18)",
  color: "white",
  cursor: "pointer",
};

const previewCard = {
  padding: "9px 10px",
  marginBottom: "8px",
  background: "#020617",
  borderRadius: "8px",
};

const qTitle = {
  fontWeight: "bold",
};

const qCat = {
  fontSize: "12px",
  opacity: 0.6,
};

const mainBtn = {
  marginTop: "10px",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(90deg,#6366f1,#818cf8)",
  color: "white",
};

const guideBox = {
  textAlign: "left",
  opacity: 0.8,
};

const codeBox = {
  flex: 1,
  minHeight: 0,
  background: "#020617",
  padding: "10px",
  borderRadius: "10px",
  overflowY: "auto",
};

const code = {
  fontFamily: "monospace",
  textAlign: "left",
};

const copyBtn = {
  marginTop: "10px",
  padding: "10px",
  background: "#22c55e",
  border: "none",
  borderRadius: "8px",
  color: "white",
};

const template = `Create multiple-choice quiz questions in JSON format.

[
  {
    "question": "",
    "choices": ["", "", "", ""],
    "answer": 0,
    "category": "",
    "explanation": {
      "correct": "",
      "incorrect": ["", "", ""]
    }
  }
]
`;
