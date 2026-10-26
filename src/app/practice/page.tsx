
"use client";

import { useEffect, useState } from "react";
import { questionBanks, availableSubjects } from "@/data";
import type { Question } from "@/data/types";

type PracticeQuestion = {
  id: string;
  subject: string;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
};

const LETTERS = ["A", "B", "C", "D"];
const ENGLISH = "Use of English";
const EXAM_DURATION = 30 * 60;

function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function convertQuestion(
  question: Question,
  subject: string
): PracticeQuestion {
  return {
    id: `${subject}:${question.id}`,
    subject,
    topic: question.topic,
    text: question.question,
    options: question.options.map((option) => option.text),
    answer: question.options.findIndex(
      (option) => option.label === question.correctAnswer
    ),
    explanation: question.explanation,
  };
}

function createExamQuestions(
  selectedSubjects: string[],
  previousQuestions: PracticeQuestion[] = []
): PracticeQuestion[] {
  const englishBank = questionBanks[ENGLISH] ?? [];

  const englishQuestions = shuffleArray(englishBank)
    .slice(0, 20)
    .map((question) => convertQuestion(question, ENGLISH));

  const otherQuestions = selectedSubjects
    .filter((subject) => subject !== ENGLISH)
    .flatMap((subject) => {
      const bank = questionBanks[subject] ?? [];

      return shuffleArray(bank)
        .slice(0, 10)
        .map((question) => convertQuestion(question, subject));
    });

  let exam = shuffleArray([...englishQuestions, ...otherQuestions]);

  // Avoid repeating the exact same overall question order on a retry.
  if (
    previousQuestions.length === exam.length &&
    exam.length > 1 &&
    exam.every((question, index) => question.id === previousQuestions[index].id)
  ) {
    exam = [...exam.slice(1), exam[0]];
  }

  return exam;
}

