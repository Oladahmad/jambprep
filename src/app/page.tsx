
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import InstallPWA from "@/components/InstallPWA";

const features = [
  {
    icon: "📝",
    title: "Practice Questions",
    description:
      "Practise multiple-choice questions and strengthen your understanding of important topics.",
  },
  {
    icon: "⏱️",
    title: "Mock Examinations",
    description:
      "Experience timed examinations and prepare yourself for exam conditions.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    description:
      "Review your answers, understand your mistakes and improve with every attempt.",
  },
];

export default function Home() {
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        const metadataName =
          data.user.user_metadata?.first_name ??
          data.user.user_metadata?.full_name;

        setUserName(
          typeof metadataName === "string" && metadataName.trim()
            ? metadataName.trim()
            : data.user.email ?? "Student"
        );
      } else {
        setUserName(null);
      }

      setLoadingUser(false);
    }

    void loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      const metadataName =
        user?.user_metadata?.first_name ??
        user?.user_metadata?.full_name;

      setUserName(
        user
          ? typeof metadataName === "string" && metadataName.trim()
            ? metadataName.trim()
            : user.email ?? "Student"
          : null
      );

      setLoadingUser(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    setSigningOut(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setSigningOut(false);
      return;
    }

    setUserName(null);
    setSigningOut(false);
    router.refresh();
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-xl font-black tracking-tight"
          >
            JAMB<span className="text-blue-600">Prep</span>
            <span className="ml-2 hidden text-xs font-semibold text-slate-500 sm:inline">
              ASSESSMENT
            </span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/practice" className="hover:text-blue-600">
              Practice
            </Link>
            <a href="#features" className="hover:text-blue-600">
              Features
            </a>
            <a href="#about" className="hover:text-blue-600">
              About
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!loadingUser && userName ? (
              <>
                <Link
                  href="/practice"
                  className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:px-4"
                >
                  Start practising
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={signingOut}
                  className="hidden rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50 sm:inline-flex"
                >
                  {signingOut ? "Signing out..." : "Log out"}
                </button>
              </>
            ) : !loadingUser ? (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 sm:px-4"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-100" />
            )}
          </div>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Your preparation, your pace
          </span>

          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Prepare better.
            <span className="mt-2 block text-blue-600">
              Practise smarter.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            Get ready for JAMB with practice questions, timed mock
            examinations and useful feedback to help you improve your
            performance.
          </p>

          {userName && (
            <p className="mt-5 text-sm font-semibold text-blue-700">
              Welcome back, {userName}!
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/practice"
              className="flex min-h-14 items-center justify-center rounded-xl bg-blue-600 px-6 py-4 font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Start practising →
            </Link>

            {!loadingUser && !userName && (
              <Link
                href="/register"
                className="flex min-h-14 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-4 font-bold text-slate-800 transition hover:bg-slate-100"
              >
                Create free account
              </Link>
            )}

            <InstallPWA />
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Learn at your pace. Practise as often as you need.
          </p>
        </div>

        <div className="rounded-3xl bg-blue-700 p-5 text-white shadow-xl sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                Your next step
              </p>
              <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                Ready to practise?
              </h2>
            </div>

            <span className="text-4xl" aria-hidden="true">
              🎯
            </span>
          </div>

          <div className="mt-7 rounded-2xl bg-white p-5 text-slate-900 sm:p-6">
            <p className="text-sm font-medium text-slate-500">
              Your practice examination
            </p>

            <h3 className="mt-2 text-xl font-black">
              50 questions. 30 minutes.
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Choose Use of English and three additional subjects, answer
              the questions and review your results at the end.
            </p>

            <Link
              href="/practice"
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 font-bold text-white hover:bg-blue-700"
            >
              Open practice examination
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-blue-600 p-4">
              <p className="text-lg font-bold">Learn</p>
              <p className="mt-1 text-sm leading-6 text-blue-100">
                Strengthen your knowledge.
              </p>
            </div>

            <div className="rounded-xl bg-blue-600 p-4">
              <p className="text-lg font-bold">Improve</p>
              <p className="mt-1 text-sm leading-6 text-blue-100">
                Learn from your mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-24 border-y border-slate-200 bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Built for your preparation
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Everything starts with practice.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Develop better study habits through regular practice and
              meaningful feedback.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-200 hover:shadow-md"
              >
                <span className="text-3xl" aria-hidden="true">
                  {feature.icon}
                </span>

                <p className="mt-5 text-sm font-bold text-blue-600">
                  0{index + 1}
                </p>

                <h3 className="mt-2 text-xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/practice"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
            >
              Go to practice →
            </Link>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="bg-slate-900 px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black sm:text-3xl">
              Your JAMB journey starts here.
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Practise, learn from your mistakes and keep moving forward
              towards your examination goals.
            </p>
          </div>

          <Link
            href="/practice"
            className="flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-6 py-3 font-bold text-slate-900 hover:bg-blue-50"
          >
            Start practising →
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-7 text-center text-sm text-slate-400">
        <p>© 2026 JAMBPrep Assessment.</p>
        <p className="mt-1">Built for better preparation.</p>
      </footer>
    </main>
  );
}
