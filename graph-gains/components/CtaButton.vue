<script setup lang="ts">
defineProps({
  text: String,
});

const count = ref(0);
count.value = 10;
</script>

<template>
  <button
    class="bg-primary shadow-primary/50 relative overflow-hidden rounded-md px-24 py-4 font-semibold uppercase text-white shadow-xl"
  >
    <slot />
  </button>
</template>
