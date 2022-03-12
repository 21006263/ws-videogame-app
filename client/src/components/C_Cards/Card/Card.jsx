import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({name, image, genres, id, rating}){
  
  return (
  
  <div className={`${styles.master}`}>
  <Link to={`/videogames/${id}`} className={`${styles.link}`}>
    <div className={`${styles.box}`}>
      <img
        className={`${styles.img}`}
        src={
          image
            ? image
            : "https://thumbs.dreamstime.com/b/video-game-controller-doodle-hand-drawn-vector-illustration-63395075.jpg"
        }
        alt="Not found"
      />
        <div  className={`${styles.details}`}>Rating: {rating}</div>
     
      <div className={`${styles.genrate}`}>
        <div className={`${styles.content}`}>
          {genres.map((elem) => elem.name).join(" / ")}
        </div>
      </div>
    </div>
  </Link>
</div>
);
}
