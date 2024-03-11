import ChangeButton from "../components/ChangeButton";
import styles from "./Main.module.css";

function Main() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Review time???</h1>
      <ChangeButton to="33" text="Python / ICS 33" />
    </div>
  );
}

export default Main;
