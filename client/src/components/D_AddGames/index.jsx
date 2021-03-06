import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createGame, getGenres, getvideogame } from "../../C_actions";
import { Link } from "react-router-dom";
import styles from "./index.module.css";
export default function CreateVideogame() {
 const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const api = useSelector((state) => state.apivideogames);
//! voy consologueando para ver que me traigo de back
  console.log(genres)
  console.log(api)
//! voy consologueando para ver que me traigo de back
  const allPlatforms = api.map((elem) => elem.platforms);
  let platformsSet = new Set(allPlatforms.flat(Infinity));
  let platforms = [...platformsSet];
  let errors = {};
  let [checkState, setCheckState] = useState({
    genres: new Array(genres.length).fill(false),
    platforms: new Array(platforms.length).fill(false),
  });
  let [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    genres: [],
    rating: 0,
    platforms: [],
  
  });
  let [error, setError] = useState({
    name: "Name required",
    description: "Description required",
    released: "Date required",
    genres: "Genre required",
    platforms: "Platform required",
    rating: "Rating must be higher than zero",
  });

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getvideogame());
  }, [dispatch]);

  function validate(input) {
    if (input.name) {
      errors.name = "";
    } else {
      errors.name = "Name required";
    }
    if (input.description) {
      errors.description = "";
    } else {
      errors.description = "Description required";
    }
    if (input.released) {
      errors.released = "";
    } else {
      errors.released = "Date required";
    }
    if (input.rating > 0) {
      errors.rating = "";
    } else {
      errors.rating = "Rating required";
    }
    if (input.genres.length > 0) {
      errors.genres = "";
    } else {
      errors.genres = "Genre required";
    }
    if (input.platforms.length > 0) {
      errors.platforms = "";
    } else {
      errors.platforms = "Platform required";
    }
    return errors;
  }

  function handleGenre(pos) {
    let genCheckState = checkState.genres.map((elem, index) => {
      if (index === pos) {
        return !elem;
      }
      return elem;
    });
    setCheckState({ ...checkState, genres: genCheckState });
    var genArr = genCheckState
      .map((elem, index) => {
        if (elem === true) {
          return genres[index].name;
        }
        return 0;
      })
      .filter((elem) => typeof elem === "string");
    setInput({ ...input, genres: genArr });
    setError(validate({ ...input, genres: genArr }));
  }

  function handlePlatform(pos) {
    let platCheckState = checkState.platforms.map((elem, index) => {
      if (index === pos) {
        return !elem;
      }
      return elem;
    });
    setCheckState({ ...checkState, platforms: platCheckState });
    var platArr = platCheckState
      .map((elem, index) => {
        if (elem === true) {
          return platforms[index];
        }
        return 0;
      })
      .filter((elem) => typeof elem === "string");
    setInput({ ...input, platforms: platArr });
    setError(validate({ ...input, platforms: platArr }));
  }

  function handleInput(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setError(validate({ ...input, [e.target.name]: e.target.value }));
  }

  function onSubmit(e) {
    e.preventDefault();
    let checkObj = Object.values(error);
    let checkArr = checkObj.filter((elem) => elem !== "");
    console.log(checkArr);
    if (checkArr.length > 0) {
      alert("Please fill in the required fields");
    } else {
      let newGame = {
        name: input.name,
        description: input.description,
        released: input.released,
        image:
          "https://thumbs.dreamstime.com/b/video-game-controller-doodle-hand-drawn-vector-illustration-63395075.jpg",
        rating: input.rating,
        platforms: input.platforms,
        genres: input.genres,
      };
      dispatch(createGame(newGame));
      // history.redirect("/");
      
        history.push("/Home");
    }
  }
  return (
    
    <div className={`${styles.body}`} >
      <form  onSubmit={onSubmit}>
      <div className={`${styles.container}`}>
        <div className={`${styles.box}`}>
          <label className={`${styles.label}`}>Name</label>
          <div>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={handleInput}
              className={`${error.name ? styles.error : styles.valid} ${
                styles.name
              }`}
            />
          </div>

          <label className={`${styles.label}`}>Description</label>
          <div>
            <textarea
              name="description"
              value={input.description}
              onChange={handleInput}
              className={`${error.description ? styles.error : styles.valid} ${
                styles.desc
              }`}
            />
          </div>
          <label className={`${styles.label}`}>Released</label>
          <div>
            <input
              type="date"
              name="released"
              value={input.released}
              onChange={handleInput}
              className={`${error.released ? styles.error : styles.valid} ${
                styles.date
              }`}
            />
          </div>
          <label className={`${styles.label}`}>Rating</label>
          <div>
            <input
              type="number"
              name="rating"
              value={input.rating}
              onChange={handleInput}
              min="0"
              max="5"
              className={`${error.rating ? styles.error : styles.valid} ${
                styles.rate
              }`}
            />
          </div>
        </div>




        <div className={`${styles.checksCont}`}>
      <label className={`${styles.label1}`} >Genre</label>
          <div className={`${styles.checksDiv}`}>
            {genres.map((elem, index) => (
              <div key={elem + index} className={`${styles.checks}`}>
                {elem.name}
                <input
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  name={elem.name}
                  value={elem.name}
                  onChange={() => handleGenre(index)}
                  checked={checkState.genres[index]}
                />
              </div>
            ))}
           </div>
           
          <label
            className={`${
              error.genres ? styles.errorMsg : styles.errorMsgHide
            }`}
          >
            Genre required
          </label>
         
        <div className={`${styles.checksCont}`}>
         <label className={`${styles.label1}`} >Platforms</label>
          <div className={`${styles.checksDiv}`}>
            {platforms.map((elem, index) => (
              <div key={elem + index} className={`${styles.checks}`}>
                {elem}
                <input
                  className={`${styles.checkbox}`}
                  type="checkbox"
                  name={elem}
                  value={elem}
                  onChange={() => handlePlatform(index)}
                  checked={checkState.platforms[index]}
                />
              </div>
            ))}
          </div>
          <label
            className={`${
              error.platforms ? styles.errorMsg : styles.errorMsgHide
            }`}
          >
            Platform required
          </label>
        </div>
        </div>
       
      

       
        </div>
      
        <button type="submit" className={`${styles.btn}`}>
          Enter
        </button>
       
      </form>
    
      <Link to="/Home">
            <button className={`${styles.btn}`} >Volver</button>
          </Link>
    </div>
   
  );
}
