export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Public routes
  const publicRoutes = ['/login']
  
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Initialize auth store from localStorage if not already initialized
  if (!authStore.isAuthenticated && process.client) {
    authStore.init()
  }

  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})