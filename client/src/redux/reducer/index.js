import {
  GET_VIDEOGAME_ID,
  GET_CLEAN
} from "../actions/videogames";

import {
  GET_GENRES
} from "../actions/genres";

  const initialState = {
    genres: [],
    videogame: {}
  };
  
  export default function rootReducer(state = initialState, action) {
    switch (action.type) {
      case GET_VIDEOGAME_ID:
        return {
          ...state,
          videogame: action.payload,
        };
      case GET_GENRES:
        return {
          ...state,
          genres: action.payload,
        };
      case GET_CLEAN:
        return {
          ...state,
          videogame: action.payload
        };
      
      

      default:
        return {...state};
    }
  }