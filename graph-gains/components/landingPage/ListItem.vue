<script setup lang="ts">
defineProps({
  title: String,
});
</script>
<template>
  <div class="flex-1">
    <div
      class="mb-4 w-fit text-balance border-b-4 border-neutral-200 pb-2 text-2xl font-bold"
    >
      {{ title }}
    </div>
    <div class="text-balance">
      <slot />
    </div>
  </div>
</template>
