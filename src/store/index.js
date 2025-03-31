// Simple state management without Vuex
const store = {
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: localStorage.getItem('user') !== null
  },
  
  getters: {
    isAuthenticated() {
      return store.state.isAuthenticated
    },
    currentUser() {
      return store.state.user
    }
  },
  
  mutations: {
    SET_USER(user) {
      store.state.user = user
      store.state.isAuthenticated = user !== null
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }
  },
  
  actions: {
    login(credentials) {
      // Here you would normally perform an API call to authenticate
      // For this example, we'll mock the login
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: 1,
            email: credentials.email,
            name: 'Demo User'
          }
          store.mutations.SET_USER(user)
          resolve(user)
        }, 1000)
      })
    },
    
    logout() {
      return new Promise((resolve) => {
        store.mutations.SET_USER(null)
        resolve()
      })
    },
    
    register(userData) {
      // Here you would normally perform an API call to register
      // For this example, we'll mock the registration
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: 1,
            email: userData.email,
            name: userData.name
          }
          store.mutations.SET_USER(user)
          resolve(user)
        }, 1000)
      })
    }
  }
}

export default {
  install(app) {
    app.config.globalProperties.$store = {
      state: store.state,
      
      getters: store.getters,
      
      dispatch(action, payload) {
        return store.actions[action](payload)
      }
    }
  }
}