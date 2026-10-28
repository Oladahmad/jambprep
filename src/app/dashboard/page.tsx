
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import InstallPWA from "@/components/InstallPWA";

type ExamResult = {
  id: string;
  score: number;
  total_questions: number;
  percentage: number;
  subjects: string[];
  time_taken_seconds: number | null;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("Student");
  const [results, setResults] = useState<ExamResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  const loadDashboard = useCallback(async () => {
    const supabase = createClient();

    setLoading(true);
    setErrorMessage("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        router.replace("/login?next=/dashboard");
        return;
      }

      const storedFirstName = user.user_metadata?.first_name;

      if (
        typeof storedFirstName === "string" &&
        storedFirstName.trim()
      ) {
        setFirstName(storedFirstName.trim());
      } else {
        const storedFullName = user.user_metadata?.full_name;

        if (
          typeof storedFullName === "string" &&
          storedFullName.trim()
        ) {
          setFirstName(storedFullName.trim().split(/\s+/)[0]);
        } else {
          setFirstName("Student");
        }
      }

      const { data, error } = await supabase
        .from("exam_results")
        .select(
          "id, score, total_questions, percentage, subjects, time_taken_seconds, created_at"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setErrorMessage(
          "We couldn't load your exam results. Please refresh the page and try again."
        );
        return;
      }

      setResults((data ?? []) as ExamResult[]);
    } catch {
      setErrorMessage(
        "Something went wrong while loading your dashboard. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleSignOut() {
    setSigningOut(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage("Unable to log out right now. Please try again.");
      setSigningOut(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  const totalAttempts = results.length;

  const averageScore =
    totalAttempts > 0
      ? results.reduce(
          (sum, result) => sum + Number(result.percentage),
          0
        ) / totalAttempts
      : 0;

  const bestScore =
    totalAttempts > 0
      ? Math.max(
          ...results.map((result) => Number(result.percentage))
        )
      : 0;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function formatDuration(seconds: number | null) {
    if (seconds === null || seconds === undefined) {
      return "Not recorded";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}m ${remainingSeconds}s`;
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="text-xl font-black text-blue-600"
          >
            JAMBPrep
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 disabled:opacity-60"
          >
            {signingOut ? "Logging out..." : "Log out"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-3xl bg-blue-600 p-6 text-white sm:p-8">
          <p className="text-sm font-semibold text-blue-100">
            YOUR LEARNING SPACE
          </p>

          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Welcome back, {firstName}!
          </h1>

          <p className="mt-3 max-w-2xl leading-7 text-blue-100">
            Keep practising, review your performance, and work towards
            your JAMB goals.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/practice"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Start practice exam →
            </Link>

            <div className="[&_button]:border [&_button]:border-white/70 [&_button]:bg-blue-700 [&_button]:text-white [&_button]:shadow-none [&_button]:hover:bg-blue-800 [&_button]:focus:ring-white">
              <InstallPWA />
            </div>
          </div>
        </section>

        {errorMessage && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <p>{errorMessage}</p>

            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="mt-2 font-bold underline"
            >
              Try again
            </button>
          </div>
        )}

        <section className="mt-8">
          <h2 className="text-xl font-black">Your performance</h2>
          <p className="mt-1 text-sm text-slate-600">
            Track your progress across completed practice exams.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Total attempts
              </p>
              <p className="mt-3 text-3xl font-black">
                {loading ? "—" : totalAttempts}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Exams completed
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Average score
              </p>
              <p className="mt-3 text-3xl font-black">
                {loading ? "—" : `${averageScore.toFixed(1)}%`}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Across your attempts
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                Best score
              </p>
              <p className="mt-3 text-3xl font-black">
                {loading ? "—" : `${bestScore.toFixed(1)}%`}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Your highest percentage
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black">
                Recent practice exams
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Review your latest results.
              </p>
            </div>

            <Link
              href="/practice"
              className="font-bold text-blue-600 hover:underline"
            >
              Practise again →
            </Link>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {loading ? (
              <p className="p-6 text-sm text-slate-500">
                Loading your results...
              </p>
            ) : results.length === 0 ? (
              <div className="p-8 text-center">
                <h3 className="text-lg font-bold">
                  No exams completed yet
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your completed practice exams and scores will appear here.
                </p>
                <Link
                  href="/practice"
                  className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-700"
                >
                  Take your first exam
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {results.slice(0, 10).map((result) => (
                  <article key={result.id} className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="min-w-0">
                        <p className="font-bold">
                          {formatDate(result.created_at)}
                        </p>

                        <p className="mt-1 text-sm text-slate-600">
                          {result.score} out of {result.total_questions} correct
                        </p>

                        <p className="mt-2 text-xs text-slate-500">
                          Time taken:{" "}
                          {formatDuration(result.time_taken_seconds)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {(result.subjects ?? []).map((subject) => (
                            <span
                              key={subject}
                              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="text-2xl font-black text-blue-600">
                          {Number(result.percentage).toFixed(1)}%
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Exam score
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
