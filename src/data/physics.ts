// Question bank for physics
import type { Question } from "./types";

export const questions: Question[] = [
  {
    id: "phy-001",
    subject: "Physics",
    topic: "Motion",
    question: "A car travels 150 m in 10 s. Calculate its average speed.",
    options: [
      { label: "A", text: "10 m/s" },
      { label: "B", text: "15 m/s" },
      { label: "C", text: "20 m/s" },
      { label: "D", text: "25 m/s" }
    ],
    correctAnswer: "B",
    explanation: "Average speed = distance/time = 150/10 = 15 m/s."
  },
  {
    id: "phy-002",
    subject: "Physics",
    topic: "Acceleration",
    question: "A body increases its velocity from 5 m/s to 25 m/s in 4 s. Find its acceleration.",
    options: [
      { label: "A", text: "4 m/s²" },
      { label: "B", text: "5 m/s²" },
      { label: "C", text: "6 m/s²" },
      { label: "D", text: "8 m/s²" }
    ],
    correctAnswer: "B",
    explanation: "Acceleration = (final velocity - initial velocity)/time = (25 - 5)/4 = 5 m/s²."
  },
  {
    id: "phy-003",
    subject: "Physics",
    topic: "Newton's Laws",
    question: "A net force of 12 N acts on a body of mass 3 kg. What is its acceleration?",
    options: [
      { label: "A", text: "2 m/s²" },
      { label: "B", text: "3 m/s²" },
      { label: "C", text: "4 m/s²" },
      { label: "D", text: "6 m/s²" }
    ],
    correctAnswer: "C",
    explanation: "Using F = ma, acceleration = F/m = 12/3 = 4 m/s²."
  },
  {
    id: "phy-004",
    subject: "Physics",
    topic: "Work and Energy",
    question: "A force of 20 N moves an object 5 m in the direction of the force. Calculate the work done.",
    options: [
      { label: "A", text: "4 J" },
      { label: "B", text: "25 J" },
      { label: "C", text: "100 J" },
      { label: "D", text: "200 J" }
    ],
    correctAnswer: "C",
    explanation: "Work done = force × displacement = 20 × 5 = 100 J."
  },
  {
    id: "phy-005",
    subject: "Physics",
    topic: "Power",
    question: "A machine does 600 J of work in 20 s. Calculate its power.",
    options: [
      { label: "A", text: "20 W" },
      { label: "B", text: "30 W" },
      { label: "C", text: "40 W" },
      { label: "D", text: "60 W" }
    ],
    correctAnswer: "B",
    explanation: "Power = work/time = 600/20 = 30 W."
  },
  {
    id: "phy-006",
    subject: "Physics",
    topic: "Momentum",
    question: "Calculate the momentum of a 4 kg body moving at 6 m/s.",
    options: [
      { label: "A", text: "10 kg m/s" },
      { label: "B", text: "20 kg m/s" },
      { label: "C", text: "24 kg m/s" },
      { label: "D", text: "30 kg m/s" }
    ],
    correctAnswer: "C",
    explanation: "Momentum = mass × velocity = 4 × 6 = 24 kg m/s."
  },
  {
    id: "phy-007",
    subject: "Physics",
    topic: "Gravitation",
    question: "What is the weight of a 5 kg object where gravitational acceleration is 10 m/s²?",
    options: [
      { label: "A", text: "0.5 N" },
      { label: "B", text: "5 N" },
      { label: "C", text: "15 N" },
      { label: "D", text: "50 N" }
    ],
    correctAnswer: "D",
    explanation: "Weight = mass × gravitational acceleration = 5 × 10 = 50 N."
  },
  {
    id: "phy-008",
    subject: "Physics",
    topic: "Density",
    question: "A substance has a mass of 240 g and a volume of 80 cm³. Find its density.",
    options: [
      { label: "A", text: "2 g/cm³" },
      { label: "B", text: "3 g/cm³" },
      { label: "C", text: "4 g/cm³" },
      { label: "D", text: "6 g/cm³" }
    ],
    correctAnswer: "B",
    explanation: "Density = mass/volume = 240/80 = 3 g/cm³."
  },
  {
    id: "phy-009",
    subject: "Physics",
    topic: "Pressure",
    question: "A force of 100 N acts normally on an area of 2 m². Calculate the pressure.",
    options: [
      { label: "A", text: "25 Pa" },
      { label: "B", text: "50 Pa" },
      { label: "C", text: "100 Pa" },
      { label: "D", text: "200 Pa" }
    ],
    correctAnswer: "B",
    explanation: "Pressure = force/area = 100/2 = 50 Pa."
  },
  {
    id: "phy-010",
    subject: "Physics",
    topic: "Heat",
    question: "How much heat is needed to raise the temperature of 2 kg of a substance of specific heat capacity 400 J kg⁻¹ K⁻¹ by 5 K?",
    options: [
      { label: "A", text: "400 J" },
      { label: "B", text: "1,000 J" },
      { label: "C", text: "2,000 J" },
      { label: "D", text: "4,000 J" }
    ],
    correctAnswer: "D",
    explanation: "Q = mcΔT = 2 × 400 × 5 = 4,000 J."
  },
  {
    id: "phy-011",
    subject: "Physics",
    topic: "Waves",
    question: "A wave has a frequency of 50 Hz and a wavelength of 4 m. Calculate its speed.",
    options: [
      { label: "A", text: "12.5 m/s" },
      { label: "B", text: "46 m/s" },
      { label: "C", text: "200 m/s" },
      { label: "D", text: "250 m/s" }
    ],
    correctAnswer: "C",
    explanation: "Wave speed = frequency × wavelength = 50 × 4 = 200 m/s."
  },
  {
    id: "phy-012",
    subject: "Physics",
    topic: "Sound",
    question: "Sound cannot travel through a vacuum because it requires _____.",
    options: [
      { label: "A", text: "a material medium" },
      { label: "B", text: "sunlight" },
      { label: "C", text: "a magnetic field" },
      { label: "D", text: "an electric current" }
    ],
    correctAnswer: "A",
    explanation: "Sound is a mechanical wave and needs particles in a medium to transmit vibrations."
  },
  {
    id: "phy-013",
    subject: "Physics",
    topic: "Reflection of Light",
    question: "The angle of incidence of a light ray on a plane mirror is 35°. What is the angle of reflection?",
    options: [
      { label: "A", text: "25°" },
      { label: "B", text: "35°" },
      { label: "C", text: "55°" },
      { label: "D", text: "70°" }
    ],
    correctAnswer: "B",
    explanation: "The law of reflection states that the angle of incidence equals the angle of reflection."
  },
  {
    id: "phy-014",
    subject: "Physics",
    topic: "Lenses",
    question: "An object is placed beyond 2F of a convex lens. Where is its image formed?",
    options: [
      { label: "A", text: "Between F and 2F on the opposite side" },
      { label: "B", text: "At infinity in every case" },
      { label: "C", text: "Between the lens and F on the same side" },
      { label: "D", text: "At 2F on the same side" }
    ],
    correctAnswer: "A",
    explanation: "For an object beyond 2F, a convex lens forms a real, inverted, diminished image between F and 2F on the opposite side."
  },
  {
    id: "phy-015",
    subject: "Physics",
    topic: "Electric Current",
    question: "A current of 2 A flows through a conductor for 30 s. Calculate the charge transferred.",
    options: [
      { label: "A", text: "15 C" },
      { label: "B", text: "30 C" },
      { label: "C", text: "60 C" },
      { label: "D", text: "90 C" }
    ],
    correctAnswer: "C",
    explanation: "Charge Q = It = 2 × 30 = 60 C."
  },
  {
    id: "phy-016",
    subject: "Physics",
    topic: "Ohm's Law",
    question: "A resistor of 6 Ω is connected across a 12 V supply. Find the current.",
    options: [
      { label: "A", text: "0.5 A" },
      { label: "B", text: "2 A" },
      { label: "C", text: "6 A" },
      { label: "D", text: "72 A" }
    ],
    correctAnswer: "B",
    explanation: "By Ohm's law, I = V/R = 12/6 = 2 A."
  },
  {
    id: "phy-017",
    subject: "Physics",
    topic: "Electrical Power",
    question: "An appliance operates at 240 V and draws a current of 3 A. Calculate its power.",
    options: [
      { label: "A", text: "80 W" },
      { label: "B", text: "243 W" },
      { label: "C", text: "720 W" },
      { label: "D", text: "960 W" }
    ],
    correctAnswer: "C",
    explanation: "Electrical power = voltage × current = 240 × 3 = 720 W."
  },
  {
    id: "phy-018",
    subject: "Physics",
    topic: "Magnetism",
    question: "Which material is commonly used to make the core of a temporary electromagnet?",
    options: [
      { label: "A", text: "Soft iron" },
      { label: "B", text: "Copper" },
      { label: "C", text: "Glass" },
      { label: "D", text: "Aluminium" }
    ],
    correctAnswer: "A",
    explanation: "Soft iron is easily magnetized and demagnetized, making it suitable for temporary electromagnets."
  },
  {
    id: "phy-019",
    subject: "Physics",
    topic: "Radioactivity",
    question: "Which of the following emissions has the greatest penetrating power?",
    options: [
      { label: "A", text: "Alpha particles" },
      { label: "B", text: "Beta particles" },
      { label: "C", text: "Gamma rays" },
      { label: "D", text: "Sound waves" }
    ],
    correctAnswer: "C",
    explanation: "Gamma rays generally have greater penetrating power than alpha and beta radiation."
  },
  {
    id: "phy-020",
    subject: "Physics",
    topic: "Simple Machines",
    question: "A machine lifts a load of 200 N using an effort of 50 N. Calculate its mechanical advantage.",
    options: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "4" },
      { label: "D", text: "5" }
    ],
    correctAnswer: "C",
    explanation: "Mechanical advantage = load/effort = 200/50 = 4."
  }
];
