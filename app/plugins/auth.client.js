export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  // Initialize auth state from localStorage before any navigation happens
  authStore.init()
})
