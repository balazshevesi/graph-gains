<template>
  <nav class="min-h-screen bg-neutral-50">
    <div
      class="sticky top-0 z-50 flex w-full justify-center bg-white shadow-md"
    >
      <div class="flex w-full max-w-6xl items-center px-4 py-3">
        <NuxtLink to="/" class="text-2xl font-bold">GraphGains</NuxtLink>
        <div class="ml-auto"><Button>login</Button></div>
      </div>
    </div>
    <slot />
    <footer class="bg-neutral-700 px-4 py-24 text-white">
      <div class="mx-auto w-full max-w-5xl font-medium">
        GraphGains is a service that's being built by Balazs Hevesi
      </div>
    </footer>
  </nav>
</template>
