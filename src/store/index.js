import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: localStorage.getItem('user') !== null
  },
  getters: {
    isAuthenticated: state => state.isAuthenticated,
    currentUser: state => state.user
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      state.isAuthenticated = user !== null
      
      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }
  },
  actions: {
    login({ commit }, credentials) {
      // Here you would normally perform an API call to authenticate
      // For this example, we'll mock the login
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: 1,
            email: credentials.email,
            name: 'Demo User'
          }
          commit('SET_USER', user)
          resolve(user)
        }, 1000)
      })
    },
    
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('SET_USER', null)
        resolve()
      })
    },
    
    register({ commit }, userData) {
      // Here you would normally perform an API call to register
      // For this example, we'll mock the registration
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = {
            id: 1,
            email: userData.email,
            name: userData.name
          }
          commit('SET_USER', user)
          resolve(user)
        }, 1000)
      })
    }
  },
  modules: {
  }
})