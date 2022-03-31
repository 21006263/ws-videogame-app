import React, { useState } from "react";
import styles from "./index.module.css";

export default function SearchBar({
  onSearch,
  onSort,
  onFilterGen,
  onRating,
  onDb,
}) {
  let [input, setInput] = useState("");

  function changeHandler(e) {
    if (e.target.value.length > 0 ) {
      setInput(e.target.value);
    } else {
      setInput("");
      onSearch("");
      onSort("");
      onFilterGen("");
      onRating("");
      onDb("");
    }
  }

  function reset(e) {
    setInput("");
    onSearch("");
    onSort("");
    onFilterGen("");
    onRating("");
    onDb("");
  }

  function submitHandler(e) {
    e.preventDefault();
    onSort("");
    onFilterGen("");
    onRating("");
    onDb("");
    onSearch(input);
  }

  return (




    <div>
    <form className={`${styles.form}`} onSubmit={submitHandler}>
      <input placeholder="search" 
        className={`${styles.searchBar}`}
        type="text"
        value={input}
        onChange={changeHandler}
      />     <button className={`${styles.search_btn}`} type="submit">search</button>
      <button value="" className={`${styles.del_btn}`} onClick={reset}>
        X
      </button>
    </form>
  </div>
  );
}

















// import React from "react";
// import {useState} from 'react'
// //import axios from "axios";
// import {useDispatch} from 'react-redux'
// import { } from "../../C_actions";


// export default function SearchBar(){
// const [search, setSearch] = useState ('')
// let dispatch = useDispatch()
 
// function onSubmit(e){
//     e.preventDefault();
// dispatch((search))
// }

// function onInputChange(e){
//     e.preventDefault();
//     setSearch(e.target.value)
    
// }
//     return <>
//         <form onSubmit={onSubmit}>
//         <input type="text" onChange={onInputChange} value={search}/>
//         <input type="submit" value="Buscar" />
//         </form>
//     </>
// }