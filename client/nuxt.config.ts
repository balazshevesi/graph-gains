// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  build: {
    transpile: ["vue-clerk", "@clerk/clerk-js"],
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
      apiBase: process.env.API_BASE,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
});
