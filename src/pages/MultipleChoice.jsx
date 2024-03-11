import ChangeButton from "../components/ChangeButton";
import styles from "./MultipleChoice.module.css";
import python_mcq from "../../data/python_mcq.json";
import McqQuestion from "../components/McqQuestion";
import { useEffect, useState } from "react";
import { Link, Outlet, useParams, redirect } from "react-router-dom";

function MultipleChoice() {
  const [mcqs, setMcqs] = useState([]);
  const [correctness, setCorrectness] = useState(
    Array.from({ length: 10 }, () => [false, -1])
  );
  const [isResult, setIsResult] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [curTime, setCurTime] = useState("unlimited");
  const { qs, time } = useParams();
  console.log(qs, time);

  function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
      let random = i + Math.floor(Math.random() * (arr.length - i));
      let temp = arr[i];
      arr[i] = arr[random];
      arr[random] = temp;
    }
  }

  function get_random() {
    shuffle(python_mcq);
    return python_mcq.slice(0, qs);
  }

  function setupInterval() {
    setIntervalId(
      setInterval(() => {
        setCurTime((curTime) => {
          return curTime - 1;
        });
      }, 1000)
    );
  }

  function initialize() {
    clearInterval(intervalId);
    setCurTime(time == "umlimited" ? "umlimited" : parseInt(time));
    if (time != "umlimited") setupInterval();
    setCurrentQuestion(0);
    setCorrectness(Array.from({ length: qs }, () => [false, -1]));
    let sliced_mcq = get_random();
    for (let i = 0; i < sliced_mcq.length; i++) {
      shuffle(sliced_mcq[i].answers);
    }
    setMcqs(sliced_mcq);
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (curTime != "unlimitedc" && curTime <= 0) {
      setIntervalId((intervalId) => {
        clearInterval(intervalId);
        return intervalId;
      });
      setIsResult(true);
      document.getElementById("submitButton").click();
    }
  }, [curTime]);

  function handleBackQuestion() {
    setCurrentQuestion((currentQuestion) => {
      if (currentQuestion > 0) {
        return currentQuestion - 1;
      } else {
        return currentQuestion;
      }
    });
  }

  function handleForwardQuestion() {
    setCurrentQuestion((currentQuestion) => {
      if (currentQuestion < mcqs.length - 1) {
        return currentQuestion + 1;
      } else {
        return currentQuestion;
      }
    });
  }

  if (isResult) {
    console.log(isResult);
    return <Outlet context={[correctness, mcqs, setIsResult, initialize]} />;
  }
  return (
    <div>
      <Link to="..">
        <button>Back</button>
      </Link>
      <div>
        {time != "unlimited"
          ? curTime % 60 < 10
            ? `${Math.floor(curTime / 60)}:0${curTime % 60}`
            : `${Math.floor(curTime / 60)}:${curTime % 60}`
          : ""}
      </div>
      <button onClick={handleBackQuestion}>&larr;</button>
      {mcqs.length > 0 ? (
        <McqQuestion
          index={currentQuestion + 1}
          result={null}
          question={mcqs[currentQuestion].question}
          answers={mcqs[currentQuestion].answers}
          correct={mcqs[currentQuestion].correctAnswer}
          correctness={correctness}
          setCorrectness={setCorrectness}
        />
      ) : null}
      <button onClick={handleForwardQuestion}>&rarr;</button>
      {currentQuestion == mcqs.length - 1 ? (
        <Link to="results">
          <button
            id="submitButton"
            onClick={() => {
              setIsResult(true);
              setIntervalId((intervalId) => {
                clearInterval(intervalId);
                return intervalId;
              });
            }}
          >
            Submit
          </button>
        </Link>
      ) : null}
    </div>
  );
}

export default MultipleChoice;
