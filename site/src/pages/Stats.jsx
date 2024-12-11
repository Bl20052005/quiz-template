import axios from "axios";
import { useEffect, useState } from "react";
import python_mcq from "../../data/python_mcq.json";

import styles from "./Stats.module.css";
import ChangeButton from "../components/ChangeButton";

function Stats() {
  const [curData, setCurData] = useState(null);

  async function get_data() {
    const submit_url = await import.meta.env.VITE_SITE_URL;
    let data = await axios.get(`https://ics33-quiz.vercel.app/data`);
    setCurData(data.data);
  }

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div onClick={get_data} className={styles.stats}>
      {curData && (
        <>
          <strong>Starting from 12/11/2024:</strong>
          <div>
            This quiz has been attempted {curData["num_attempts"]} times
          </div>
          <div>
            The average (mean) score is currently:{" "}
            {Math.round(curData["average_score"] * 10000) / 100}%
          </div>
          <div>
            The median score is currently:{" "}
            {Math.round(curData["median_score"] * 10000) / 100}%
          </div>
          <div>
            The most missed question is question #{curData["min_index"]}
          </div>
          <div className={styles.question}>
            {python_mcq[curData["min_index"]].question
              .split("\n")
              .map((line, i) => {
                return (
                  <pre className={styles.questionLine} key={i}>
                    {line}
                  </pre>
                );
              })}
          </div>

          <div>
            The least missed question is question #{curData["max_index"]}
          </div>
          <div className={styles.question}>
            {python_mcq[curData["max_index"]].question
              .split("\n")
              .map((line, i) => {
                return (
                  <pre className={styles.questionLine} key={i}>
                    {line}
                  </pre>
                );
              })}
          </div>
        </>
      )}
      <ChangeButton to=".." text="back" />
    </div>
  );
}

export default Stats;
