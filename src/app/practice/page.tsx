"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { availableSubjects } from "@/data";
import { formatDuration, getMaximumQuestionCount, QUESTION_STEP, SECONDS_PER_QUESTION } from "@/lib/practice";

export default function PracticeSetupPage() {
  const router = useRouter();
  const [subject, setSubject] = useState(availableSubjects[0] ?? "");
  const maximumQuestionCount = useMemo(() => getMaximumQuestionCount(subject), [subject]);
  const [questionCount, setQuestionCount] = useState(QUESTION_STEP);

  useEffect(() => {
    setQuestionCount(maximumQuestionCount >= QUESTION_STEP ? QUESTION_STEP : 0);
  }, [subject, maximumQuestionCount]);

  const duration = questionCount * SECONDS_PER_QUESTION;
  const canStart = subject && questionCount >= QUESTION_STEP && questionCount <= maximumQuestionCount;

  function startPractice() {
    if (!canStart) return;
    const params = new URLSearchParams({ subject, count: String(questionCount) });
    router.push(`/practice/test?${params.toString()}`);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link href="/dashboard" className="text-sm font-semibold text-blue-600 hover:underline">← Back to dashboard</Link>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">JAMBPrep</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">Create your practice test</h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">Practise one subject at a time. Pick the subject, choose how many questions you want in groups of 10, then start your timed test.</p>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div><h2 className="text-xl font-black">1. Choose a subject</h2><p className="mt-1 text-sm text-slate-600">Every subject is available, including Python.</p></div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">{availableSubjects.length} subjects</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {availableSubjects.map((item) => {
                const selected = item === subject;
                const maximum = getMaximumQuestionCount(item);
                return <button key={item} type="button" aria-pressed={selected} onClick={() => setSubject(item)} className={`flex min-h-20 items-center justify-between gap-3 rounded-xl border p-4 text-left font-semibold transition ${selected ? "border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"}`}><span>{item}</span><span className="text-right text-xs font-medium text-slate-500">Up to<br />{maximum} questions</span></button>;
              })}
            </div>
          </div>

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h2 className="text-xl font-black">2. Choose your question count</h2>
            <p className="mt-1 text-sm text-slate-600">Select from 10-question steps. {subject} currently has enough questions for up to {maximumQuestionCount} questions.</p>
            {maximumQuestionCount >= QUESTION_STEP ? <div className="mt-5 flex flex-wrap gap-3">{Array.from({ length: maximumQuestionCount / QUESTION_STEP }, (_, index) => (index + 1) * QUESTION_STEP).map((count) => <button key={count} type="button" aria-pressed={questionCount === count} onClick={() => setQuestionCount(count)} className={`min-h-12 min-w-20 rounded-xl border px-4 py-3 font-bold transition ${questionCount === count ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white hover:border-blue-300"}`}>{count}</button>)}</div> : <p role="alert" className="mt-4 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-800">This subject needs at least 10 questions before a practice test can be created.</p>}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-4"><p className="text-sm text-slate-600">Subject</p><p className="mt-1 text-lg font-black text-blue-800">{subject}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-600">Questions</p><p className="mt-1 text-2xl font-black">{questionCount || "—"}</p></div>
            <div className="rounded-xl bg-slate-50 p-4"><p className="text-sm text-slate-600">Time allowed</p><p className="mt-1 text-2xl font-black">{questionCount ? formatDuration(duration) : "—"}</p></div>
          </div>

          <button type="button" disabled={!canStart} onClick={startPractice} className="mt-6 min-h-14 w-full rounded-xl bg-blue-600 px-5 py-4 font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">Start {subject} practice →</button>
          <p className="mt-4 text-center text-xs leading-5 text-slate-500">Your timer allows one minute for each question and begins when the test opens.</p>
        </section>
      </div>
    </main>
  );
}
