
import Card from '../Card/Card'
import styles from './Cards.module.css';

export default function Cards({ vids, vars }) {
  return (
    <div>
      <div className={`${styles.container}`}>
        {vids.length >  0? (
          vids.slice(vars[0], vars[1]).map((elem, index) => {
            if (elem.name !== 'Videogame not found') {
              return (
                <Card
                  key={index}
                  id={elem.id}
                  name={elem.name}
                  image={elem.image}
                  genres={elem.genres}
                  rating={elem.rating}
                />
              );
            } else {
              return (
                <div>
                  <h1 className={`${styles.error}`}>GAME OVER</h1>
                  <h3 className={`${styles.error}`}>videogame not found</h3>
                </div>
              );
            }
          })
        ) : (
        
          <div className={`${styles.macro}`}>
            <h1 className={`${styles.error}`}>LOADING...</h1>
          </div>
        )}
      </div>
    </div>
  );
}






//  import React, { useEffect } from "react";
// import Card from '../Card/Card'
// import {useSelector, useDispatch} from 'react-redux'
// import {getVideogame} from '../../../C_actions'

// export default function Cards(){


// let state = useSelector((state) => state.apivideogames)
// let dispatch = useDispatch()
// //console.log(state)
//  useEffect(() => {
//       dispatch(getVideogame());
//     },[dispatch])
//    // console.log(state_videogame)
     
//     return <div>


//  {state.map((game) => {
//   return <Card id={game.id} name={game.name} image={game.image}/>
//  })}



//  </div>
 
//  }