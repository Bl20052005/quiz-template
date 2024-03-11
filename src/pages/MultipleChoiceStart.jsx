import styles from "./MultipleChoiceStart.module.css";
import ChangeButton from "../components/ChangeButton";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function MultipleChoiceStart() {
  const [num, setNum] = useState(10);
  const [time, setTime] = useState("unlimited");

  function handleSetNum(e) {
    if (
      !e.target.value ||
      (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 100)
    ) {
      setNum(e.target.value);
    }
  }

  function handleChangeTime(t) {
    setTime(t);
  }

  return (
    <div>
      <label htmlFor="questions">How many questions (1-100)</label>
      <input
        type="number"
        id="questions"
        name="questions"
        min="1"
        max="100"
        value={num}
        onChange={(e) => handleSetNum(e)}
      />
      <div>time for each question:</div>
      <div onClick={() => handleChangeTime(15)}>15 seconds</div>
      <div onClick={() => handleChangeTime(30)}>30 seconds</div>
      <div onClick={() => handleChangeTime(60)}>1 minute</div>
      <div onClick={() => handleChangeTime(120)}>2 minutes</div>
      <div onClick={() => handleChangeTime("unlimited")}>unlimited time</div>
      <ChangeButton
        to={`quiz/${num ? num : 10}/${
          time != "unlimited" ? time * (num ? num : 10) : "unlimited"
        }`}
        text="continue"
      />
      <ChangeButton to=".." text="back" />
      <Outlet />
    </div>
  );
}

export default MultipleChoiceStart;
