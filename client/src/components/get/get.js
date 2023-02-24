import axios from "axios";

export const HGet = async (URL) => {
  return await axios 
    .get(`${URL}`)
    .then((result) => result)
    .then((response) => {
      return response;
    });
};