// Question bank for mathematics
import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "math-001",
    subject: "Mathematics",
    topic: "Algebra",
    question: "Solve for x: 3x - 7 = 14.",
    options: [
      { label: "A", text: "5" },
      { label: "B", text: "6" },
      { label: "C", text: "7" },
      { label: "D", text: "8" }
    ],
    correctAnswer: "C",
    explanation: "3x - 7 = 14 gives 3x = 21, so x = 7."
  },
  {
    id: "math-002",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    question: "Find the roots of x² - 5x + 6 = 0.",
    options: [
      { label: "A", text: "1 and 6" },
      { label: "B", text: "2 and 3" },
      { label: "C", text: "-2 and -3" },
      { label: "D", text: "2 and -3" }
    ],
    correctAnswer: "B",
    explanation: "Factorize as (x - 2)(x - 3) = 0. Hence x = 2 or x = 3."
  },
  {
    id: "math-003",
    subject: "Mathematics",
    topic: "Indices",
    question: "Simplify 2³ × 2⁴.",
    options: [
      { label: "A", text: "2⁷" },
      { label: "B", text: "2¹²" },
      { label: "C", text: "4⁷" },
      { label: "D", text: "2¹" }
    ],
    correctAnswer: "A",
    explanation: "When multiplying powers with the same base, add the indices: 3 + 4 = 7."
  },
  {
    id: "math-004",
    subject: "Mathematics",
    topic: "Logarithms",
    question: "Evaluate log₁₀ 1000.",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "10" },
      { label: "D", text: "100" }
    ],
    correctAnswer: "B",
    explanation: "Since 10³ = 1000, log₁₀ 1000 = 3."
  },
  {
    id: "math-005",
    subject: "Mathematics",
    topic: "Fractions",
    question: "Evaluate 3/4 + 2/3.",
    options: [
      { label: "A", text: "5/7" },
      { label: "B", text: "17/12" },
      { label: "C", text: "6/7" },
      { label: "D", text: "7/12" }
    ],
    correctAnswer: "B",
    explanation: "Using denominator 12, 3/4 = 9/12 and 2/3 = 8/12. Their sum is 17/12."
  },
  {
    id: "math-006",
    subject: "Mathematics",
    topic: "Percentages",
    question: "A bag costs ₦8,000. If its price is reduced by 15%, what is the new price?",
    options: [
      { label: "A", text: "₦6,500" },
      { label: "B", text: "₦6,800" },
      { label: "C", text: "₦7,200" },
      { label: "D", text: "₦7,600" }
    ],
    correctAnswer: "B",
    explanation: "15% of ₦8,000 is ₦1,200. New price = ₦8,000 - ₦1,200 = ₦6,800."
  },
  {
    id: "math-007",
    subject: "Mathematics",
    topic: "Ratio",
    question: "Divide ₦360 in the ratio 2:3.",
    options: [
      { label: "A", text: "₦120 and ₦240" },
      { label: "B", text: "₦144 and ₦216" },
      { label: "C", text: "₦150 and ₦210" },
      { label: "D", text: "₦180 and ₦180" }
    ],
    correctAnswer: "B",
    explanation: "Total parts = 5. One part = ₦360/5 = ₦72. The shares are ₦144 and ₦216."
  },
  {
    id: "math-008",
    subject: "Mathematics",
    topic: "Simultaneous Equations",
    question: "If x + y = 9 and x - y = 3, find x.",
    options: [
      { label: "A", text: "3" },
      { label: "B", text: "4" },
      { label: "C", text: "6" },
      { label: "D", text: "9" }
    ],
    correctAnswer: "C",
    explanation: "Adding the equations gives 2x = 12, so x = 6."
  },
  {
    id: "math-009",
    subject: "Mathematics",
    topic: "Geometry",
    question: "The angles of a triangle are x, 2x and 3x. Find the largest angle.",
    options: [
      { label: "A", text: "30°" },
      { label: "B", text: "60°" },
      { label: "C", text: "90°" },
      { label: "D", text: "120°" }
    ],
    correctAnswer: "C",
    explanation: "x + 2x + 3x = 180°, so x = 30°. The largest angle is 3x = 90°."
  },
  {
    id: "math-010",
    subject: "Mathematics",
    topic: "Mensuration",
    question: "Find the area of a circle of radius 7 cm. Use π = 22/7.",
    options: [
      { label: "A", text: "44 cm²" },
      { label: "B", text: "88 cm²" },
      { label: "C", text: "154 cm²" },
      { label: "D", text: "308 cm²" }
    ],
    correctAnswer: "C",
    explanation: "Area = πr² = (22/7) × 7 × 7 = 154 cm²."
  },
  {
    id: "math-011",
    subject: "Mathematics",
    topic: "Trigonometry",
    question: "In a right-angled triangle, the opposite side to angle θ is 3 cm and the hypotenuse is 5 cm. Find sin θ.",
    options: [
      { label: "A", text: "3/5" },
      { label: "B", text: "4/5" },
      { label: "C", text: "3/4" },
      { label: "D", text: "5/3" }
    ],
    correctAnswer: "A",
    explanation: "Sine = opposite/hypotenuse = 3/5."
  },
  {
    id: "math-012",
    subject: "Mathematics",
    topic: "Sequences",
    question: "Find the 10th term of the arithmetic sequence 4, 7, 10, 13, ...",
    options: [
      { label: "A", text: "28" },
      { label: "B", text: "30" },
      { label: "C", text: "31" },
      { label: "D", text: "34" }
    ],
    correctAnswer: "C",
    explanation: "The first term is 4 and the common difference is 3. T₁₀ = 4 + 9(3) = 31."
  },
  {
    id: "math-013",
    subject: "Mathematics",
    topic: "Probability",
    question: "A fair die is rolled once. What is the probability of obtaining an even number?",
    options: [
      { label: "A", text: "1/6" },
      { label: "B", text: "1/3" },
      { label: "C", text: "1/2" },
      { label: "D", text: "2/3" }
    ],
    correctAnswer: "C",
    explanation: "The even outcomes are 2, 4 and 6. Probability = 3/6 = 1/2."
  },
  {
    id: "math-014",
    subject: "Mathematics",
    topic: "Statistics",
    question: "Find the mean of 4, 6, 8, 10 and 12.",
    options: [
      { label: "A", text: "6" },
      { label: "B", text: "7" },
      { label: "C", text: "8" },
      { label: "D", text: "10" }
    ],
    correctAnswer: "C",
    explanation: "The sum is 40. Mean = 40/5 = 8."
  },
  {
    id: "math-015",
    subject: "Mathematics",
    topic: "Sets",
    question: "If A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, find A ∩ B.",
    options: [
      { label: "A", text: "{1, 2}" },
      { label: "B", text: "{3, 4}" },
      { label: "C", text: "{1, 2, 5, 6}" },
      { label: "D", text: "{1, 2, 3, 4, 5, 6}" }
    ],
    correctAnswer: "B",
    explanation: "The intersection contains elements common to both sets: 3 and 4."
  },
  {
    id: "math-016",
    subject: "Mathematics",
    topic: "Variation",
    question: "If y varies directly as x and y = 15 when x = 3, find y when x = 7.",
    options: [
      { label: "A", text: "21" },
      { label: "B", text: "30" },
      { label: "C", text: "35" },
      { label: "D", text: "45" }
    ],
    correctAnswer: "C",
    explanation: "Since y = kx, k = 15/3 = 5. When x = 7, y = 5 × 7 = 35."
  },
  {
    id: "math-017",
    subject: "Mathematics",
    topic: "Coordinate Geometry",
    question: "Find the gradient of the line passing through (2, 3) and (6, 11).",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "4" },
      { label: "D", text: "8" }
    ],
    correctAnswer: "A",
    explanation: "Gradient = (11 - 3)/(6 - 2) = 8/4 = 2."
  },
  {
    id: "math-018",
    subject: "Mathematics",
    topic: "Surds",
    question: "Simplify √50.",
    options: [
      { label: "A", text: "2√5" },
      { label: "B", text: "5√2" },
      { label: "C", text: "10√5" },
      { label: "D", text: "25√2" }
    ],
    correctAnswer: "B",
    explanation: "√50 = √(25 × 2) = 5√2."
  },
  {
    id: "math-019",
    subject: "Mathematics",
    topic: "Matrices",
    question: "Given A = [[1, 2], [3, 4]], find the determinant of A.",
    options: [
      { label: "A", text: "-2" },
      { label: "B", text: "2" },
      { label: "C", text: "5" },
      { label: "D", text: "10" }
    ],
    correctAnswer: "A",
    explanation: "For a 2 × 2 matrix, determinant = ad - bc = (1 × 4) - (2 × 3) = -2."
  },
  {
    id: "math-020",
    subject: "Mathematics",
    topic: "Simple Interest",
    question: "Find the simple interest on ₦20,000 at 5% per annum for 3 years.",
    options: [
      { label: "A", text: "₦1,000" },
      { label: "B", text: "₦2,000" },
      { label: "C", text: "₦3,000" },
      { label: "D", text: "₦5,000" }
    ],
    correctAnswer: "C",
    explanation: "Simple interest = PRT/100 = (20,000 × 5 × 3)/100 = ₦3,000."
  }
];
