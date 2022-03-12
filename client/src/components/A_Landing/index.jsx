import React from "react";
import { Link } from "react-router-dom";
import style from './index.module.css'

export default function Landing() {
  return (
<div><img className={style.imgFondo} src="/portada1.png" alt=""/>
    <span class={style.bienvenida}>Bienvenidos a mi pagina de videogamer</span>
  <div class={style.container}>
      <Link to="/Home">
        <button class={style.button}>
        <img class={style.imgbutton} src="/buton.svg" alt=""/>
        <h1>Start</h1>
        </button>
      </Link>
      </div>
    </div>
  );
}
