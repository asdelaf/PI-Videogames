import axios from "axios";
export const POST_GENRES = "POST_GENRES";
export const GET_GENRES = "GET_GENRES";

export function postGenres(name) {
    return async function (dispatch) {
      return await axios
        .post("/genres", name)
        .then((response) => {
          dispatch({
            type: POST_GENRES,
            payload: response.data,
          });
        });
    };
  }
  
  export function getGenres() {
    return async function (dispatch) {
      return await axios
        .get(`/genres`)
        .then((response) => {
          dispatch({
            type: GET_GENRES,
            payload: response.data,
          });
        });
    };
  }