import { useState } from "react";
// STYLES
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import ReplayIcon from "@material-ui/icons/Replay";
import {
  withStyles,
  makeStyles,
  createStyles,
  Theme,
} from "@material-ui/core/styles";
// Animations and Transitions
import { Fade } from "react-awesome-reveal";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";
// API
import { Difficulty, fetchQuizQuestions, QuestionState } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
import SelectForm from "./components/SelectForm";
import Score from "./components/Score";

// User Answer type
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  // Initialize number with 0, so it can be used to access the contents of the questions array[]
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // Handle onChange for the question and difficulty selections
  const handleQuestionChange = (e: React.ChangeEvent<{ value: unknown }>) =>
    setTotalQuestions(e.target.value as number);
  const handleDifficultyChange = (e: React.ChangeEvent<{ value: unknown }>) =>
    setDifficulty(e.target.value as Difficulty);

  // Start the game
  const startTrivia = async () => {
    setGameOver(false);
    setScore(0);
    setLoading(true);
    const newQuestions = await fetchQuizQuestions(totalQuestions, difficulty);
    try {
      setQuestions(newQuestions);
    } catch (error) {
      console.error(error);
    }
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // Click button to choose an answer
  const chooseAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    // User's answer
    const answer = e.currentTarget.value;
    // Check user's answer against correct answer
    const correct = questions[number].correct_answer === answer ? true : false;
    // Add score if answer is correct
    if (correct) setScore(prev => prev + 1);
    // Save answer in the array for user answers
    const answerObject = {
      question: questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject]);
  };

  // Click next question button
  const nextQuestion = () => {
    // Move on to the next question
    const nextQuestion = number + 1;
    setNumber(nextQuestion);
  };
  // Click restart button
  const restart = () => setGameOver(true);

  // STYLES
  const ActionButton = withStyles((theme: Theme) => ({
    root: {
      color: "#fff",
      fontSize: "1.1rem",
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: "#303f9f",
      "&:hover": {
        backgroundColor: "#001970",
      },
      // @media(max-width: 600px)
      [theme.breakpoints.down(600)]: {
        fontSize: "0.9rem",
      },
    },
  }))(Button);
  // restart button style
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        background: "#ffa733",
        color: "#fff",
        "&:hover": {
          background: "#ff9100",
        },
      },
    })
  );
  const classes = useStyles();
  // Animations
  const customSlideOne = keyframes`
  from {
    opacity: 0;
     transform: translate3d(0, -10%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  const customSlideTwo = keyframes`
  from {
    opacity: 0;
     transform: translate3d(0, -20%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;
  return (
    <>
      <h1>
        <LibraryBooksIcon fontSize="inherit" style={{ marginRight: "7px" }} />{" "}
        QUIZ
      </h1>
      <div className="container">
        {/* Render if the game is over or hasn't started */}
        {gameOver && (
          <>
            <Fade delay={1000} duration={500}>
              <h3>
                Welcome to this Trivia Quiz app! To begin, choose the number of
                questions and the difficulty:
              </h3>
            </Fade>
            <Reveal keyframes={customSlideOne} delay={2500} duration={500}>
              <SelectForm
                totalQuestions={totalQuestions}
                difficulty={difficulty}
                handleQuestionChange={handleQuestionChange}
                handleDifficultyChange={handleDifficultyChange}
              />
            </Reveal>
            <Reveal keyframes={customSlideTwo} delay={3500} duration={500}>
              <ActionButton size="large" onClick={startTrivia}>
                Start
              </ActionButton>
            </Reveal>
          </>
        )}
        {/* Render the score if the game is not over, i.e the game has started */}
        {!gameOver && (
          <Fade duration={1000}>
            <Score score={score} />
          </Fade>
        )}
        {/* Render the loading animation if loading is true */}
        {loading && <CircularProgress />}
        {/* Render the questions if loading is false and the game is not over(i.e it has started) */}
        {!loading && !gameOver ? (
          <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            chooseAnswer={chooseAnswer}
            userAnswer={userAnswers ? userAnswers[number] : null}
            questionNo={number + 1}
            totalQuestions={totalQuestions}
          />
        ) : null}
        {/* Render the next question button if:
      loading is false,
      the game is not over(i.e it has started),
      the user has chosen an answer (i.e, the length of the answers array is equal to the value of the current question(number+1)) and
      the current question (number+1) is not equal to the total questions (i.e NOT on the last question)
      */}
        {!loading &&
        !gameOver &&
        userAnswers.length === number + 1 &&
        number + 1 !== totalQuestions ? (
          <Fade duration={500}>
            <ActionButton size="large" onClick={nextQuestion}>
              Next Question
            </ActionButton>
          </Fade>
        ) : null}
        {/* Render if not loading, game has started and the amount of total questions is equal to the amount of answered questions... i.e (10===10 if the user has finished the game for example) */}
        {!loading && !gameOver && userAnswers.length === totalQuestions ? (
          <>
            <Fade duration={1000}>
              <p
                style={{
                  fontSize: "0.9rem",
                  marginBottom: "10px",
                  fontWeight: 700,
                  color: "#303f9f",
                }}
              >
                You scored: {score}
              </p>
            </Fade>
            <Reveal keyframes={customSlideTwo} delay={1000} duration={500}>
              <ActionButton
                className={classes.root}
                size="large"
                onClick={restart}
              >
                <ReplayIcon fontSize="small" style={{ marginRight: "5px" }} />{" "}
                Restart
              </ActionButton>
            </Reveal>
          </>
        ) : null}
      </div>
      {/* Render footer if game has not started or the game is over*/}
      {gameOver && (
        <footer>
          &copy; Copyright {new Date().getFullYear()} | Created by ViaxCo
        </footer>
      )}
    </>
  );
};

export default App;
