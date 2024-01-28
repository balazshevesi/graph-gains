<script setup>
import { PlusIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <Container
    ><div class="mb-8 h-96 w-full rounded-xl bg-white shadow-lg"></div>
    <div class="mx-auto mb-5 flex max-w-lg flex-col gap-4">
      <button
        class="bg-primary shadow-primary/50 outline-primary flex items-center justify-center rounded-lg px-6 py-2 text-center font-medium text-white shadow-lg outline-4 outline-offset-4 focus:outline"
      >
        Add entry <PlusIcon class="ml-2 size-6 stroke-2" />
      </button>
    </div>
    <div class="mx-auto flex max-w-lg flex-col gap-4">
      <DashboardEntry />
      <DashboardEntry />
      <DashboardEntry />
      <DashboardEntry />
      <DashboardEntry />
    </div>
  </Container>
</template>
