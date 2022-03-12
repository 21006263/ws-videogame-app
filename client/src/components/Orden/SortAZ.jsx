import { useState } from "react";
import styles from "./SortAZ.module.css";

//import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort"


export default function SortAZ({onSort, sort}){
  let [btnAZ, setBtnAZ] = useState(0);
  let [btnZA, setBtnZA] = useState(0);

  function onChangeHandler(e) {
    if (e.target.value === "ASC") {
      if (!btnAZ) {
        onSort(e.target.value);
        setBtnAZ(1);
        setBtnZA(0);
      } else {
        onSort("");
        setBtnAZ(0);
      }
    } else if (e.target.value === "DESC") {
      if (!btnZA || btnAZ) {
        onSort(e.target.value);
        setBtnZA(1);
        setBtnAZ(0);
      } else {
        onSort("");
        setBtnZA(0);
      }
    }
  }

  return (
    <div className={`${styles.container}`}>
      <button
        value="ASC"
        onClick={onChangeHandler}
        className={`${btnAZ && sort ? styles.btn_active : styles.btn}`}
      >
        A-Z
      </button>
      <button
        value="DESC"
        onClick={onChangeHandler}
        className={`${btnZA && sort ? styles.btn_active : styles.btn}`}
      >
        Z-A
      </button>
    </div>
  );
}



// import { useDispatch} from "react-redux"
// import {} from "../../C_actions"

// //import { ASCENDENTE, DESCENDENTE } from "../../constantes/sort"


// export default function Order(){
    
// const dispatch = useDispatch()
//  function onSelectChange(e){
     
//      console.log(e.target.value)
//  dispatch((e.target.value))
//  }

//     return <>
//     <h1>order</h1> 
//      <select name="select" onChange={onSelectChange}>
//         <option >Ascendente</option>
//         <option >Descendente</option>
//     </select> 

// </>
// }