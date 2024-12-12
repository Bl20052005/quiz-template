import { Link } from "react-router-dom";
import styles from "./ChangeButton.module.css";

function ChangeButton({ to, text }) {
  return (
    <Link to={`${to}`}>
      <button className={styles.button}>{text}</button>
    </Link>
  );
}

export default ChangeButton;
