import { shuffleArray } from "./utils";

type Question = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};
// Add an answers array to the Question type to hold both the correct and incorrect answers
export type QuestionState = Question & { answers: string[] };

export type Difficulty = "easy" | "medium" | "hard";

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const res = await fetch(endpoint);
  const data = await res.json();
  // Map through the results array of questions and return an array with each question and the answers array which contains both the correct answer and the incorrect answers
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
