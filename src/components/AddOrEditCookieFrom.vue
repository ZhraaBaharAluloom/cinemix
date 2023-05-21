<template>
  <div
    id="addCookie"
    class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75"
    @click.self="handleModal"
  >
    <form
      class="bg-amber-50 rounded-lg w-full max-w-sm p-10 relative"
      @submit.prevent="createOrEditCookie"
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
          v-model="cookieNameValue"
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-purple-500"
          id="inline-name"
          type="text"
          placeholder="Chocolate Chip Cookie"
          required
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 font-bold mb-1" for="inline-image">
          Image
        </label>
        <input
          v-model="cookieImageValue"
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
          v-model="cookieIngredientsValue"
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
          v-model="cookieCreatorValue"
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
const emits = defineEmits(["addCookie", "openModal", "editCookie"]);

const props = defineProps({
  isEditing: Boolean,
  oldCookie: Object,
});

const { name, ingredients, creator, image } = props.oldCookie;

const cookieNameValue = ref(props.isEditing ? name : "");
const cookieImageValue = ref(props.isEditing ? image : "");
const cookieIngredientsValue = ref(props.isEditing ? ingredients : []);
const cookieCreatorValue = ref(props.isEditing ? creator : null);

const createOrEditCookie = () => {
  if (
    cookieNameValue.value == "" ||
    cookieImageValue.value == "" ||
    cookieIngredientsValue.value == [] ||
    cookieImageValue.value == null
  ) {
    return console.warn("All fields are required");
  }
  const ingredients = props.isEditing
    ? cookieIngredientsValue.value
    : cookieIngredientsValue.value.split(", ");

  const newCookie = {
    name: cookieNameValue.value.trim(),
    ingredients: ingredients,
    image: cookieImageValue.value.trim(),
    creator: cookieCreatorValue.value.trim(),
  };
  if (props.isEditing) {
    emits("editCookie", props.oldCookie, newCookie);
  } else {
    emits("addCookie", newCookie);
    cookieNameValue.value = "";
    cookieImageValue.value = "";
    cookieIngredientsValue.value = [];
    cookieCreatorValue.value = null;
  }
};

const handleModal = () => {
  emits("openModal");
};
</script>
