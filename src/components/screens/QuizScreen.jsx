import { useEffect, useMemo, useRef, useState } from "react";
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

function shuffleQuestionChoices(question) {
  const entries = question.choices.map((choice, index) => ({
    choice,
    isAnswer: index === question.answer,
  }));

  for (let i = entries.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }

  return {
    ...question,
    choices: entries.map((entry) => entry.choice),
    answer: entries.findIndex((entry) => entry.isAnswer),
  };
}

export default function QuizScreen() {
  const [step, setStep] = useState("file");
  const [importedFiles, setImportedFiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [shuffleChoices, setShuffleChoices] = useState(false);
  const [quizSession, setQuizSession] = useState(null);
  const [loadReport, setLoadReport] = useState({
    loadedFiles: 0,
    validQuestions: 0,
    invalidQuestions: 0,
    errors: [],
  });
  const importCounterRef = useRef(0);

  const allQuestions = useMemo(
    () => importedFiles.flatMap((file) => file.questions),
    [importedFiles],
  );
  const preview = useMemo(() => allQuestions.slice(0, 5), [allQuestions]);
  const categories = useMemo(
    () => [...new Set(allQuestions.map((q) => q.category))],
    [allQuestions],
  );

  useEffect(() => {
    setSelectedCategories((prev) =>
      prev.filter((category) => categories.includes(category)),
    );
  }, [categories]);

  useEffect(() => {
    if (allQuestions.length === 0) {
      setStep("file");
    }
  }, [allQuestions.length]);

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
    const importedEntries = [];

    for (const file of nextFiles) {
      try {
        const text = await readFileText(file);
        const json = JSON.parse(text);

        if (!Array.isArray(json)) {
          report.errors.push(`${file.name}: root JSON must be an array.`);
          continue;
        }

        const fileQuestions = [];

        json.forEach((question, index) => {
          const errors = validateQuestion(question, index, file.name);

          if (errors.length > 0) {
            report.invalidQuestions += 1;
            report.errors.push(...errors);
            return;
          }

          report.validQuestions += 1;
          fileQuestions.push(normalizeQuestion(question));
        });

        if (fileQuestions.length > 0) {
          importCounterRef.current += 1;
          importedEntries.push({
            id: `${file.name}-${file.lastModified}-${importCounterRef.current}`,
            name: file.name,
            questions: fileQuestions,
          });
        }
      } catch {
        report.errors.push(`${file.name}: failed to parse JSON.`);
      }
    }

    setImportedFiles((prev) => [...prev, ...importedEntries]);
    setLoadReport(report);
  };

  const handleRemoveFile = (fileId) => {
    setImportedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const handleStartQuiz = () => {
    const sessionQuestions = shuffleChoices
      ? questions.map((question) => shuffleQuestionChoices(question))
      : questions;

    setQuizSession({
      id: `${Date.now()}-${sessionQuestions.length}`,
      questions: sessionQuestions,
      shuffleChoices,
    });
    setStep("quiz");
  };

  const questions = useMemo(
    () => (selectedCategories.length > 0
      ? allQuestions.filter((q) => selectedCategories.includes(q.category))
      : allQuestions),
    [allQuestions, selectedCategories],
  );

  if (step === "file") {
    return (
      <FileSelector
        onLoad={handleFile}
        count={allQuestions.length}
        preview={preview}
        loadReport={loadReport}
        importedFiles={importedFiles}
        onRemoveFile={handleRemoveFile}
        onNext={() => setStep("category")}
      />
    );
  }

  if (step === "category") {
    return (
      <CategorySelector
        categories={categories}
        allQuestions={allQuestions}
        selectedCategories={selectedCategories}
        shuffleChoices={shuffleChoices}
        onChange={setSelectedCategories}
        onShuffleChange={setShuffleChoices}
        onStart={handleStartQuiz}
        onBack={() => setStep("file")}
      />
    );
  }

  return (
    <QuizPlayer
      key={quizSession?.id ?? "quiz"}
      questions={quizSession?.questions ?? questions}
      shuffleChoices={quizSession?.shuffleChoices ?? shuffleChoices}
      onFinish={() => setStep("file")}
      onBack={() => setStep("category")}
    />
  );
}
