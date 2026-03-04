export default defineNuxtRouteMiddleware((to, from) => {
  // Skip auth check on server-side rendering
  // Auth will be checked on client-side only
  if (process.server) {
    return
  }

  // Check if user has a token in localStorage
  const token = localStorage.getItem('access_token')
  console.log('🔍 Middleware check - Token in localStorage:', token ? 'EXISTS' : 'MISSING')
  console.log('🔍 Navigating to:', to.path)
  
  // If user is authenticated and trying to access login page, redirect to home
  if (to.path === '/login' && token) {
    console.log('✅ User authenticated, redirecting to /')
    return navigateTo('/')
  }
  
  // If user is authenticated, allow navigation
  if (token) {
    console.log('✅ Token found, allowing navigation')
    return
  }
  
  // Public routes that don't require authentication
  const publicRoutes = ['/login']
  
  if (publicRoutes.includes(to.path)) {
    console.log('✅ Public route, allowing navigation')
    return
  }

  // Not authenticated and trying to access protected route
  console.log('❌ No token found, redirecting to /login')
  return navigateTo('/login')
})