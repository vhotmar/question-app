import {
  AnswersContainer,
  BlueChecker,
  CenterContainer,
  Container,
  GreenButton,
  GreenChecker,
  GreyChecker,
  Header,
  ItemCheckerContainer,
  ItemTextContainer,
  RedButton,
  RedChecker,
  RowContainer,
} from "../components";
import { ExtendedQuestionInformation } from "../state";

export type QuestionsScreenProps = {
  questions: ExtendedQuestionInformation[];
  currentQuestion: number;
  onToggle: (questionId: number) => void;
  onCorrect: (questionId: number) => void;
  onWrong: (questionId: number) => void;
};

export const QuestionsScreen = ({
  questions,
  currentQuestion,
  onToggle,
  onCorrect,
  onWrong,
}: QuestionsScreenProps) => {
  const displayed = questions.find(
    ({ question }) => question.id === currentQuestion
  );

  return (
    <Container>
      <Header>{displayed?.question.text}</Header>
      <CenterContainer>
        <GreenButton onClick={() => onCorrect(currentQuestion)}>OK</GreenButton>
        <RedButton onClick={() => onWrong(currentQuestion)}>FUCK</RedButton>
      </CenterContainer>
      <AnswersContainer>
        {questions.map((question) => (
          <RowContainer>
            <ItemCheckerContainer>
              <div
                onClick={() => onToggle(question.question.id)}
                style={{ marginRight: 10 }}
              >
                {question.question.disabled === true ? (
                  <BlueChecker />
                ) : (
                  <GreyChecker />
                )}
              </div>
            </ItemCheckerContainer>
            <ItemTextContainer>{question.question.text}</ItemTextContainer>
            <ItemCheckerContainer>
              {question.answers.map((answer) =>
                answer.status === "correct" ? <GreenChecker /> : <RedChecker />
              )}
            </ItemCheckerContainer>
          </RowContainer>
        ))}
      </AnswersContainer>
    </Container>
  );
};
