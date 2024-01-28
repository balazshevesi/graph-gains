<script setup lang="ts">
import { useAuth, SignInButton, UserButton } from "vue-clerk";

const { isSignedIn } = useAuth();
</script>

<template>
  <div class="bg-neutral-50">
    <!-- <div class="bg-red-500 p-1 text-center font-bold text-white">
      ⚠️ This project is in the process of being built
    </div> -->
    <nav
      class="sticky top-0 z-50 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-lg"
    >
      <div class="flex w-full justify-center">
        <div class="flex w-full max-w-6xl items-center px-4 py-4">
          <NuxtLink to="/" class="text-2xl font-bold">GraphGains</NuxtLink>
          <div class="ml-auto">
            <div v-if="isSignedIn" class="flex gap-2">
              <NavButton to="/dashboard">View dashboard</NavButton>
              <UserButton afterSignOutUrl="/" />
            </div>
            <div v-if="!isSignedIn" class="flex">
              <NavButton to="/login">login</NavButton>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="min-h-screen">
      <slot />
    </div>
    <footer class="bg-neutral-700 px-4 py-24 text-white">
      <div class="mx-auto w-full max-w-5xl font-semibold">
        GraphGains is a service that's being built by Balazs Hevesi
      </div>
    </footer>
  </div>
</template>
