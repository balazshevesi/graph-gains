<template>
  <div class="bg-neutral-50">
    <nav
      class="sticky top-0 z-50 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-lg"
    >
      <div class="flex w-full justify-center">
        <div class="flex w-full max-w-6xl items-center px-4 py-4">
          <NuxtLink to="/" class="text-2xl font-bold">GraphGains</NuxtLink>
          <div class="ml-auto">
            <NavButton>login</NavButton>
          </div>
        </div>
      </div>
    </nav>
    <slot />
    <footer class="bg-neutral-700 px-4 py-24 text-white">
      <div class="mx-auto w-full max-w-5xl font-semibold">
        GraphGains is a service that's being built by Balazs Hevesi
      </div>
    </footer>
  </div>
</template>
