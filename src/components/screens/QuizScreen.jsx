import { useState } from "react";
import FileSelector from "../selectors/FileSelector";
import CategorySelector from "../selectors/CategorySelector";
import QuizPlayer from "../quiz/QuizPlayer";

function readFileText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target?.result ?? "");
    reader.onerror = () => reject(new Error("Failed to read file."));

    reader.readAsText(file);
  });
}

function validateQuestion(question, index, fileName) {
  const label = `${fileName} question ${index + 1}`;

  if (!question || typeof question !== "object" || Array.isArray(question)) {
    return [`${label}: each item must be an object.`];
  }

  const errors = [];

  if (typeof question.question !== "string" || !question.question.trim()) {
    errors.push(`${label}: question is required.`);
  }

  if (!Array.isArray(question.choices) || question.choices.length < 2) {
    errors.push(`${label}: choices must contain at least 2 items.`);
  } else if (
    question.choices.some(
      (choice) => typeof choice !== "string" || !choice.trim(),
    )
  ) {
    errors.push(`${label}: each choice must be a non-empty string.`);
  }

  if (
    !Number.isInteger(question.answer) ||
    !Array.isArray(question.choices) ||
    question.answer < 0 ||
    question.answer >= question.choices.length
  ) {
    errors.push(`${label}: answer must be a valid choice index.`);
  }

  if (typeof question.category !== "string" || !question.category.trim()) {
    errors.push(`${label}: category is required.`);
  }

  if (question.explanation != null) {
    const explanation = question.explanation;

    if (!explanation || typeof explanation !== "object" || Array.isArray(explanation)) {
      errors.push(`${label}: explanation must be an object when provided.`);
    } else {
      if (
        typeof explanation.correct !== "string" ||
        !explanation.correct.trim()
      ) {
        errors.push(`${label}: explanation.correct must be a non-empty string.`);
      }

      if (
        !Array.isArray(explanation.incorrect) ||
        explanation.incorrect.some(
          (entry) => typeof entry !== "string" || !entry.trim(),
        )
      ) {
        errors.push(
          `${label}: explanation.incorrect must be an array of non-empty strings.`,
        );
      }
    }
  }

  return errors;
}

function normalizeQuestion(question) {
  return {
    ...question,
    question: question.question.trim(),
    category: question.category.trim(),
    choices: question.choices.map((choice) => choice.trim()),
    explanation: question.explanation
      ? {
          correct: question.explanation.correct.trim(),
          incorrect: question.explanation.incorrect.map((entry) => entry.trim()),
        }
      : undefined,
  };
}

export default function QuizScreen() {
  const [step, setStep] = useState("file");
  const [allQuestions, setAllQuestions] = useState([]);
  const [category, setCategory] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loadReport, setLoadReport] = useState({
    loadedFiles: 0,
    validQuestions: 0,
    invalidQuestions: 0,
    errors: [],
  });

  const handleFile = async (files) => {
    const nextFiles = Array.from(files ?? []);

    if (nextFiles.length === 0) {
      return;
    }

    const report = {
      loadedFiles: nextFiles.length,
      validQuestions: 0,
      invalidQuestions: 0,
      errors: [],
    };
    const validQuestions = [];

    for (const file of nextFiles) {
      try {
        const text = await readFileText(file);
        const json = JSON.parse(text);

        if (!Array.isArray(json)) {
          report.errors.push(`${file.name}: root JSON must be an array.`);
          continue;
        }

        json.forEach((question, index) => {
          const errors = validateQuestion(question, index, file.name);

          if (errors.length > 0) {
            report.invalidQuestions += 1;
            report.errors.push(...errors);
            return;
          }

          report.validQuestions += 1;
          validQuestions.push(normalizeQuestion(question));
        });
      } catch {
        report.errors.push(`${file.name}: failed to parse JSON.`);
      }
    }

    setAllQuestions((prev) => [...prev, ...validQuestions]);
    setPreview(validQuestions.slice(0, 5));
    setLoadReport(report);
  };

  const categories = [...new Set(allQuestions.map((q) => q.category))];

  const questions = category
    ? allQuestions.filter((q) => q.category === category)
    : allQuestions;

  if (step === "file") {
    return (
      <FileSelector
        onLoad={handleFile}
        count={allQuestions.length}
        preview={preview}
        loadReport={loadReport}
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
        onBack={() => setStep("file")}
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
