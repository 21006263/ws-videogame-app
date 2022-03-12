
import { 
GET_VIDEOGAME,
GET_DETAILS, 
SEARCH_VIODEOGAME, 
GET_GENRES,
FILTER_GENRES,
CREATE_VIDEOGAME, 
SELECT_DB } from '../Const_redux-actions';

const initialState = {
  videogame: [],
  apivideogames: [],
	details: [],
	genres: [],
	gamerCreated: undefined,

};


export default function rootReducer(state = initialState, action) {
	switch (action.type) {
		case GET_VIDEOGAME:
		return {
			...state,
			videogame: action.payload,//! aca crea otra copia de dogs, q nunca se va a tocar(p/los filtrados)
			apivideogames: action.payload
		};
		case GET_DETAILS:
		return {
			...state,
			details: action.payload //! aca crea otra copia de dogs, q nunca se va a tocar(p/los filtrados)
		
		};
    case "CLEAR_DETAILS":
            return {
                ...state,
                detail: {}
            }
		case SEARCH_VIODEOGAME:
			return {
				...state,
				videogame: action.payload,//! aca crea otra copia de dogs, q nunca se va a tocar(p/los filtrados)
			    apivideogames: action.payload
			  };
			  case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
	  case FILTER_GENRES:
      if (action.payload) {
        let filterList = state.apivideogames.filter((elem) =>
          elem.genres.map((elem) => elem.name).includes(action.payload)
        );
        return {
          ...state,
          videogame: filterList,
        };
      }
      break;
	  case CREATE_VIDEOGAME:
      return {
        ...state,
        gameCreated: action.payload,
      };
    case SELECT_DB:
      let helper = state.apivideogames;
      let filterApiDb = helper.filter((elem) => typeof elem.id === "string");
      if (action.payload.name === "DB") {
        if (action.payload.search) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.name
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          );
        }
        if (action.payload.genre) {
          filterApiDb = filterApiDb.filter((elem) =>
            elem.genres.map((elem) => elem.name).includes(action.payload.genre)
          );
        }
        return {
          ...state,
          videogame: filterApiDb,
        };
      } else if (action.payload.name === "Rawg") {
        let auxiliary = state.apivideogames;
        let filterApiRawg = auxiliary.filter(
          (elem) => typeof elem.id === "number"
        );
        if (action.payload.search) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.name
              .toLowerCase()
              .includes(action.payload.search.toLowerCase())
          );
        }
        if (action.payload.genre) {
          filterApiRawg = filterApiRawg.filter((elem) =>
            elem.genres.map((elem) => elem.name).includes(action.payload.genre)
          );
        }
        return {
          ...state,
          videogame: filterApiRawg,
        };
      }
      break;
		default:
      return state
	}
}
