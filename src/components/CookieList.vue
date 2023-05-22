<template>
  <div class="flex justify-center items-start gap-7 flex-wrap px-24 py-14">
    <TransitionGroup name="fade">
      <div v-for="(cookie, index) in cookiesList" :key="index">
        <div
          class="overflow-hidden rounded-lg shadow-2xl shadow-slate-800 bg-indigo-50 bg-opacity-75 w-72 relative"
        >
          <img
            class="w-full h-56"
            :src="cookie.image"
            alt="Sunset in the mountains"
          />
          <CloseIcon
            fillColor="#515151"
            class="p-1 cursor-pointer overflow-visible absolute top-4 right-4 bg-white bg-opacity-15 rounded-lg"
            @click="deleteCookie(index)"
          />
          <EditIcon
            fillColor="#515151"
            class="p-1 cursor-pointer overflow-visible absolute top-4 right-14 bg-white bg-opacity-15 rounded-lg"
            @click="selectedCookieToEdit(cookie)"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-green-900 text-xl mb-2">
              {{ cookie.name }}
            </div>
            <p class="text-xl font-medium">Ingredients:</p>
            <ul v-if="shouldShowAll(index)">
              <li
                v-for="(ingredient, index) in cookie.ingredients"
                :key="index"
                class="list-disc pl-4"
              >
                {{ ingredient }}
              </li>
            </ul>
            <ul v-else class="pl-4">
              <li
                v-for="(ingredient, index) in cookie.ingredients.slice(0, 3)"
                :key="index"
                class="list-disc"
              >
                {{ ingredient }}
              </li>
            </ul>
            <button
              @click="toggleVisibility(index)"
              v-if="cookie.ingredients.length > 3"
              class="text-blue-500 underline text-sm"
            >
              {{ shouldShowAll(index) ? "Show Less" : "Read More" }}
            </button>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span
              v-for="(tag, index) in cookie.tags"
              :key="index"
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { ref } from "vue";

import CloseIcon from "vue-material-design-icons/Close.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";

const props = defineProps({
  cookiesList: Array,
});

const emit = defineEmits([
  "removeCookie",
  "selectedCookieToEdit",
  "cookieIndex",
]);

const expandedCards = ref([]);

function shouldShowAll(index) {
  return expandedCards.value.includes(index);
}

function toggleVisibility(index) {
  if (expandedCards.value.includes(index)) {
    expandedCards.value = expandedCards.value.filter(
      (cardIndex) => cardIndex !== index
    );
  } else {
    expandedCards.value.push(index);
  }
}

const deleteCookie = (cookieIndex) => {
  emit("removeCookie", cookieIndex);
};
const selectedCookieToEdit = (currentCookie) => {
  emit("openModal");
  emit("selectedCookieToEdit", currentCookie);
};
</script>
