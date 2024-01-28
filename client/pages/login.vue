<script setup lang="ts">
import { SignIn } from "vue-clerk";
</script>

<template>
  <Container>
    <div class="flex h-full w-full items-center justify-center">
      <SignIn redirectUrl="/dashboard" signUpUrl="/signup" />
    </div>
  </Container>
</template>
