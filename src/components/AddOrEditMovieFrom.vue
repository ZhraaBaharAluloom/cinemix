<template>
  <div
    id="addMovie"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
    @click.self="handleModal"
  >
    <form
      class="bg-amber-50 rounded-lg w-full max-w-sm p-10 relative"
      @submit.prevent="createOrEditMovie"
    >
      <CloseIcon
        fillColor="#515151"
        class="absolute top-5 right-5 cursor-pointer"
        @click="handleModal"
      />
      <h1 class="text-center font-semibold text-xl pb-5 text-green-800">
        Share Your Best Recipe!
      </h1>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-1" for="inline-name">
          Name
        </label>
        <input
          v-model="movieNameValue"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          id="inline-name"
          type="text"
          placeholder="Chocolate Chip Movie"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-1" for="inline-image">
          Image
        </label>
        <input
          v-model="movieImageValue"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          id="inline-image"
          type="text"
          placeholder="https://example.png/jpg/"
          required
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 font-bold mb-1"
          for="inline-ingredients"
        >
          Ingredients
        </label>
        <input
          v-model="movieIngredientsValue"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          id="inline-ingredients"
          type="text"
          placeholder="1 cup flour, 1 cup butter ..."
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-1" for="inline-creator">
          Creator Name
        </label>
        <input
          v-model="movieCreatorValue"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          id="inline-creator"
          type="text"
          placeholder="Hamza"
          required
        />
      </div>
      <div class="mb-6">
        <label class="flex items-center text-gray-700 font-bold">
          <input class="mr-2 leading-tight" type="checkbox" />
          <span class="text-sm">Send me all new recipes!</span>
        </label>
      </div>
      <div class="flex justify-center">
        <custom-button
          required
          class="w-full bg-green-800 hover:bg-purple-400 focus:outline-none focus:ring focus:ring-purple-500 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          {{ isEditing ? "Save" : "Add" }}
        </custom-button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CustomButton from "./CustomButton.vue";
import CloseIcon from "vue-material-design-icons/Close.vue";
const emits = defineEmits(["addMovie", "openModal", "editMovie"]);

const props = defineProps({
  isEditing: Boolean,
  oldMovie: Object,
});

const { name, ingredients, creator, image } = props.oldMovie;

const movieNameValue = ref(props.isEditing ? name : "");
const movieImageValue = ref(props.isEditing ? image : "");
const movieIngredientsValue = ref(props.isEditing ? ingredients : []);
const movieCreatorValue = ref(props.isEditing ? creator : null);

const createOrEditMovie = () => {
  if (
    movieNameValue.value == "" ||
    movieImageValue.value == "" ||
    movieIngredientsValue.value == [] ||
    movieImageValue.value == null
  ) {
    return console.warn("All fields are required");
  }
  const ingredients = props.isEditing
    ? movieIngredientsValue.value
    : movieIngredientsValue.value.split(", ");

  const newMovie = {
    name: movieNameValue.value.trim(),
    ingredients: ingredients,
    image: movieImageValue.value.trim(),
    creator: movieCreatorValue.value.trim(),
  };
  if (props.isEditing) {
    emits("editMovie", props.oldMovie, newMovie);
  } else {
    emits("addMovie", newMovie);
    movieNameValue.value = "";
    movieImageValue.value = "";
    movieIngredientsValue.value = [];
    movieCreatorValue.value = null;
  }
};

const handleModal = () => {
  emits("openModal");
};
</script>
