export default defineNuxtConfig({
  ssr: false,

  vite: {
    vue: {
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }
  },

  modules: [// ...
  [
    '@pinia/nuxt',
    {
      autoImports: [
        // automatically imports `defineStore`
        'defineStore',
      ],
    },
  ], "@nuxt/ui"],

  compatibilityDate: '2024-07-18',
});