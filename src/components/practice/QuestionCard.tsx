import type { PracticeQuestion } from "@/lib/practice";

const LETTERS = ["A", "B", "C", "D"];

type QuestionCardProps = {
  question: PracticeQuestion;
  index: number;
  total: number;
  selectedAnswer?: number;
  onAnswer: (answer: number) => void;
};

export default function QuestionCard({
  question,
  index,
  total,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <p className="text-sm font-semibold text-blue-600">
        {question.subject.toUpperCase()} · QUESTION {index + 1} OF {total}
      </p>

      {question.topic && (
        <p className="mt-2 text-xs text-slate-500">Topic: {question.topic}</p>
      )}

      <h1 className="mt-4 text-lg font-bold leading-8 sm:text-xl">{question.text}</h1>

      <div className="mt-6 space-y-3">
        {question.options.map((option, optionIndex) => {
          const selected = selectedAnswer === optionIndex;

          return (
            <button
              key={`${question.id}-${optionIndex}`}
              type="button"
              aria-pressed={selected}
              onClick={() => onAnswer(optionIndex)}
              className={`flex min-h-14 w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                selected
                  ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                  : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                }`}
              >
                {LETTERS[optionIndex]}
              </span>
              <span className="pt-1 text-sm leading-6 sm:text-base">{option}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
