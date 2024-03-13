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
  //   const correctness = useRef(Array.from({ length: 10 }, () => false));
  console.log(correctness);
  return (
    <div className={styles.wrapper}>
      <div>
        Question {index}:{" "}
        {question.split("\n").map((line, i) => {
          return <pre key={i}>{line}</pre>;
        })}
      </div>
      <div className={styles.answers}>
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
