import axios from 'axios';
import { 
GET_VIDEOGAME,
GET_DETAILS, 
SEARCH_VIODEOGAME, 
GET_GENRES,
FILTER_GENRES,
CREATE_VIDEOGAME, 
SELECT_DB } from '../Const_redux-actions';

export function getvideogame() {
    return function (dispatch) {
      axios.get(`/videogames`)
      .then((videogames) => {
        dispatch({ 
          type: GET_VIDEOGAME, 
          payload: videogames.data
        })
      })
    }
  }

  
  export function getDetails(id) {
    return function (dispatch) {
      axios.get(`/videogames/${id}`)
      .then((details) => {
        dispatch({ 
          type: GET_DETAILS,
          payload: details.data });
        });
      };
    }
    
    export function searchVideogame(id) {
      return function (dispatch) {
        axios.get(`/videogames?name=${id}`)
        .then((search) => {
          dispatch({ 
            type: SEARCH_VIODEOGAME,
            payload: search.data });
        });
      };
    }
    
    export function getGenres() {
      return function (dispatch) {
        axios.get(`/genres`)
        .then((genres) => {
          dispatch({ 
            type: GET_GENRES,
            payload: genres.data });
        });
      };
    }
    
    export function filterGenres(genre) {
      return {
        type: FILTER_GENRES,
        payload: genre,
      };
    }
    //! OJO CON ESTA FUNCTION
    export function searchFilter(search, genre) {
      return {
        type: 'SEARCHFILTER',
        payload: { search, genre },
      };
    }
    
    export function createGame(obj) {
      return function (dispatch) {
        axios.post(`/videogames`, obj)
        .then((r) => {
          dispatch({
            type: CREATE_VIDEOGAME, 
            payload: r.data });
        });
      };
    }
    
export function selectDb(name, search, genre) {
  return {
    type: SELECT_DB,
    payload: { name, search, genre },
  };
}


export const clearDetails = () => {
  return {
      type: "CLEAR_DETAILS"
  }
}

//  export function getCards() { //!trae todos los dogs desde mi Api
//     return async function (dispatch) {
//       try {
//         var pedido = await axios.get("http://localhost:3001/Videogame/getAll_ByName");
        
//         return dispatch({
//           type: OBTENER,
//           payload: pedido
//         });
//       } catch (error) {
//         console.log("No se pudieron obtener las razas", error);
//       }
//     };
  
  
// export function todo() { //TODO trae todos los dogs desde mi API
// 	return function (dispatch) {
       
//         const aux = axios.get("http://localhost:3001/Videogame/getAll_ByName");
//         return dispatch({
//             type: OBTENER,
//             payload: aux.data
//           })
          
//         }
// }
       //   export function getSearch(name){//! Reques a las API
        //     return function (dispatch) {
        //       axios.get(`${GET_BY_NAME}${name}`)
        //       .then((videogames) => {
        //         dispatch({ 
        //             type: SEARCH_BY_NAME, 
        //             payload: videogames.data
        //         })
        //       })
        //       .catch((error) => {
        // console.log(error)
        //       })
        //     }
        //   }
        
        //   export function orderByName(order) {
        //     // payload es el value de este select(asc/desc)
        //     return {
        //       type: ORDER_BY_NAME,
        //       payload: order
        //     };
        //   }