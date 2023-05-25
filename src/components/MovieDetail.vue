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
    <router-link to="/">
      <p
        class="border-4 border-secondary w-24 px-2 py-1 text-center rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover:bg-gray-100 hover:text-primary duration-400 hover:border-white text-lg"
      >
        Back
      </p>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import instance, { API_KEY } from "../http";
import { computed, onMounted, ref } from "vue";

const route = useRoute();
const movieDetail = ref({});

const getMovieDetails = async () => {
  try {
    const response = await instance.get(
      `/movie/${route.params.id}?api_key=${API_KEY}`
    );

    movieDetail.value = response.data;
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
