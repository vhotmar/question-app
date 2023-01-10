export type Question = {
  text: string;
  id: number;
  disabled: boolean;
};

export type AnswerStatus = "wrong" | "correct";

export type Answer = {
  id: number;
  questionId: number;
  status: "wrong" | "correct";
};
