export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  
  // Public routes
  const publicRoutes = ['/login']
  
  if (publicRoutes.includes(to.path)) {
    return
  }

  // Redirect to login if not authenticated
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})