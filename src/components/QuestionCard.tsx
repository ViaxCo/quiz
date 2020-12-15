import { AnswerObject } from "../App";
import { AnswerButtonWrapper } from "../styles/QuestionCard.styles";
// STYLES
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
// Animations and Transitions
import { pulse } from "react-animations";
import { shake } from "../utils";
import styled, { css, keyframes } from "styled-components";

// Props types for the component
type Props = {
  question: string;
  answers: string[];
  chooseAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | null;
  questionNo: number;
  totalQuestions: number;
};

// STYLES
const CustomCard = withStyles(() => ({
  root: {
    maxWidth: "500px",
  },
}))(Card);
const AnswerButton = withStyles(() => ({
  root: {
    textTransform: "none",
    fontFamily: "'Poppins', sans-serif",
    width: "100%",
  },
}))(Button);
// Animations
const shakeAnimation = keyframes`${shake}`;
const pulseAnimation = keyframes`${pulse}`;
interface ShakeOrPulseProps {
  correct?: boolean;
}
const ShakeOrPulse = styled.div<ShakeOrPulseProps>`
  animation: ${({ correct }) =>
    correct === true
      ? css`1s ${pulseAnimation}`
      : correct === false
      ? css`1s ${shakeAnimation}`
      : "none"};
  ${
    /* The last "none" is for when correct===undefined (i.e No answer has been chosen) */ ""
  }
`;

const QuestionCard = ({
  question,
  answers,
  chooseAnswer,
  userAnswer,
  questionNo,
  totalQuestions,
}: Props) => {
  return (
    <ShakeOrPulse correct={userAnswer?.correct}>
      <CustomCard className="card">
        <p className="number">
          Question: {questionNo}/{totalQuestions}
        </p>
        <p
          dangerouslySetInnerHTML={{ __html: question }}
          className="question"
        />
        {answers.map(answer => {
          return (
            <AnswerButtonWrapper
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
              key={answer}
            >
              <AnswerButton
                className="answer-button"
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={chooseAnswer}
                size="large"
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </AnswerButton>
              <Divider />
            </AnswerButtonWrapper>
          );
        })}
      </CustomCard>
    </ShakeOrPulse>
  );
};

export default QuestionCard;
