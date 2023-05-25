<template>
  <div class="relative w-96 md:w-full">
    <form @submit.prevent="handleSearchbar">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 right-4 flex items-center cursor-pointer"
        >
          <CloseIcon
            class="close-icon text-white hover:text-black"
            @click="clearSearchBar"
          />
        </div>
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          class="block w-full p-2 pl-10 outline-none text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-800 focus:border-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search Movies..."
          v-model="inputValue"
        />
      </div>
    </form>
    <div
      v-if="showDropdown"
      class="mt-1 bg-gray-700 rounded shadow-lg absolute w-full z-10 max-h-[40rem] overflow-y-auto text-white"
    >
      <ul class="space-y-2">
        <li
          v-for="movie in searchedMovies"
          :key="movie.id"
          class="p-4 flex flex-wrap items-center cursor-pointer transition hover:bg-gray-900"
        >
          <img
            :src="imgURL + movie.backdrop_path"
            :alt="movie.name"
            class="lg:w-1/4 rounded-md mr-4"
          />
          <div class="md:flex-1 py-4">
            <span class="text-lg font-semibold">{{ movie.name }}</span>
            <p class="line-clamp-3 xl:line-clamp-5">
              {{ movie.overview }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

const inputValue = ref("");
const showDropdown = ref(false);
const emit = defineEmits(["getMovie", "getMovies"]);
const imgURL = computed(() => {
  return `https://image.tmdb.org/t/p/w500/`;
});

const props = defineProps({
  searchedMovies: Array,
});
console.log(
  "🚀 ~ file: SearchBar.vue:82 ~ searchedMovies:",
  props.searchedMovies
);

// const scrollToBottom = () => {
//   const windowHeight = window.innerHeight;
//   const scrollPosition = windowHeight * 0.9; // Set the desired scroll position as a percentage of the window height
//   const scrollOptions = {
//     top: scrollPosition,
//     behavior: "smooth",
//   };
//   window.scrollTo(scrollOptions);
// };

const searchMovies = () => {
  showDropdown.value = inputValue.value.length > 0;
};

const handleSearchbar = () => {
  searchMovies();
  emit("getMovie", inputValue.value);
};

const clearSearchBar = () => {
  inputValue.value = "";
  emit("getMovies");
  showDropdown.value = false;
};
</script>
