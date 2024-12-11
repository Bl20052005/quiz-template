import ChangeButton from "../components/ChangeButton";
import styles from "./Main.module.css";

function Main() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Review time???</h1>
      <div className={styles.container}>
        <ChangeButton to="33" text="Python / ICS 33" />
        <ChangeButton to="stats" text="Quiz stats" />
      </div>
    </div>
  );
}

export default Main;
