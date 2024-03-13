import { useState } from "react";
import McqAnswer from "./McqAnswer";
import styles from "./McqQuestion.module.css";
function McqQuestion({
  index,
  question,
  answers,
  correct,
  setCorrectness,
  result,
  correctness,
}) {
  return (
    <div className={result ? styles.resultWrapper : styles.wrapper}>
      <div className={result ? styles.resultQuestion : styles.question}>
        Question {index}:{" "}
        {question.split("\n").map((line, i) => {
          return <pre className={styles.questionLine} key={i}>{line}</pre>;
        })}
      </div>
      <div className={result ? styles.resultAnswers : styles.answers}>
        <McqAnswer
          result={result}
          questionIndex={index - 1}
          answers={answers}
          correctAnswer={correct}
          correctness={correctness}
          setCorrectness={setCorrectness}
        />
      </div>
    </div>
  );
}

export default McqQuestion;
