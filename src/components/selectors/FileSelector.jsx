import { useState } from "react";

export default function FileSelector({ onLoad, count, onNext }) {
  const [preview, setPreview] = useState([]);
  const [copied, setCopied] = useState(false);
  const [dragging, setDragging] = useState(false);

  const processFiles = (files) => {
    let loaded = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);

          if (Array.isArray(json)) {
            loaded = [...loaded, ...json];
            setPreview(loaded.slice(0, 5));
          }
        } catch {
          console.error("JSON error");
        }
      };

      reader.readAsText(file);
    });

    onLoad({ target: { files } });
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


  return (
    <div style={center}>
      <div style={card}>

        {/* ===== 左 ===== */}
        <div style={left}>

          <div style={header}>
            <h2 style={{ margin: 0 }}>Select JSON</h2>
          </div>

          <div style={divider} />

          {/* ドロップ */}
          <label
            style={{
              ...dropArea,
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
            <input
              type="file"
              multiple
              accept=".json"
              hidden
              onChange={(e) =>
                processFiles(Array.from(e.target.files))
              }
            />
            <p>
              {dragging ? "Drop here" : "Click or Drop JSON"}
            </p>
          </label>

          {/* Preview */}
          <div style={previewBox}>
            {preview.map((q, i) => (
              <div key={i} style={previewCard}>
                <div style={qTitle}>{q.question}</div>
                <div style={qCat}>{q.category}</div>
              </div>
            ))}
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

        {/* ===== 右 ===== */}
        <div style={right}>

          <div style={header}>
            <h3 style={{ margin: 0 }}>Guide</h3>
          </div>

          <div style={divider} />

          <div style={guideBox}>
            <p>1.Upload JSON file</p>
            <p>2.System make quiz automaticaly</p>
            <p>3.Start Quiz</p>
            <p>Copy&Paste this prompt to your AI to create quiz</p>
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

/* ===== UI（Quizと統一） ===== */

const center = {
  minHeight: "100vh",
  background: "#020617",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const card = {
  width: "1100px",
  height: "600px",
  display: "flex",
  background: "#1e293b",
  borderRadius: "20px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  overflow: "hidden",
};

const left = {
  flex: 1,
  padding: "25px",
  display: "flex",
  flexDirection: "column",
  borderRight: "1px solid #334155",
};

const right = {
  flex: 1,
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

const dropArea = {
  padding: "40px",
  textAlign: "center",
  borderRadius: "12px",
  cursor: "pointer",
};

const previewBox = {
  marginTop: "15px",
  flex: 1,
  overflowY: "auto",
};

const previewCard = {
  padding: "10px",
  marginBottom: "10px",
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