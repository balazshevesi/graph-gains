<script setup lang="ts">
defineProps({
  title: String,
});
</script>
<template>
  <div class="flex-1">
    <div
      class="border-primary/50 mb-4 w-fit text-balance border-b-4 px-1 pb-2 text-2xl font-bold drop-shadow-md"
    >
      {{ title }}
    </div>
    <div class="text-balance">
      <slot />
    </div>
  </div>
</template>
