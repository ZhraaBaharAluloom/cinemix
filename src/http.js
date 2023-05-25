import axios from "axios";

export const API_KEY = "9c1bd422dc4c265552caa0ce7241a530";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
