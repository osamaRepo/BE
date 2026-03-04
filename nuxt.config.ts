export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  components: true, 
  modules: ['@pinia/nuxt'],
  css: ['vuetify/styles', '@mdi/font/css/materialdesignicons.css'],
  build: {
    transpile: ['vuetify'],
  },
})