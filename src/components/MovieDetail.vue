<template>
  <h1 class="text-center p-4 text-3xl font-bold text-primary bg-gray-200">
    {{ movieDetail.title }}
  </h1>
  <div
    class="flex flex-col xl:flex-row gap-6 text-white bg-primary h-[100vh] px-6 py-10"
  >
    <img
      class="rounded-md w-full xl:w-1/2 object-fill"
      :src="imgURL + movieDetail.backdrop_path"
      alt="Movie cover"
    />
    <div class="flex flex-col gap-y-4 items-start xl:w-1/2">
      <div class="flex items-center">
        <span class="text-lg font-semibold"> Popularity: </span>
        <span class="ml-2">{{ movieDetail.popularity }}</span>
      </div>
      <div class="">
        <span class="text-lg font-semibold"> Genre: </span>
        <span class="" v-for="(genre, index) in movieDetail.genres">
          {{ genre.name }},
        </span>
      </div>
      <div class="">
        <span class="text-lg font-semibold"> Overview: </span>
        <p class="">{{ movieDetail.overview }}</p>
      </div>
    </div>
    <!-- <div class="flex items-center">
      <span class="text-lg font-semibold"> Rating: </span>
      <span class="ml-2">{{ movieDetail.rating }}/10</span>
    </div> -->
    <!-- <div class="mt-3">
      <span class="text-lg font-semibold">Casts:</span>
           <ul class="list-disc ml-6">
             <li v-for="cast in movieDetail.casts" :key="cast.id">
               {{ cast.name }}
             </li>
           </ul>
         </div> -->
    <!-- <div class="mt-10">
           <h2 class="text-2xl font-semibold mb-3">Related Movies</h2>
           <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div
               class="flex flex-col items-center cursor-pointer"
               v-for="relatedMovie in movie.relatedMovies"
               :key="relatedMovie.id"
             >
               <img
                 :src="relatedMovie.poster"
                 alt="Movie Poster"
                 class="w-full h-auto mb-2 rounded-lg"
               />
               <span>{{ relatedMovie.title }}</span>
             </div>
           </div>
         </div> -->
    <router-link to="/">
      <p>Back</p>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import instance, { API_KEY } from "../http";
import { computed, onMounted, ref } from "vue";
// import MovieList from "./MovieList.vue";
// import mdilThumbUpIcon from "vue-material-design-icons/mdilThumbUp.vue";

const route = useRoute();
const movieDetail = ref({});

const getMovieDetails = async () => {
  try {
    const response = await instance.get(
      `/movie/${route.params.id}?api_key=${API_KEY}`
    );

    movieDetail.value = response.data;
    console.log(
      "🚀 ~ file: MovieDetail.vue:78 ~ getMovieDetails ~ movieDetail.value:",
      movieDetail.value
    );
  } catch (error) {
    console.log("🚀 ~ file: tmdbServices.js:97 ~ getMovie ~ error:", error);
  }
};
const imgURL = computed(() => {
  return `https://image.tmdb.org/t/p/w500/`;
});

onMounted(() => {
  getMovieDetails();
});
</script>

<style>
/* Add Tailwind CSS classes or custom styles here */
</style>
