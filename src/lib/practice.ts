import { questionBanks } from "@/data";
import type { Question } from "@/data/types";

export const QUESTION_STEP = 10;
export const SECONDS_PER_QUESTION = 60;

export type PracticeQuestion = {
  id: string;
  subject: string;
  topic: string;
  text: string;
  options: string[];
  answer: number;
  explanation: string;
};

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function toPracticeQuestion(question: Question, subject: string): PracticeQuestion {
  return {
    id: `${subject}:${question.id}`,
    subject,
    topic: question.topic,
    text: question.question,
    options: question.options.map((option) => option.text),
    answer: question.options.findIndex((option) => option.label === question.correctAnswer),
    explanation: question.explanation,
  };
}

export function getMaximumQuestionCount(subject: string): number {
  return Math.floor((questionBanks[subject]?.length ?? 0) / QUESTION_STEP) * QUESTION_STEP;
}

export function getPracticeQuestions(subject: string, count: number): PracticeQuestion[] {
  return shuffle(questionBanks[subject] ?? [])
    .slice(0, count)
    .map((question) => toPracticeQuestion(question, subject));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} minute${minutes === 1 ? "" : "s"}`;
}
