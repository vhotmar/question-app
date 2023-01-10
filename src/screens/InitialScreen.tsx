import React, { useState, useCallback } from "react";
import {
  CenterContainer,
  Container,
  ErrorContainer,
  GreenButton,
  Header,
  QuestionsInput,
} from "../components";
import { Question } from "../type";

export type InitialScreenProps = {
  setQuestions: (questions: Question[]) => void;
};

export const InitialScreen = ({ setQuestions }: InitialScreenProps) => {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const onChange = useCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(ev.target.value);
    },
    [setText]
  );

  const onClick = (text: string) => {
    const filtered = text
      .split("\n")
      .map((x) => x.trim())
      .filter((x) => x.length > 0)
      .map((x, i) => ({ text: x, id: i + 1, disabled: false }));

    if (filtered.length === 0) {
      setError("You have to enter at least one question");
      return;
    }

    setError(undefined);
    setQuestions(filtered);
  };

  return (
    <Container>
      <Header>Please enter questions (separated by newline)</Header>
      <QuestionsInput onChange={onChange} />
      {error != null ? <ErrorContainer>{error}</ErrorContainer> : null}
      <CenterContainer>
        <GreenButton
          onClick={() => {
            onClick(text);
          }}
        >
          Next
        </GreenButton>
      </CenterContainer>
    </Container>
  );
};
