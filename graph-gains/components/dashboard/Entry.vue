import type { split } from 'postcss/lib/list';
<script setup lang="ts">
defineProps({
  to: String,
});

const count = ref(0);
count.value = 10;

const date = new Date();
const formattedDate = date.toISOString().split("T")[0];

const weight = "72 kg";
</script>

<template>
  <div class="flex w-full rounded-xl bg-white p-4 shadow-md">
    <div class="flex flex-col gap-2">
      <div class="font-semibold">{{ weight }}</div>
      <div class="text-sm font-bold text-neutral-600">{{ formattedDate }}</div>
    </div>
  </div>
</template>
