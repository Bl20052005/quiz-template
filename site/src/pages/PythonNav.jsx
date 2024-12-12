import ChangeButton from "../components/ChangeButton";
import styles from "./PythonNav.module.css";

function PythonNav() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Hi, select below to practice :)</h1>
      <div className={styles.options}>
        <ChangeButton to="mcq" text="MCQ" />
        <ChangeButton to=".." text="back" />
      </div>
    </div>
  );
}

export default PythonNav;
