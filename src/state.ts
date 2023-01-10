import * as R from "remeda";
import { MAX_LEVEL } from "./constants";
import { Question, Answer } from "./type";

export type ExtendedQuestionInformation = {
  question: Question;
  answers: Answer[];
  level: number;
  justFailed: boolean;
};

export const mapQuestions = (
  questions: Question[],
  answers: Answer[]
): ExtendedQuestionInformation[] => {
  const indexedAnswers = R.groupBy(answers, (item) => item.questionId);

  return questions.map((question) => {
    const { id } = question;
    const answers = indexedAnswers[id];

    if (answers == null)
      return { question, answers: [], level: 1, justFailed: false };

    const lastIndex = answers.length - 1;
    const lastStatus = answers[lastIndex].status;
    let lastStatusCount = 1;

    for (let i = lastIndex; i >= 0; i--) {
      if (answers[i].status !== lastStatus) break;

      lastStatusCount++;
    }

    return {
      question,
      answers,
      level: lastStatus === "correct" ? lastStatusCount : 1,
      justFailed: lastStatus === "wrong",
    };
  });
};

export function weightedRandom<T>(items: T[], weights: number[]) {
  if (items.length !== weights.length)
    throw new Error("Items and Weights have to have the same length");

  if (items.length === 0)
    throw new Error("At least one item has to be present");

  const sums: number[] = [weights[0]];

  for (let i = 1; i < weights.length; i++) {
    sums[i] = sums[i - 1] + weights[i];
  }

  const random = Math.random() * sums[sums.length - 1];

  for (let i = 0; i < sums.length; i++) {
    if (sums[i] > random) return items[i];
  }

  throw new Error("Something bad has happened");
}

export const chooseNextQuestion = (
  informations: ExtendedQuestionInformation[],
  answers: Answer[]
) => {
  const nonCompleted = informations.filter(
    (information) =>
      information.level < MAX_LEVEL && information.question.disabled !== true
  );

  const numberOfQuestionsToBeSkippedFromAnswers = Math.min(
    5,
    nonCompleted.length - 1
  );
  const answersFromIndex = Math.max(
    0,
    answers.length - numberOfQuestionsToBeSkippedFromAnswers
  );
  const questionsToBeSkipped = answers
    .slice(answersFromIndex, answers.length)
    .map((answer) => answer.questionId);

  const toBeChoosen = nonCompleted.filter(
    (information) =>
      questionsToBeSkipped.indexOf(information.question.id) === -1
  );
  const toBeChoosenWeights = toBeChoosen.map((information) => {
    if (information.justFailed) return nonCompleted.length / 2;

    return 1 / information.level;
  });

  return weightedRandom(toBeChoosen, toBeChoosenWeights);
};
