import { useState } from "react";
import styles from "./FilterDb.module.css";

export default function FilterDb({ onDb, db }) {
  let [value, setValue] = useState("");
  function onChangeHandler(e) {
    setValue(e.target.value);
    onDb(e.target.value);
  }
 //! console.log(value)

  return (
    <div className={`${styles.drop}`}>
      <button className={`${value && db ? styles.menu_active : styles.menu}`}>
        {value && db ? value : "Select DB"}
      </button>
      <div className={`${styles.select}`}>
        <button className={`${styles.btn}`} value="" onClick={onChangeHandler}>
          All
        </button>
        <button
          className={`${styles.btn}`}
          value="DB"
          onClick={onChangeHandler}
        >
          DB
        </button>
        <button
          className={`${styles.btn}`}
          value="Rawg"
          onClick={onChangeHandler}
        >
          Rawg
        </button>
      </div>
    </div>
  );
}