export default function PracticePage() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [seconds, setSeconds] = useState(EXAM_DURATION);
  const [started, setStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [setupError, setSetupError] = useState("");

  const optionalSubjects = availableSubjects.filter(
    (subject) => subject !== ENGLISH
  );

  const question = questions[current];
  const answeredCount = Object.keys(answers).length;

  const score = questions.reduce(
    (total, item) =>
      total + (answers[item.id] === item.answer ? 1 : 0),
    0
  );

  const formattedTime = `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  useEffect(() => {
    if (!started || submitted) return;

    const timer = window.setInterval(() => {
      setSeconds((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(timer);
          setSubmitted(true);
          setConfirmSubmit(false);
          return 0;
        }

        return remaining - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, submitted]);

  function toggleSubject(subject: string) {
    setSetupError("");

    setSelectedSubjects((previous) => {
      if (previous.includes(subject)) {
        return previous.filter((item) => item !== subject);
      }

      if (previous.length >= 3) {
        setSetupError("You can select only three additional subjects.");
        return previous;
      }

      return [...previous, subject];
    });
  }

  function startExam(previousQuestions: PracticeQuestion[] = []) {
    if (selectedSubjects.length !== 3) {
      setSetupError("Please select exactly three additional subjects.");
      return;
    }

    const allSubjects = [ENGLISH, ...selectedSubjects];

    const insufficientSubject = allSubjects.find((subject) => {
      const required = subject === ENGLISH ? 20 : 10;
      return (questionBanks[subject] ?? []).length < required;
    });

    if (insufficientSubject) {
      setSetupError(
        `${insufficientSubject} does not have enough questions yet. Please add the required questions to its question bank.`
      );
      return;
    }

    const examQuestions = createExamQuestions(
      selectedSubjects,
      previousQuestions
    );

    setQuestions(examQuestions);
    setCurrent(0);
    setAnswers({});
    setSeconds(EXAM_DURATION);
    setSubmitted(false);
    setConfirmSubmit(false);
    setSetupError("");
    setStarted(true);
  }

  function submitTest() {
    setSubmitted(true);
    setConfirmSubmit(false);
  }

  function restartTest() {
    startExam(questions);
  }

  if (!started) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <a
            href="/"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Back to homepage
          </a>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              JAMBPrep
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Set up your practice exam
            </h1>

            <p className="mt-3 leading-7 text-slate-600">
              Choose your subjects before starting. Use of English is
              compulsory, and you must select three additional subjects.
            </p>

            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="font-bold">Use of English</h2>
                <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                  Compulsory
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                20 questions
              </p>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-bold">
                  Choose three other subjects
                </h2>
                <span className="text-sm font-semibold text-slate-500">
                  {selectedSubjects.length}/3 selected
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {optionalSubjects.map((subject) => {
                  const selected = selectedSubjects.includes(subject);

                  return (
                    <button
                      key={subject}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => toggleSubject(subject)}
                      className={`flex min-h-16 items-center justify-between gap-3 rounded-xl border p-4 text-left font-semibold transition ${
                        selected
                          ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                      }`}
                    >
                      <span>{subject}</span>
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border text-sm ${
                          selected
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {selected ? "✓" : ""}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Each selected subject contributes 10 questions.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Total questions</p>
                <p className="mt-1 text-2xl font-black">50</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Time allowed</p>
                <p className="mt-1 text-2xl font-black">30 mins</p>
              </div>
            </div>

            {setupError && (
              <p role="alert" className="mt-4 text-sm font-medium text-red-600">
                {setupError}
              </p>
            )}

            <button
              type="button"
              onClick={() => startExam()}
              className="mt-6 min-h-14 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700"
            >
              Start examination →
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              Your 30-minute timer starts when you begin the examination.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (submitted) {
    const percentage =
      questions.length > 0
        ? Math.round((score / questions.length) * 100)
        : 0;

    const subjectScores = [ENGLISH, ...selectedSubjects].map((subject) => {
      const subjectQuestions = questions.filter(
        (item) => item.subject === subject
      );

      const subjectCorrect = subjectQuestions.filter(
        (item) => answers[item.id] === item.answer
      ).length;

      return {
        subject,
        correct: subjectCorrect,
        total: subjectQuestions.length,
      };
    });

    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <a
            href="/"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Back to homepage
          </a>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl">
              {percentage >= 50 ? "🎉" : "📚"}
            </div>

            <p className="mt-6 text-center text-sm font-bold uppercase tracking-widest text-blue-600">
              Test completed
            </p>
            <h1 className="mt-2 text-center text-3xl font-black sm:text-4xl">
              Your results
            </h1>
            <p className="mt-3 text-center text-slate-600">
              Review your performance and keep practising.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 text-center">
              <p className="text-sm text-slate-500">Your score</p>
              <p className="mt-2 text-5xl font-black text-blue-700">
                {score}/{questions.length}
              </p>
              <p className="mt-2 font-semibold">{percentage}%</p>
              <p className="mt-3 text-sm text-slate-600">
                {answeredCount} of {questions.length} questions answered
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Time remaining: {formattedTime}
              </p>
            </div>

            <h2 className="mt-8 text-lg font-bold">Performance by subject</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {subjectScores.map((item) => (
                <div
                  key={item.subject}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="font-semibold">{item.subject}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {item.correct}/{item.total} correct
                  </p>
                </div>
              ))}
            </div>

            <h2 className="mt-8 text-lg font-bold">Review your answers</h2>
            <div className="mt-4 space-y-4">
              {questions.map((item, index) => {
                const selected = answers[item.id];
                const correct = selected === item.answer;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      {item.subject}
                    </p>
                    <p className="mt-2 font-semibold">
                      Question {index + 1}: {item.text}
                    </p>

                    <p className="mt-3 text-sm text-slate-600">
                      Your answer:{" "}
                      {selected === undefined
                        ? "Not answered"
                        : `${LETTERS[selected]}. ${item.options[selected]}`}
                    </p>

                    <p className="mt-1 text-sm font-medium text-blue-700">
                      Correct answer:{" "}
                      {item.answer >= 0
                        ? `${LETTERS[item.answer]}. ${item.options[item.answer]}`
                        : "Not available"}
                    </p>

                    <p
                      className={`mt-2 text-sm font-semibold ${
                        correct ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {correct ? "Correct" : "Incorrect"}
                    </p>

                    {item.explanation && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        <span className="font-semibold">Explanation: </span>
                        {item.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={restartTest}
              className="mt-7 min-h-12 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Try again with new question order
            </button>

            <button
              type="button"
              onClick={() => {
                setStarted(false);
                setSubmitted(false);
                setSelectedSubjects([]);
                setQuestions([]);
                setAnswers({});
                setCurrent(0);
                setSeconds(EXAM_DURATION);
                setSetupError("");
              }}
              className="mt-3 min-h-12 w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50"
            >
              Choose different subjects
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <p className="text-center text-slate-700">
          No questions are available for this examination. Please check your
          question banks.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/" className="text-lg font-black">
            JAMB<span className="text-blue-600">Prep</span>
          </a>

          <div className="text-right">
            <p className="text-xs text-slate-500">TIME REMAINING</p>
            <p
              className={`text-lg font-black tabular-nums ${
                seconds < 60 ? "text-red-600" : "text-blue-700"
              }`}
            >
              {formattedTime}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600">
            PRACTICE EXAMINATION
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">
            JAMB Practice Test
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {ENGLISH} + {selectedSubjects.join(", ")}
          </p>
        </div>

        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="font-semibold">
              Question {current + 1} of {questions.length}
            </span>
            <span className="text-slate-500">
              {answeredCount} answered
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_280px]">
          <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-blue-600">
              {question.subject.toUpperCase()} · QUESTION {current + 1}
            </p>

            {question.topic && (
              <p className="mt-2 text-xs text-slate-500">
                Topic: {question.topic}
              </p>
            )}

            <h2 className="mt-4 text-lg font-bold leading-8 sm:text-xl">
              {question.text}
            </h2>

            <div className="mt-6 space-y-3">
              {question.options.map((option, index) => {
                const selected = answers[question.id] === index;

                return (
                  <button
                    key={`${question.id}-${index}`}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [question.id]: index,
                      }))
                    }
                    className={`flex min-h-14 w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                      selected
                        ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        selected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {LETTERS[index]}
                    </span>
                    <span className="pt-1 text-sm leading-6 sm:text-base">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
              <button
                type="button"
                disabled={current === 0}
                onClick={() => setCurrent((value) => value - 1)}
                className="min-h-12 rounded-xl border border-slate-300 px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {current < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrent((value) => value + 1)}
                  className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Next question →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmSubmit(true)}
                  className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  Submit examination
                </button>
              )}
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-bold">Question navigation</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Select a number to move to that question.
            </p>

            <div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-4">
              {questions.map((item, index) => {
                const isCurrent = current === index;
                const isAnswered = answers[item.id] !== undefined;

                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to question ${index + 1}`}
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => setCurrent(index)}
                    className={`flex aspect-square items-center justify-center rounded-lg border text-sm font-bold ${
                      isCurrent
                        ? "border-blue-600 bg-blue-600 text-white"
                        : isAnswered
                          ? "border-blue-200 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-2 text-xs text-slate-600">
              <p>🟦 Current question</p>
              <p>🔹 Answered question</p>
              <p>⬜ Not answered</p>
            </div>

            <button
              type="button"
              onClick={() => setConfirmSubmit(true)}
              className="mt-6 min-h-12 w-full rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50"
            >
              Submit test
            </button>
          </aside>
        </div>
      </div>

      {confirmSubmit && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-3 sm:items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submit-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-7">
            <h2 id="submit-title" className="text-xl font-black">
              Submit your examination?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              You have answered {answeredCount} out of {questions.length}{" "}
              questions. Unanswered questions will count as incorrect.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setConfirmSubmit(false)}
                className="min-h-12 flex-1 rounded-xl border border-slate-300 px-4 py-3 font-semibold"
              >
                Continue test
              </button>
              <button
                type="button"
                onClick={submitTest}
                className="min-h-12 flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Confirm submit
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
