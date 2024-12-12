import styles from "./MultipleChoiceStart.module.css";
import ChangeButton from "../components/ChangeButton";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

function MultipleChoiceStart() {
  const [num, setNum] = useState(10);
  const [time, setTime] = useState("unlimited");
  const [selected, setSelected] = useState(4);

  function handleSetNum(e) {
    if (
      !e.target.value ||
      (parseInt(e.target.value) > 0 && parseInt(e.target.value) <= 100)
    ) {
      setNum(e.target.value);
    }
  }

  function handleChangeTime(t, select) {
    setTime(t);
    setSelected(select);
  }

  return (
    <div className={styles.wrapper}>
      <label className={styles.questionLabel} htmlFor="questions">
        How many questions? (1-100)
      </label>
      <input
        className={styles.questionInput}
        type="number"
        id="questions"
        name="questions"
        min="1"
        max="100"
        value={num}
        onChange={(e) => handleSetNum(e)}
      />
      <div className={styles.timesLabel}>time for each question:</div>
      <div className={styles.times}>
        <div
          className={
            selected == 0 ? `${styles.time} ${styles.selected}` : styles.time
          }
          onClick={() => handleChangeTime(15, 0)}
        >
          15 seconds
        </div>
        <div
          className={
            selected == 1 ? `${styles.time} ${styles.selected}` : styles.time
          }
          onClick={() => handleChangeTime(30, 1)}
        >
          30 seconds
        </div>
        <div
          className={
            selected == 2 ? `${styles.time} ${styles.selected}` : styles.time
          }
          onClick={() => handleChangeTime(60, 2)}
        >
          1 minute
        </div>
        <div
          className={
            selected == 3 ? `${styles.time} ${styles.selected}` : styles.time
          }
          onClick={() => handleChangeTime(120, 3)}
        >
          2 minutes
        </div>
        <div
          className={
            selected == 4 ? `${styles.time} ${styles.selected}` : styles.time
          }
          onClick={() => handleChangeTime("unlimited", 4)}
        >
          unlimited time
        </div>
      </div>
      <div className={styles.buttons}>
        <ChangeButton
          to={`quiz/${num ? num : 10}/${
            time != "unlimited" ? time * (num ? num : 10) : "unlimited"
          }`}
          text="continue"
        />
        <ChangeButton to=".." text="back" />
      </div>
      <Outlet />
    </div>
  );
}

export default MultipleChoiceStart;
