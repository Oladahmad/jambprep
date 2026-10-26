
import type { Question } from "./types";

import { questions as englishQuestions } from "./use-of-english";
import { questions as mathematicsQuestions } from "./mathematics";
import { questions as chemistryQuestions } from "./chemistry";
import { questions as physicsQuestions } from "./physics";
import { questions as biologyQuestions } from "./biology";
import { questions as economicsQuestions } from "./economics";
import { questions as pythonQuestions } from "./python";

export const questionBanks: Record<string, Question[]> = {
  "Use of English": englishQuestions,
  Mathematics: mathematicsQuestions,
  Chemistry: chemistryQuestions,
  Physics: physicsQuestions,
  Biology: biologyQuestions,
  Economics: economicsQuestions,
  Python: pythonQuestions,
};

export const availableSubjects = Object.keys(questionBanks);

export function getQuestionsBySubject(subject: string): Question[] {
  return questionBanks[subject] ?? [];
}
