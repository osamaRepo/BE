import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    // Initialize auth state from localStorage
    init() {
      if (process.client) {
        const token = localStorage.getItem('access_token')
        const user = localStorage.getItem('user')
        
        if (token && user) {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true
        }
      }
    },

    async login(email, password) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password}
        })

        if (response.code === 1) {
          this.user = response.data.user
          this.token = response.data.token
          this.isAuthenticated = true
          
          // Save to localStorage
          if (process.client) {
            localStorage.setItem('access_token', response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.user))
          }
          
          navigateTo('/')
        } else {
          throw new Error(response.error || 'Login failed')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      
      // Clear localStorage
      if (process.client) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
      }
      
      navigateTo('/login')
    }
  }
})