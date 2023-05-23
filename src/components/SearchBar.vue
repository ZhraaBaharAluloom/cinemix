<template>
  <form @submit.prevent="handleSearchbar">
    <label
      for="default-search"
      class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >Search</label
    >
    <div class="relative">
      <div class="absolute inset-y-0 right-4 flex items-center cursor-pointer">
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
</template>

<script setup>
import { ref } from "vue";
import CloseIcon from "vue-material-design-icons/Close.vue";

const inputValue = ref("");
const emit = defineEmits(["getMovie", "getMovies"]);
console.log("🚀 ~ file: SearchBar.vue:45 ~ emit:", { emit });

const handleSearchbar = () => {
  if (inputValue.value == "") {
    emit("getMovies");
  } else {
    emit("getMovie", inputValue.value);
  }
};

const clearSearchBar = () => {
  inputValue.value = "";
  emit("getMovies");
};
</script>
