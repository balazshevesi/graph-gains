<script setup lang="ts">
import { SignUp } from "vue-clerk";
</script>

<template>
  <Container>
    <div class="flex h-full w-full items-center justify-center">
      <SignUp redirectUrl="/dashboard" signInUrl="/login" />
    </div>
  </Container>
</template>
