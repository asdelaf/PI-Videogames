import axios from "axios";
export const GET_VIDEOGAME_ID = "GET_VIDEOGAME_ID";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_CLEAN = "GET_CLEAN"


export function postVideogame(videogame) {
    return async function (dispatch) {
      return await axios
        .post("/videogames", videogame)
        .then((response) => {
          dispatch({
            type: POST_VIDEOGAME,
            payload: response.data,
          });
        });
    };
}


export function getVideogameId(id) {
  return async function (dispatch) {
    return await axios
      .get(`/videogames/${id}`)
      .then((response) => {
        dispatch({
          type: GET_VIDEOGAME_ID,
          payload: response.data,
        });
      });
  };
}

export function getClean () {
  return{
      type: GET_CLEAN,
      payload: []
  }
}
