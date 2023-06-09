<template>
  <router-link :to="{ name: 'Movie Details', params: { id: movie.id } }">
    <div>
      <div class="relative">
        <div
          class="overflow-hidden rounded-lg shadow-2xl shadow-slate-800 bg-indigo-50 bg-opacity-75 w-56 cursor-pointer"
          @click="toggleOverlay"
          :class="{ 'overlay-active': overlayActive }"
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
                class="absolute top-4 right-4 rounded-full p-1 text-md text-yellow-500"
              >
                <div class="flex gap-2">
                  {{ movie.vote_average }}
                  <StarIcon fillColor="#ffbe0b" @click="handleModal" />
                </div>
              </div>
              <div class="font-bold text-lg m-2">
                {{ movie.title }}
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
  </router-link>
</template>

<script setup>
import { computed, ref } from "vue";
import StarIcon from "vue-material-design-icons/Star.vue";

const props = defineProps({
  movie: Object,
});

const imgURL = computed(() => {
  return `https://image.tmdb.org/t/p/w500/${props.movie.backdrop_path}`;
});

const emit = defineEmits(["removeMovie", "selectedMovieToEdit", "movieIndex"]);

const overlayActive = ref(false);

const toggleOverlay = () => {
  overlayActive.value = !overlayActive.value;
};

const selectedMovieToEdit = (currentMovie) => {
  emit("openModal");
  emit("selectedMovieToEdit", currentMovie);
};
</script>

<style scoped>
.overlay-active .overlay {
  opacity: 1;
}
</style>
