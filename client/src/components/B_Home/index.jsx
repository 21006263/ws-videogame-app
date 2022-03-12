import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  getvideogame,
  searchVideogame,
  getGenres,
  filterGenres,
  selectDb,
} from "../../C_actions/index";

import Cards from "../C_Cards/Cards/Cards";
import SearchBar from "../SearchBar";
import SortAZ from "../Orden/SortAZ";
import SortRating from "../Orden/SortRating";
import FilterGen from "../Filtered/FilterGen";
import FilterDb from "../Filtered/FilterDb";

import styles from "./index.module.css";
export default function Home() {
  let vids = useSelector((state) => state.videogame);
  const dispatch = useDispatch();
  let [page, setPage] = useState(0);
  let [vars, setVars] = useState([0, 6]);
  let [search, setSearch] = useState("");
  let [sort, setSort] = useState("");
  let [genre, setGenre] = useState("");
  let [ratings, setRatings] = useState("");
  let [db, setDb] = useState("");

  if (ratings && !sort) {
    if (ratings === "ASC") {
      vids.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (ratings === "DESC") {
      vids.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
  }
  if (sort && !ratings) {
    vids.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sort === "ASC" ? 1 : -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sort === "ASC" ? -1 : 1;
      }
      return 0;
    });
  }

  if (sort && ratings) {
    vids.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return sort === "ASC" ? 1 : -1;
      }
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return sort === "ASC" ? -1 : 1;
      }
      return 0;
    });
    if (ratings === "ASC") {
      vids.sort(function (a, b) {
        return a.rating - b.rating;
      });
    } else if (ratings === "DESC") {
      vids.sort(function (a, b) {
        return b.rating - a.rating;
      });
    }
  }

  useEffect(() => {
    if (!search && !genre && !db) {
      dispatch(getvideogame());
      dispatch(getGenres());
    }
    if (search && !genre && !db) {
      dispatch(searchVideogame(search));
    }
    if (genre) {
      dispatch(filterGenres(genre));
    }
    if (db === "DB" || db === "Rawg") {
      dispatch(selectDb(db, search, genre));
    }
  }, [search, genre, db, sort, ratings, dispatch]);
  console.log(getGenres)

  function nextPage() {
    let maxPages = Math.floor(vids.length / 15);
    setPage(page + 1);
    if (page < maxPages) {
      setVars([vars[0] + 15, vars[1] + 15]);
    } else {
      setPage(maxPages);
    }
  }

  function prevPage() {
    if (page > 0) {
      setPage(page - 1);
      setVars([vars[0] - 15, vars[1] - 15]);
    } else {
      setPage(0);
    }
  }

  function onSearch(raiting) {
    setSearch(raiting);
    setPage(0);
    setVars([0, 15]);
  }

  function onSort(value) {
    setSort(value);
    setDb(db);
  }

  function onFilterGen(value) {
    setGenre(value);
    setPage(0);
    setVars([0, 15]);
    setDb(db);
  }

  function onRating(value) {
    setRatings(value);
    setDb(db);
  }

  function onDb(value) {
    setDb(value);
  }

  return (
       <div className={`${styles.master}`}>
       <div className={`${styles.banner}`}>
      </div>
      <div className={`${styles.macro}`}>
        <FilterDb db={db} onDb={onDb} />
        <SortAZ sort={sort} onSort={onSort} />
        <SortRating ratings={ratings} onRating={onRating} />
        <FilterGen genre={genre} onFilterGen={onFilterGen} />
        <Link to="/create">
          <button className={`${styles.create}`}>Create Game</button>
        </Link>
      </div>
     <div className={`${styles.SearchBar}`}>

     <SearchBar
          onSearch={onSearch}
          onSort={onSort}
          onFilterGen={onFilterGen}
          onRating={onRating}
          onDb={onDb}
        />
     </div><br />

      <div className={`${styles.container}`}>
        <Cards vids={vids} vars={vars} />
      </div>
      <div className={`${styles.btn_box}`}>
        
         <img src="/previ.svg" alt="fff"  className={`${styles.btn1}`} onClick={prevPage}/>
       
        {/* <button className={`${styles.btn1}`} onClick={nextPage}> //espacio
          {`>`}
        </button> */}
     
        <img src="/x.svg" alt="fff"  className={`${styles.btn1}`} onClick={nextPage}/>
      </div>
      <footer className={styles.footer}>PIE de pagina</footer>
    </div>
  );
}
