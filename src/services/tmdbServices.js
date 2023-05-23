import axios from "axios";

export const getMovies = async () => {
  try {
    const moviesList = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=9c1bd422dc4c265552caa0ce7241a530"
    );
    return moviesList.data.results;
  } catch (error) {
    console.log("🚀 ~ file: tmdbServices.js:9 ~ getMovies ~ error:", error);
  }
};
