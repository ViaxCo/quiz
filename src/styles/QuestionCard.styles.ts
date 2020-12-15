import styled from "styled-components";

interface AnswerButtonWrapperProps {
  correct: boolean;
  userClicked: boolean;
}

export const AnswerButtonWrapper = styled.div<AnswerButtonWrapperProps>`
  width: 100%;

  .answer-button {
    background: ${({ correct, userClicked }) =>
      correct
        ? "#2e7d32" //green
        : !correct && userClicked
        ? "#d32f2f" //red
        : "#fff"};
    color: ${({ correct, userClicked }) =>
      correct ? "#fff" : !correct && userClicked ? "#fff" : "#333"};
  }
  .answer-button:hover {
    background: #f5f5f5;
    @media (hover: none) {
      color: ${({ correct, userClicked }) =>
        correct ? "#fff" : !correct && userClicked ? "#fff" : "#333"};
      background: ${({ correct, userClicked }) =>
        correct
          ? "#2e7d32" //green
          : !correct && userClicked
          ? "#d32f2f" //red
          : "#fff"};
    }
  }
`;
