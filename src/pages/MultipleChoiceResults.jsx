import { Link, useOutletContext } from "react-router-dom";
import McqQuestion from "../components/McqQuestion";
import styles from "./MultipleChoiceResults.module.css";
import ChangeButton from "../components/ChangeButton";

function MutipleChoiceResults() {
  const [correctness, mcqs, setIsResult, initialize] = useOutletContext();
  let score = correctness.reduce((prev, cur) => (cur[0] ? prev + 1 : prev), 0);

  function handleReset() {
    setIsResult(false);
    initialize();
  }

  return (
    <div className={styles.wrapper}>
      {mcqs.map((question, i) => {
        return (
          <McqQuestion
            index={i + 1}
            key={i}
            result={correctness[i]}
            question={question.question}
            answers={question.answers}
            correct={question.correctAnswer}
            setCorrectness={"setCorrectness"}
          />
        );
      })}
      <div className={styles.score}>
        Score: {score} / {mcqs.length} (
        {Math.round((score / mcqs.length) * 100)}%)
      </div>
      <div className={styles.scoreCommentary}>
        {(score / mcqs.length) * 100 == 100
          ? "Amazing! Perfect Score❣️❣️"
          : (score / mcqs.length) * 100 > 90
          ? "Wonderful score!"
          : (score / mcqs.length) * 100 > 70
          ? "Pretty good score!"
          : (score / mcqs.length) * 100 > 50
          ? "Keep on trying, you got this!"
          : (score / mcqs.length) * 100 > 20
          ? "We may need some work, but I know we can do it!"
          : "Bit of review can't hurt, can it? :)"}
      </div>
      <div className={styles.buttons}>
        <Link to="..">
          <button className={styles.resetButton} onClick={handleReset}>
            Try Again?
          </button>
        </Link>
        <ChangeButton to="../.." text="Back to MCQ" />
      </div>
    </div>
  );
}

export default MutipleChoiceResults;
