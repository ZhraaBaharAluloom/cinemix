<template>
  <div
    class="flex justify-center gap-y-4 md:gap-x-24 md:justify-between items-center flex-wrap px-10 py-5"
  >
    <a href="/" class="text-5xl text-secondary font-[cursive]">CineMix</a>
    <SearchBar class="flex-1" @getMovie="getQuery" />
    <nav>
      <ul class="flex justify-center space-x-4">
        <li>
          <a href="#" class="text-white text-lg hover:text-amber-900">Home</a>
        </li>
        <li>
          <a href="#" class="text-white text-lg hover:text-amber-900">Movies</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import SearchBar from "./SearchBar.vue";
import CustomButton from "./CustomButton.vue";

const emit = defineEmits(["openModal", "getMovie"]);

const handleButtonClick = () => {
  emit("openModal");
};
const getQuery = (query) => {
  emit("getMovie", query);
};
</script>
