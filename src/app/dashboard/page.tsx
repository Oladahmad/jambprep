
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type ExamResult = {
  id: string;
  score: number;
  total_questions: number;
  percentage: number;
  subjects: string[];
  time_taken_seconds: number | null;
  created_at: string;
};

type DisplayResult = ExamResult & {
  displayDate: string;
};

export default function StudentDashboard() {
  const router = useRouter();

  const [name, setName] = useState("Student");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<DisplayResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login?next=/dashboard");
        return;
      }

      const metadataName = user.user_metadata?.full_name;

const firstName =
  typeof metadataName === "string" && metadataName.trim()
    ? metadataName.trim().split(/\s+/)[0]
    : "Student";

      setName(
        typeof metadataName === "string" && metadataName.trim()
          ? metadataName.trim()
          : "Student"
      );

      const { data, error: resultsError } = await supabase
        .from("exam_results")
        .select(
          "id, score, total_questions, percentage, subjects, time_taken_seconds, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);

      if (resultsError) {
        setError(
          "We couldn't load your examination history. Check that the exam_results table and its policies have been created in Supabase."
        );
        setResults([]);
        return;
      }

      const formattedResults: DisplayResult[] = (data ?? []).map(
        (result) => ({
          ...result,
          percentage: Number(result.percentage),
          displayDate: new Date(result.created_at).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        })
      );

      setResults(formattedResults);
    } catch {
      setError("Something went wrong while loading your dashboard.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleSignOut() {
    setSigningOut(true);
    setError("");

    const supabase = createClient();
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError("Unable to sign out. Please try again.");
      setSigningOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const totalAttempts = results.length;

  const averageScore =
    totalAttempts > 0
      ? Math.round(
          results.reduce((total, result) => total + result.percentage, 0) /
            totalAttempts
        )
      : 0;

  const bestScore =
    totalAttempts > 0
      ? Math.max(...results.map((result) => result.percentage))
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-black">
            JAMB<span className="text-blue-600">Prep</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
          >
            {signingOut ? "Signing out..." : "Log out"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <section className="rounded-3xl bg-blue-700 p-6 text-white shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">
            Student dashboard
          </p>

          <h1 className="mt-3 break-words text-3xl font-black sm:text-4xl">
            Welcome, {name}!
          </h1>

          <p className="mt-3 break-all text-sm text-blue-100">
            {email}
          </p>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base">
            Keep practising, learn from your mistakes and track your
            examination performance as you prepare for JAMB.
          </p>

          <Link
            href="/practice"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Start a practice examination →
          </Link>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-black">Your performance</h2>
          <p className="mt-1 text-sm text-slate-500">
            A summary of your saved examination results.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Completed attempts
              </p>
              <p className="mt-3 text-3xl font-black text-blue-700">
                {loading ? "..." : totalAttempts}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Average score
              </p>
              <p className="mt-3 text-3xl font-black text-blue-700">
                {loading ? "..." : `${averageScore}%`}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-medium text-slate-500">
                Best score
              </p>
              <p className="mt-3 text-3xl font-black text-blue-700">
                {loading ? "..." : `${Math.round(bestScore)}%`}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-black">Examination history</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your most recent saved results.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadDashboard()}
              disabled={loading}
              className="min-h-10 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 disabled:opacity-60"
            >
              Refresh results
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 rounded-xl bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {error}
            </div>
          )}

          {loading ? (
            <p className="mt-6 text-sm text-slate-500">
              Loading your dashboard...
            </p>
          ) : results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center sm:p-8">
              <span className="text-4xl" aria-hidden="true">
                📚
              </span>

              <h3 className="mt-3 text-lg font-bold">
                Your journey starts here
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
                You don't have any saved examination results yet. Complete
                a practice test to start building your performance history.
              </p>

              <Link
                href="/practice"
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
              >
                Take your first test
              </Link>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {results.map((result) => (
                <article
                  key={result.id}
                  className="rounded-xl border border-slate-200 p-4 sm:p-5"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <p className="font-bold">
                        Practice examination
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {result.displayDate}
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="text-2xl font-black text-blue-700">
                        {result.percentage}%
                      </p>
                      <p className="text-sm text-slate-500">
                        {result.score}/{result.total_questions} correct
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {result.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
