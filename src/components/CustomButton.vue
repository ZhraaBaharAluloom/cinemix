<template>
  <button @click="handleClick">
    <slot></slot>
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped>
/* No custom styles needed */
</style>
