<template>
  <div class="bg-primary">
    <header
      class="w-full bg-cover bg-center min-h-[100vh]"
      style="
        background-image: linear-gradient(
            rgba(255, 255, 255, 0),
            rgba(4, 21, 46, 1)
          ),
          url('https://images.pexels.com/photos/4722571/pexels-photo-4722571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
      "
    >
      <Navbar
        @openModal="openModal"
        @getMovie="getMovie"
        @getMovies="getMovies"
      />
      <div
        class="text-4xl text-white flex flex-col justify-center items-center h-[80vh] font-serif"
      >
        <p>
          Welcome to
          <span class="text-secondary px-2 text-6xl font-[cursive]">
            CineMix</span
          >,
        </p>
        <p>your ultimate destination for all things cinema!</p>
      </div>
    </header>
    <div class="flex justify-center items-start gap-7 flex-wrap px-24 py-14">
      <MovieList
        v-for="(movie, index) in moviesList"
        :key="index"
        :movie="movie"
        @removeMovie="removeMovie"
        @selectedMovieToEdit="selectedMovieToEdit"
        @openModal="openModal"
      />
    </div>
    <Transition>
      <AddOrEditMovieFrom
        v-if="open"
        :oldMovie="oldMovie"
        :isEditing="isEditing"
        @addMovie="addMovie"
        @openModal="openModal"
        @editMovie="editMovie"
      />
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AddOrEditMovieFrom from "./components/AddOrEditMovieFrom.vue";
import MovieList from "./components/MovieList.vue";
import Navbar from "./components/Navbar.vue";
import axios from "axios";

let moviesList = ref([]);
let open = ref(false);
let isEditing = ref(false);
let oldMovie = ref({});

const addMovie = (newMovie) => {
  moviesList.value.push(newMovie);
  open.value = false;
};

const removeMovie = (movieIndex) => {
  const confirmDelete = confirm(
    "Are you absolutely positive you want to demolish this delicious movie? It may shed a tear or two... 🍪😐"
  );
  if (confirmDelete) {
    moviesList.value.splice(movieIndex, 1);
    alert("Movie successfully obliterated! 💥😄");
  } else {
    alert("Phew! The movie has been spared. It breathes a sigh of relief. 🍪");
  }
};

const getMovies = async () => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=9c1bd422dc4c265552caa0ce7241a530"
    );
    moviesList.value = response.data.results;
  } catch (error) {
    console.log("🚀 ~ file: tmdbServices.js:9 ~ getMovies ~ error:", error);
  }
};
const getMovie = async (movieName) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/collection?query=${movieName}&page=1&api_key=9c1bd422dc4c265552caa0ce7241a530`
    );

    moviesList.value = response.data.results;
  } catch (error) {
    console.log("🚀 ~ file: tmdbServices.js:97 ~ getMovie ~ error:", error);
  }
};

const editMovie = (currentMovie, editedMovie) => {
  const foundMovie = moviesList.value.indexOf(currentMovie);
  moviesList.value.map((movie, index) => {
    if (foundMovie == index) {
      Object.assign(movie, editedMovie);
    }
    isEditing.value = !isEditing.value;
    open.value = false;
  });
};

const selectedMovieToEdit = (currentMovie) => {
  isEditing.value = true;
  oldMovie.value = currentMovie;
};

const openModal = () => {
  if (isEditing.value) {
    isEditing.value = false;
  }

  open.value = !open.value;
};

onMounted(() => {
  getMovies();
});
</script>
