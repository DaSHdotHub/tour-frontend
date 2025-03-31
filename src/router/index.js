// Simple routing without vue-router

// Import views
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import DashboardView from '../views/DashboardView.vue'
import { h } from 'vue'

const routes = {
  '/': HomeView,
  '/signin': SignInView,
  '/signup': SignUpView,
  '/dashboard': DashboardView
}

export default {
  install(app) {
    app.config.globalProperties.$router = {
      currentRoute: window.location.pathname,
      
      push(location) {
        if (typeof location === 'string') {
          window.history.pushState(null, '', location)
          this.currentRoute = location
          app.config.globalProperties.$forceUpdate()
        } else if (location.name) {
          const path = '/' + (location.name === 'home' ? '' : location.name)
          window.history.pushState(null, '', path)
          this.currentRoute = path
          app.config.globalProperties.$forceUpdate()
        }
      }
    }
    
    app.component('router-view', {
      render() {
        const path = window.location.pathname || '/'
        const route = routes[path] || routes['/']
        return h(route)
      }
    })
    
    app.component('router-link', {
      props: {
        to: {
          type: [String, Object],
          required: true
        }
      },
      methods: {
        navigate(event) {
          event.preventDefault()
          
          if (typeof this.to === 'string') {
            this.$router.push(this.to)
          } else {
            this.$router.push(this.to)
          }
        }
      },
      render() {
        return h('a', {
          href: typeof this.to === 'string' ? this.to : '/' + this.to.name,
          onClick: this.navigate
        }, this.$slots.default())
      }
    })
    
    window.addEventListener('popstate', () => {
      app.config.globalProperties.$router.currentRoute = window.location.pathname
      app.config.globalProperties.$forceUpdate()
    })
  }
}