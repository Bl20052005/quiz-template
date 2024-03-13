import { React } from "react";
import styles from "./McqAnswer.module.css";
function McqAnswer({
  answers,
  correctAnswer,
  setCorrectness,
  correctness,
  questionIndex,
  result,
}) {
  function setCorrectnessWithIndex(correct, index) {
    setCorrectness((correctness) => {
      return [
        ...correctness.slice(0, index),
        correct,
        ...correctness.slice(index + 1),
      ];
    });
  }

  function handleOnClick(index, ans) {
    if (ans == correctAnswer) {
      setCorrectnessWithIndex([true, index], questionIndex);
    } else {
      setCorrectnessWithIndex([false, index], questionIndex);
    }
  }

  if (result) {
    let correctIndex = -1;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] == correctAnswer) {
        correctIndex = i;
      }
    }
    let correct = correctIndex == result[1];
    return (
      <div className={styles.wrapper}>
        <div className={styles.option}>
          <div>
            {correct
              ? "Correct!"
              : result[1] == -1
              ? "No choice."
              : "Incorrect!"}
          </div>
          <div className={styles.answerContainer}>
            {answers.map((ans, i) => {
              return (
                <div
                  key={ans}
                  className={
                    ans == correctAnswer
                      ? `${styles.correctAnswer} ${styles.answer}`
                      : i == result[1]
                      ? `${styles.incorrectAnswer} ${styles.answer}`
                      : styles.answer
                  }
                >
                  {ans.split("\n").map((line, i) => {
                    return (
                      <pre className={styles.answerLine} key={i}>
                        {line}
                      </pre>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return answers.map((ans, i) => {
    return (
      <div
        className={
          correctness.length > 0
            ? correctness[questionIndex][1] == i
              ? `${styles.answer} ${styles.selected}`
              : styles.answer
            : styles.answer
        }
        key={ans}
        onClick={() => handleOnClick(i, ans)}
      >
        {ans.split("\n").map((line, i) => {
          return (
            <pre className={styles.answerLine} key={i}>
              {line}
            </pre>
          );
        })}
      </div>
    );
  });
}

export default McqAnswer;
