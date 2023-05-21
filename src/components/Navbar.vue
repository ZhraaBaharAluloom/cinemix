<template>
  <div
    class="flex justify-center gap-y-4 md:gap-0 md:justify-between items-center flex-wrap px-10 py-5"
  >
    <a href="/" class="text-4xl text-green-900 font-[cursive]">Cookies</a>
    <nav>
      <ul class="flex justify-center space-x-4">
        <li>
          <a href="#" class="text-green-900 text-lg hover:text-amber-900"
            >Home</a
          >
        </li>
        <li>
          <a href="#" class="text-green-900 text-lg hover:text-amber-900"
            >Cookies</a
          >
        </li>
        <li>
          <custom-button
            class="border-4 border-green-900 px-4 rounded-lg hover:bg-green-900 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300"
            @click="handleButtonClick"
          >
            Add Cookie
          </custom-button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import CustomButton from "./CustomButton.vue";

const emit = defineEmits(["openModal"]);

const handleButtonClick = () => {
  emit("openModal");
};
</script>
