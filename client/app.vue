<script setup lang="ts">
// import { clerkPlugin } from "vue-clerk/plugin";
import { OrganizationSwitcher, UserButton } from "vue-clerk";

// const app = useNuxtApp().vueApp;

// app.use(clerkPlugin, {
//   publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
// });
</script>

<template>
  <div class="selection:bg-primary/50">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
