"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { availableSubjects } from "@/data";
import { createClient } from "@/lib/supabase/client";
import { getMaximumQuestionCount, getPracticeQuestions, PracticeQuestion, QUESTION_STEP, SECONDS_PER_QUESTION } from "@/lib/practice";
import PracticeResults from "@/components/practice/PracticeResults";
import QuestionCard from "@/components/practice/QuestionCard";

function formatClock(seconds: number): string {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

function PracticeTestContent() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") ?? "";
  const count = Number(searchParams.get("count"));
  const maximumCount = getMaximumQuestionCount(subject);
  const isValidConfiguration = availableSubjects.includes(subject) && Number.isInteger(count) && count >= QUESTION_STEP && count % QUESTION_STEP === 0 && count <= maximumCount;
  const duration = count * SECONDS_PER_QUESTION;

  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(duration);
  const [submitted, setSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const savingRef = useRef(false);
  const deadlineRef = useRef<number | null>(null);
  const initializedRef = useRef(false);

  const initialiseTest = useCallback(() => {
    if (!isValidConfiguration) return;
    setQuestions(getPracticeQuestions(subject, count));
    setAnswers({});
    setCurrentQuestion(0);
    setSecondsRemaining(duration);
    setSubmitted(false);
    setConfirmSubmit(false);
    setSaving(false);
    setSaveError("");
    savingRef.current = false;
    deadlineRef.current = Date.now() + duration * 1000;
  }, [count, duration, isValidConfiguration, subject]);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    initialiseTest();
  }, [initialiseTest]);

  const finishPractice = useCallback(async () => {
    if (submitted || savingRef.current || questions.length === 0) return;

    savingRef.current = true;
    setSaving(true);
    setSaveError("");

    try {
      const supabase = createClient();
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        setSaveError("Your session could not be verified. Please log in again before saving your result.");
        return;
      }

      const score = questions.filter((question) => answers[question.id] === question.answer).length;
      const { error } = await supabase.from("exam_results").insert({
        user_id: user.id,
        score,
        total_questions: questions.length,
        percentage: Number(((score / questions.length) * 100).toFixed(2)),
        subjects: [subject],
        time_taken_seconds: Math.max(0, Math.min(duration, duration - secondsRemaining)),
      });

      if (error) {
        setSaveError(`Your result could not be saved. ${error.message}`);
        return;
      }

      setSubmitted(true);
      setConfirmSubmit(false);
    } catch (error) {
      console.error("Failed to save practice result:", error);
      setSaveError("A network or unexpected error prevented your result from being saved. Please try again.");
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  }, [answers, duration, questions, secondsRemaining, subject, submitted]);

  useEffect(() => {
    if (submitted || !deadlineRef.current || questions.length === 0) return;
    const timer = window.setInterval(() => {
      setSecondsRemaining(Math.max(0, Math.ceil((deadlineRef.current! - Date.now()) / 1000)));
    }, 250);
    return () => window.clearInterval(timer);
  }, [questions.length, submitted]);

  useEffect(() => {
    if (!submitted && questions.length > 0 && secondsRemaining === 0) void finishPractice();
  }, [finishPractice, questions.length, secondsRemaining, submitted]);

  const current = questions[currentQuestion];
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  if (!isValidConfiguration) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><div className="max-w-md rounded-2xl bg-white p-7 text-center shadow-sm"><h1 className="text-xl font-black">This practice test is not available</h1><p className="mt-3 text-sm leading-6 text-slate-600">Choose a subject and a valid question count to create a new practice test.</p><Link href="/practice" className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Set up a practice test</Link></div></main>;
  }

  if (submitted) return <PracticeResults questions={questions} answers={answers} subject={subject} onTryAgain={initialiseTest} />;

  if (!current) return <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><p className="text-slate-600">Preparing your practice questions…</p></main>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/practice" className="text-lg font-black">JAMB<span className="text-blue-600">Prep</span></Link>
          <div className="text-right"><p className="text-xs text-slate-500">TIME REMAINING</p><p className={`text-lg font-black tabular-nums ${secondsRemaining < 60 ? "text-red-600" : "text-blue-700"}`}>{formatClock(secondsRemaining)}</p></div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6"><p className="text-sm font-semibold text-blue-600">{subject.toUpperCase()} PRACTICE</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">{subject} test</h1><p className="mt-2 text-sm leading-6 text-slate-600">{questions.length} questions · one minute per question · answers submit automatically when time runs out.</p></div>
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><div className="flex items-center justify-between gap-3 text-sm"><span className="font-semibold">Question {currentQuestion + 1} of {questions.length}</span><span className="text-slate-500">{answeredCount} answered</span></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }} /></div></div>

        <div className="grid items-start gap-5 lg:grid-cols-[1fr_280px]">
          <div><QuestionCard question={current} index={currentQuestion} total={questions.length} selectedAnswer={answers[current.id]} onAnswer={(answer) => setAnswers((previous) => ({ ...previous, [current.id]: answer }))} />
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-between"><button type="button" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((value) => value - 1)} className="min-h-12 rounded-xl border border-slate-300 px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-40">← Previous</button>{currentQuestion < questions.length - 1 ? <button type="button" onClick={() => setCurrentQuestion((value) => value + 1)} className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Next question →</button> : <button type="button" onClick={() => setConfirmSubmit(true)} className="min-h-12 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Submit test</button>}</div>
          </div>
          <aside className="rounded-2xl border border-slate-200 bg-white p-5"><h2 className="font-bold">Question navigation</h2><p className="mt-1 text-sm leading-6 text-slate-500">Select a number to move to that question.</p><div className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-8 lg:grid-cols-4">{questions.map((question, index) => { const isCurrent = currentQuestion === index; const isAnswered = answers[question.id] !== undefined; return <button key={question.id} type="button" aria-label={`Go to question ${index + 1}`} aria-current={isCurrent ? "step" : undefined} onClick={() => setCurrentQuestion(index)} className={`flex aspect-square items-center justify-center rounded-lg border text-sm font-bold ${isCurrent ? "border-blue-600 bg-blue-600 text-white" : isAnswered ? "border-blue-200 bg-blue-50 text-blue-700" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"}`}>{index + 1}</button>; })}</div><button type="button" onClick={() => setConfirmSubmit(true)} className="mt-6 min-h-12 w-full rounded-xl border border-blue-600 px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50">Submit test</button><Link href="/practice" className="mt-3 flex min-h-11 items-center justify-center rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50">End test and change subject</Link></aside>
        </div>
      </div>

      {confirmSubmit && <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-3 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="submit-title"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-7"><h2 id="submit-title" className="text-xl font-black">Submit your practice test?</h2><p className="mt-3 text-sm leading-6 text-slate-600">You have answered {answeredCount} out of {questions.length} questions. Unanswered questions count as incorrect.</p>{saveError && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm leading-6 text-red-700">{saveError}</p>}<div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" disabled={saving} onClick={() => { setConfirmSubmit(false); setSaveError(""); }} className="min-h-12 flex-1 rounded-xl border border-slate-300 px-4 py-3 font-semibold disabled:opacity-50">Continue test</button><button type="button" disabled={saving} onClick={() => void finishPractice()} className="min-h-12 flex-1 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{saving ? "Saving result..." : "Confirm and save"}</button></div></div></div>}
      {saveError && !confirmSubmit && <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-xl rounded-xl border border-red-200 bg-white p-4 shadow-lg"><p role="alert" className="text-sm leading-6 text-red-700">{saveError}</p><button type="button" disabled={saving} onClick={() => void finishPractice()} className="mt-3 min-h-10 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Saving..." : "Retry saving result"}</button></div>}
    </main>
  );
}

export default function PracticeTestPage() {
  return <Suspense fallback={<main className="flex min-h-screen items-center justify-center bg-slate-50 p-6"><p className="text-slate-600">Preparing your practice test…</p></main>}><PracticeTestContent /></Suspense>;
}
