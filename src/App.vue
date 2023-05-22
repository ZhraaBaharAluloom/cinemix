<template>
  <div
    class="bg-cover bg-center min-h-[100vh]"
    style="
      background-image: linear-gradient(
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0)
        ),
        url('https://images.pexels.com/photos/5618031/pexels-photo-5618031.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
    "
  >
    <Navbar @openModal="openModal" />

    <CookieList
      :cookiesList="cookiesList"
      @removeCookie="removeCookie"
      @selectedCookieToEdit="selectedCookieToEdit"
      @openModal="openModal"
    />
    <Transition>
      <AddOrEditCookieFrom
        v-if="open"
        :oldCookie="oldCookie"
        :isEditing="isEditing"
        @addCookie="addCookie"
        @openModal="openModal"
        @editCookie="editCookie"
      />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import cookies from "./cookies";

import AddOrEditCookieFrom from "./components/AddOrEditCookieFrom.vue";
import CookieList from "./components/CookieList.vue";
import Navbar from "./components/Navbar.vue";

let cookiesList = ref(cookies);
let open = ref(false);
let isEditing = ref(false);
let oldCookie = ref({});

const addCookie = (newCookie) => {
  cookiesList.value.push(newCookie);
  open.value = false;
};

const removeCookie = (cookieIndex) => {
  const confirmDelete = confirm(
    "Are you absolutely positive you want to demolish this delicious cookie? It may shed a tear or two... 🍪😐"
  );
  if (confirmDelete) {
    cookiesList.value.splice(cookieIndex, 1);
    alert("Cookie successfully obliterated! 💥😄");
  } else {
    alert("Phew! The cookie has been spared. It breathes a sigh of relief. 🍪");
  }
};

const editCookie = (currentCookie, editedCookie) => {
  const foundCookie = cookiesList.value.indexOf(currentCookie);
  cookiesList.value.map((cookie, index) => {
    if (foundCookie == index) {
      Object.assign(cookie, editedCookie);
    }
    open.value = !open.value;
    isEditing.value = false;
  });
};

const selectedCookieToEdit = (currentCookie) => {
  isEditing.value = true;
  oldCookie.value = currentCookie;
};

const openModal = () => {
  open.value = !open.value;
};
</script>
