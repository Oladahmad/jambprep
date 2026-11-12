import Link from "next/link";
import type { PracticeQuestion } from "@/lib/practice";

const LETTERS = ["A", "B", "C", "D"];

type PracticeResultsProps = {
  questions: PracticeQuestion[];
  answers: Record<string, number>;
  subject: string;
  onTryAgain: () => void;
};

export default function PracticeResults({
  questions,
  answers,
  subject,
  onTryAgain,
}: PracticeResultsProps) {
  const score = questions.filter((question) => answers[question.id] === question.answer).length;
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">Practice complete</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Your {subject} result</h1>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-xl bg-blue-50 p-4"><p className="text-2xl font-black text-blue-700">{percentage}%</p><p className="mt-1 text-xs text-slate-600">Score</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-black">{score}</p><p className="mt-1 text-xs text-slate-600">Correct</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-2xl font-black">{questions.length}</p><p className="mt-1 text-xs text-slate-600">Questions</p></div>
          </div>

          <h2 className="mt-8 text-lg font-bold">Review your answers</h2>
          <div className="mt-4 space-y-4">
            {questions.map((question, index) => {
              const selected = answers[question.id];
              const correct = selected === question.answer;

              return (
                <article key={question.id} className="rounded-xl border border-slate-200 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-blue-600">Question {index + 1}</p>
                  <p className="mt-2 font-semibold">{question.text}</p>
                  <p className="mt-3 text-sm text-slate-600">Your answer: {selected === undefined ? "Not answered" : `${LETTERS[selected]}. ${question.options[selected]}`}</p>
                  <p className="mt-1 text-sm font-medium text-blue-700">Correct answer: {LETTERS[question.answer]}. {question.options[question.answer]}</p>
                  <p className={`mt-2 text-sm font-semibold ${correct ? "text-green-700" : "text-red-600"}`}>{correct ? "Correct" : "Incorrect"}</p>
                  {question.explanation && <p className="mt-3 text-sm leading-6 text-slate-600"><span className="font-semibold">Explanation: </span>{question.explanation}</p>}
                </article>
              );
            })}
          </div>

          <button type="button" onClick={onTryAgain} className="mt-7 min-h-12 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Try again with new questions</button>
          <Link href="/practice" className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50">Choose another subject</Link>
          <Link href="/dashboard" className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl border border-blue-200 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50">Return to dashboard</Link>
        </section>
      </div>
    </main>
  );
}
