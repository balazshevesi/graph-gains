<script setup lang="ts">
defineProps({
  text: String,
});

const count = ref(0);
count.value = 10;
</script>

<template>
  <button
    class="relative overflow-hidden rounded-md bg-neutral-400 px-4 py-1 font-semibold uppercase text-white shadow"
  >
    <slot />
  </button>
</template>
