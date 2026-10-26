
"use client";

import { useState } from "react";

const features = [
  {
    icon: "📝",
    title: "Practice Questions",
    description:
      "Work through questions at your own pace and build your confidence.",
  },
  {
    icon: "⏱️",
    title: "Mock Examinations",
    description:
      "Prepare for exam conditions with timed tests and multiple-choice questions.",
  },
  {
    icon: "📊",
    title: "Track Your Progress",
    description:
      "Review your performance, discover areas to improve and keep learning.",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#" className="shrink-0 text-lg font-black tracking-tight sm:text-xl">
            JAMB<span className="text-blue-600">Prep</span>
            <span className="ml-1 hidden text-xs font-medium text-slate-500 sm:inline">
              ASSESSMENT
            </span>
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#practice" className="transition hover:text-blue-600">
              Practice
            </a>
            <a href="#features" className="transition hover:text-blue-600">
              Features
            </a>
            <a href="#about" className="transition hover:text-blue-600">
              About
            </a>
          </div>

          <a
            href="#practice"
            className="shrink-0 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-5"
          >
            Start practising
          </a>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
        <div className="min-w-0">
          <span className="inline-flex rounded-full bg-blue-100 px-3 py-2 text-xs font-semibold text-blue-700 sm:px-4 sm:text-sm">
            Your preparation, your pace
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Prepare better.
            <span className="mt-1 block text-blue-600">
              Practise smarter.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
            Your space to prepare for JAMB, practise questions, take mock
            examinations and build the confidence you need for exam day.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#practice"
              className="flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 sm:w-auto"
            >
              Explore practice tests →
            </a>

            <a
              href="#features"
              className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold transition hover:bg-slate-100 sm:w-auto"
            >
              How it works
            </a>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-500">
            Learn at your pace. Practise as often as you need.
          </p>
        </div>

        <div className="min-w-0 rounded-3xl bg-blue-700 p-4 text-white shadow-lg sm:p-7 lg:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium tracking-wide text-blue-100 sm:text-sm">
                YOUR NEXT STEP
              </p>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                Ready to practise?
              </h2>
            </div>
            <span className="text-3xl sm:text-4xl" aria-hidden="true">
              🎯
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4 text-slate-900 sm:mt-8 sm:p-5">
            <p className="text-sm text-slate-500">Start with a simple goal</p>
            <h3 className="mt-2 text-lg font-bold sm:text-xl">
              One question at a time.
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Choose a practice test, work through the questions and learn
              from your results.
            </p>
            <a
              href="#practice"
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Find a practice test
            </a>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="min-w-0 rounded-xl bg-blue-600 p-3 sm:p-4">
              <p className="text-lg font-bold sm:text-xl">Learn</p>
              <p className="mt-1 text-xs leading-5 text-blue-100 sm:text-sm">
                Strengthen your knowledge
              </p>
            </div>
            <div className="min-w-0 rounded-xl bg-blue-600 p-3 sm:p-4">
              <p className="text-lg font-bold sm:text-xl">Improve</p>
              <p className="mt-1 text-xs leading-5 text-blue-100 sm:text-sm">
                Build exam confidence
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="practice"
        className="scroll-mt-20 border-y border-slate-200 bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 sm:text-sm">
              GET STARTED
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
              Find your next practice test
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Search for an assessment or explore the question library as
              we continue to add more subjects and question banks.
            </p>
          </div>

          <div className="mx-auto mt-7 max-w-xl">
            <label
              htmlFor="assessment-search"
              className="mb-2 block text-left text-sm font-semibold text-slate-700"
            >
              Search assessments
            </label>
            <input
              id="assessment-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search question banks..."
              className="min-h-12 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-center sm:p-8">
            <span className="text-4xl" aria-hidden="true">
              📚
            </span>
            <h3 className="mt-4 text-lg font-bold sm:text-xl">
              {search.trim()
                ? `Search for "${search.trim()}"`
                : "Your practice library starts here"}
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              {search.trim()
                ? "Your question library will appear here when we connect the uploaded question banks."
                : "We will connect your question banks here so students can choose assessments and begin practising."}
            </p>
            <span className="mt-4 inline-block rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:text-sm">
              Question library coming next
            </span>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 sm:text-sm">
              BUILT FOR YOUR PREPARATION
            </p>
            <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
              Everything starts with practice.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Build better study habits through regular practice and useful
              feedback.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:mt-9 sm:gap-5 md:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md sm:p-6"
              >
                <span className="text-3xl" aria-hidden="true">
                  {feature.icon}
                </span>
                <p className="mt-4 text-sm font-bold text-blue-600">
                  0{index + 1}
                </p>
                <h3 className="mt-2 text-lg font-bold sm:text-xl">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-20 bg-slate-900 px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black leading-tight sm:text-3xl">
              Your JAMB journey starts here.
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              Practise, learn from your mistakes and keep moving forward.
            </p>
          </div>
          <a
            href="#practice"
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-blue-50 sm:w-auto"
          >
            Start practising →
          </a>
        </div>
      </section>

      <footer className="bg-slate-950 px-4 py-6 text-center text-xs leading-6 text-slate-400 sm:text-sm">
        <span>JAMBPrep Assessment.</span>
        <span className="block sm:inline sm:ml-1">
          Built for better preparation.
        </span>
      </footer>
    </main>
  );
}
