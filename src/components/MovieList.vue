<template>
  <TransitionGroup name="fade">
    <div>
      <div class="relative">
        <div
          class="overflow-hidden rounded-lg shadow-2xl shadow-slate-800 bg-indigo-50 bg-opacity-75 w-56 cursor-pointer"
        >
          <div class="group">
            <img
              class="w-full h-72 object-cover"
              :src="imgURL"
              alt="Movie cover"
            />
            <div
              class="overlay flex flex-col items-center justify-end text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute inset-0 hover:bg-slate-950 hover:bg-opacity-60"
            >
              <div
                class="absolute top-4 right-4 bg-yellow-500 rounded-full p-1 text-sm text-primary"
              >
                {{ movie.vote_average }}
              </div>
              <div class="font-bold text-lg m-2">
                {{ movie.title || movie.name }}
              </div>
              <div class="tags">
                <span
                  v-for="(tag, index) in movie.genre_ids"
                  :key="index"
                  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2 cursor-pointer"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  movie: Object,
});

const imgURL = computed(() => {
  return `https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`;
});

const emit = defineEmits(["removeMovie", "selectedMovieToEdit", "movieIndex"]);

const selectedMovieToEdit = (currentMovie) => {
  emit("openModal");
  emit("selectedMovieToEdit", currentMovie);
};
</script>
