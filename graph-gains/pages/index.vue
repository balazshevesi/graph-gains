<script setup lang="ts">
const count = ref(0);
count.value = 10;
</script>

<template>
  <Container class="py-32">
    <div class="flex">
      <div class="flex flex-1 items-center justify-center">
        <div>
          <h1 class="mb-8 text-balance text-5xl font-black">
            Weight Tracking Without The Friction
          </h1>
          <p class="mb-8 text-balance">
            We believe that weight tracking should be easy and frictionless.
            that's why we created GraphGains.
          </p>
          <Button class="px-24 py-4">try for free</Button>
          <div class="py-4 font-medium text-neutral-500">View dashboard</div>
        </div>
      </div>
      <div class="flex w-full flex-1 items-center justify-center">
        <img
          class="w-full rounded-xl saturate-0"
          src="https://buildfire.com/wp-content/uploads/2022/03/Banking-700x527.png"
        />
      </div>
    </div>
  </Container>
  <Container class="max-w-5xl">
    <div class="flex w-full justify-between gap-12">
      <LandingPageListItem title="Import your data"
        >Import your existing weight data from myfitnesspal to GraphGains
      </LandingPageListItem>
      <LandingPageListItem title="Blazingly fast"
        >Make new entries faster than ever. Use your phones camera to scan the
        scale
      </LandingPageListItem>
      <LandingPageListItem title="Think long term"
        >Unlike many other apps, GraphGains is designed from the ground up to be
        used for years.
      </LandingPageListItem>
    </div>
  </Container>
  <Container class="max-w-4xl text-center">
    <h1 class="mb-8 text-balance text-4xl font-black">
      Are you with us or not?
    </h1>
    <p class="mb-8 text-balance">
      We're currently still in the process of building and defining our
      services. If you want to support us, donate to our github.
    </p>
    <Button class="px-24 py-4">Donate</Button>
  </Container>
</template>
