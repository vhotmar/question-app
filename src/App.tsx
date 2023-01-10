import { useState } from "react";
import { InitialScreen } from "./screens/InitialScreen";
import { QuestionsScreen } from "./screens/QuestionsScreen";
import { chooseNextQuestion, mapQuestions } from "./state";
import { Answer, AnswerStatus, Question } from "./type";

type AppState = {
  state: "INITIAL" | "SESSION";
  questions: Question[];
  answers: Answer[];
  currentQuestion: undefined | number;
};

const INITIAL_STATE: AppState = {
  state: "INITIAL",
  questions: [],
  answers: [],
  currentQuestion: undefined,
};

const useAppState = () => {
  const [state, setState] = useState(INITIAL_STATE);

  const setQuestions = (questions: Question[]) =>
    setState(({ state, ...rest }) => ({
      ...rest,
      state: "SESSION",
      questions,
      currentQuestion: chooseNextQuestion(mapQuestions(questions, []), [])
        .question.id,
    }));

  const addAnswer = (questionId: number, status: AnswerStatus) =>
    setState((state) => {
      const newAnswers = [
        ...state.answers,
        { id: state.answers.length + 1, questionId, status },
      ];

      return {
        ...state,
        answers: newAnswers,
        currentQuestion: chooseNextQuestion(
          mapQuestions(state.questions, newAnswers),
          newAnswers
        ).question.id,
      };
    });

  const toggleQuestion = (questionId: number) =>
    setState((state) => ({
      ...state,
      questions: state.questions.map((question) =>
        question.id === questionId
          ? {
              ...question,
              disabled: !question.disabled,
            }
          : question
      ),
    }));

  return { state, setQuestions, addAnswer, toggleQuestion };
};

export default function App() {
  const { state, setQuestions, addAnswer, toggleQuestion } = useAppState();

  const mappedQuestions = mapQuestions(state.questions, state.answers);
  const correct = (questionId: number) => addAnswer(questionId, "correct");
  const wrong = (questionId: number) => addAnswer(questionId, "wrong");
  const toggle = toggleQuestion;

  if (state.state === "INITIAL") {
    return <InitialScreen setQuestions={setQuestions} />;
  }

  return (
    <QuestionsScreen
      questions={mappedQuestions}
      currentQuestion={state.currentQuestion ?? -1}
      onToggle={toggle}
      onCorrect={correct}
      onWrong={wrong}
    />
  );
}
