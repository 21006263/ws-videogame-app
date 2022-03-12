import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, /*clearDetails*/ } from "../../C_actions/index";
import styles from "./index.module.css";
import Loader from "./Loader";

export default function Detail({ id }) {
  let details = useSelector((state) => state.details);
  let dispatch = useDispatch();
const [Loadin, setLoadin] = useState (false)

  useEffect(() => {
    setLoadin(true)
    setTimeout(() =>{
      setLoadin(false)
    }, 1000)
    dispatch(getDetails(id))
    // return () => {
    //     dispatch(clearDetails());
    // }
},[dispatch, id])







  return (
    <div>
{
Loadin ?
 <Loader
 size={150}
 Loadin={Loadin}
 
 />
:




  
      <div className={`${styles.box}`}>
        <img className={`${styles.img}`} src={details.image} alt="Not Found" />
        <div className={`${styles.container}`}>
          <div className={`${styles.det}`}>{details.name}</div>
          <div className={`${styles.det}`}>{details.genres}</div>
          <div className={`${styles.det}`}>Rating: {details.rating}</div>
          <div className={`${styles.det}`}>Released: {details.released}</div>
          <div className={`${styles.desc}`}>{details.description}</div>
          <div className={`${styles.det}`}>{details.platforms}</div>
        </div>
      </div>
    }
    </div>
  );
}



// import { useEffect, useState } from "react"
// import axios from 'axios'
// import { useParams } from "react-router-dom"

// export default function Detail() { //!! renderiza la card detallada de una raza


//     const [videogame, setVideogame] = useState(null)
//     const { id } = useParams(); //TODO la obtengo con este hook, porque en el rout de mi App le especifico "/dogDetail/:id"
//     useEffect(() => {
    
// axios.get("http://localhost:3001/Videogame/searchById/" + id)
//        .then((response) =>{
//         setVideogame(response.data)
//        })
//        return () => {
//         setVideogame(null) //! Cleanup si trabajamos con redux
//        }
//    }, [id])
  
//     return <div>
//   {
//      videogame ?
//     <>
//     <h3>{videogame.name}</h3>
//     <img src={videogame.image} alt="imagen" />
//     </>:
//     <div>loading</div>
// }
// </div>
// }