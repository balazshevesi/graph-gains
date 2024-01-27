<script setup lang="ts">
defineProps({
  to: String,
});

const count = ref(0);
count.value = 10;
</script>

<template>
  <button
    v-if="!to"
    class="bg-primary shadow-primary/50 outline-primary relative inline-block w-fit overflow-hidden rounded-md px-24 py-4 font-semibold uppercase text-white shadow-xl outline-4 outline-offset-4 focus:outline"
  >
    <slot />
  </button>
  <NuxtLink
    v-if="to"
    :to="to"
    class="bg-primary shadow-primary/50 outline-primary relative inline-block w-fit overflow-hidden rounded-md px-24 py-4 font-semibold uppercase text-white shadow-xl outline-4 outline-offset-4 focus:outline"
  >
    <slot />
  </NuxtLink>
</template>
