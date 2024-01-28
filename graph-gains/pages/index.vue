<script setup lang="ts">
import { useAuth, SignInButton, UserButton } from "vue-clerk";

// const count = ref(0);
// count.value = 10;

const { isSignedIn } = useAuth();
</script>

<template>
  <Container class="py-32">
    <div
      class="flex flex-col items-center justify-center gap-8 text-center md:flex-row md:text-left"
    >
      <div class="flex-1 flex-col items-center justify-center lg:min-w-[30rem]">
        <div class="flex-1">
          <h1 class="mb-8 text-balance text-5xl font-black drop-shadow-lg">
            Weight Tracking Without The Friction
          </h1>
          <p class="mb-8 text-balance">
            We believe that weight tracking should be easy and frictionless.
            that's why we created GraphGains.
          </p>
          <div v-if="!isSignedIn">
            <CtaButton to="/login">try for free</CtaButton>
          </div>
          <div v-if="isSignedIn">
            <CtaButton to="/dashboard">View dashboard</CtaButton>
          </div>
        </div>
      </div>
      <div class="flex w-full flex-1 items-center justify-center">
        <img
          class="w-full rounded-xl shadow-xl"
          src="https://buildfire.com/wp-content/uploads/2022/03/Banking-700x527.png"
        />
      </div>
    </div>
  </Container>
  <Container class="max-w-5xl">
    <div
      class="flex w-full flex-col justify-between gap-12 text-center md:flex-row md:text-left"
    >
      <LandingPageListItem title="💾 Migrate your data"
        >Migrate your existing weight data from myfitnesspal to GraphGains
      </LandingPageListItem>
      <LandingPageListItem title="⚡ Blazingly fast"
        >Make new entries faster than ever. Use your phones camera to scan the
        scale
      </LandingPageListItem>
      <LandingPageListItem title="⏳ Long term thinking"
        >Unlike many other apps, GraphGains is designed from the ground up to be
        used for years
      </LandingPageListItem>
    </div>
  </Container>
  <Container class="mb-16 flex max-w-3xl flex-col items-center text-center">
    <h1 class="mb-8 text-balance text-4xl font-black drop-shadow-lg">
      Are you with us or not?
    </h1>
    <p class="mb-8 text-balance">
      We're currently still in the process of building and defining our
      services. If you want to support us, donate to our github.
    </p>
    <CtaButton to="https://github.com/Balazs-topg">Donate</CtaButton>
  </Container>
</template>
