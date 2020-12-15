import { useEffect, useRef } from "react";
// Animations and Transitions
import { pulse } from "react-animations";
import styled, { css, keyframes } from "styled-components";

// Props types for the component
type Props = {
  score: number;
};
// Custom pulse animation
const pulseAnimation = keyframes`${pulse}`;
interface PulseProps {
  scoreChanged?: boolean;
}
const Pulse = styled.div<PulseProps>`
  ${({ scoreChanged }) =>
    scoreChanged &&
    css`
      animation: 1s ${pulseAnimation};
    `}
`;

const Score = ({ score }: Props) => {
  const prevScore = usePrevious(score);
  return (
    <Pulse scoreChanged={prevScore !== score}>
      <p className="score">Score: {score}</p>
    </Pulse>
  );
};

// Get previous value of props
const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export default Score;
