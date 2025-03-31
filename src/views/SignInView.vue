<template>
  <div>
    <TheNavbar />
    
    <div class="alert alert-danger alert-dismissible fade show" role="alert" v-if="error">
      <strong>Error:</strong> {{ error }}
      <button type="button" class="close" @click="clearError" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    
    <div class="container">
      <h3 class="form-title">Log In to your account!</h3>
      <form @submit.prevent="handleSignIn" class="mb-2">
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            class="form-control" 
            id="email" 
            v-model="form.email" 
            placeholder="Enter Your Email" 
            required
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="password" 
            v-model="form.password" 
            placeholder="Enter Your Password" 
            required
          >
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>
      <p class="text-center mt-3">
        Don't have an account? <router-link to="/signup">Sign Up</router-link>
      </p>
    </div>
    
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  name: 'SignInView',
  components: {
    TheNavbar,
    TheFooter
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    clearError() {
      this.error = null
    },
    async handleSignIn() {
      this.loading = true
      this.error = null
      
      try {
        await this.$store.dispatch('login', { 
          email: this.form.email, 
          password: this.form.password 
        })
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = error.message || 'Failed to log in. Please try again.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 20px;
}

.form-title {
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  margin-bottom: 30px;
  color: var(--golden-amber);
}

.alert {
  margin: 20px auto;
  max-width: 600px;
}

a {
  color: var(--golden-amber);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .container {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>