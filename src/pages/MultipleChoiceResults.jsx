import { Link, useOutletContext } from "react-router-dom";
import McqQuestion from "../components/McqQuestion";
import styles from './MultipleChoiceResults.module.css'

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
      <div>
        Score: {score} / {mcqs.length} (
        {Math.round((score / mcqs.length) * 100)}%)
      </div>
      <Link to="..">
        <button onClick={handleReset}>Try Again?</button>
      </Link>
    </div>
  );
}

export default MutipleChoiceResults;
