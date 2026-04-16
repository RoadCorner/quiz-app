import { useState } from "react";
import FileSelector from "../selectors/FileSelector";
import CategorySelector from "../selectors/CategorySelector";
import QuizPlayer from "../quiz/QuizPlayer";

export default function QuizScreen() {
  const [step, setStep] = useState("file");
  const [allQuestions, setAllQuestions] = useState([]);
  const [category, setCategory] = useState(null);

  const handleFile = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target.result);
          if (Array.isArray(json)) {
            setAllQuestions((prev) => [...prev, ...json]);
          }
        } catch {
          console.error("JSON error");
        }
      };

      reader.readAsText(file);
    });
  };

  const categories = [...new Set(allQuestions.map(q => q.category))];

  const questions = category
    ? allQuestions.filter(q => q.category === category)
    : allQuestions;

  /* ================= 画面分岐 ================= */

  if (step === "file") {
    return (
      <FileSelector
        onLoad={handleFile}
        count={allQuestions.length}
        onNext={() => setStep("category")}
      />
    );
  }

  if (step === "category") {
    return (
      <CategorySelector
        categories={categories}
        allQuestions={allQuestions}
        onSelect={(cat) => {
          setCategory(cat);
          setStep("quiz");
        }}
        onBack={() => setStep("file")} // ← 追加
      />
    );
  }

  return (
    <QuizPlayer
      questions={questions}
      onFinish={() => setStep("file")}
      onBack={() => setStep("category")}
    />
  );
}