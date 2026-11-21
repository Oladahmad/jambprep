
export type QuestionOption = {
  label: "A" | "B" | "C" | "D" | "E";
  text: string;
};

export type Question = {
  id: string;
  subject: string;
  topic: string;
  question: string;
  options: QuestionOption[];
  correctAnswer: "A" | "B" | "C" | "D" | "E";
  explanation: string;
};
