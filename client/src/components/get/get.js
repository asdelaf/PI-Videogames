import axios from "axios";

export const HGet = async (URL) => {
  return await axios 
    .get(`http://localhost:3001${URL}`)
    .then((result) => result)
    .then((response) => {
      return response;
    });
};