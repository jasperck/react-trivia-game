import quizzes from "./quizzes";

export const getRandomQuiz = () => quizzes[~~(Math.random() * quizzes.length)];
