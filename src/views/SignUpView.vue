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
      <h3 class="form-title">Create a new account!</h3>
      <form @submit.prevent="handleSignUp" class="mb-2">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="name" 
            v-model="form.name" 
            placeholder="Enter Your Name" 
            required
          >
        </div>
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
            minlength="8"
          >
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            class="form-control" 
            id="confirmPassword" 
            v-model="form.confirmPassword" 
            placeholder="Confirm Your Password" 
            required
          >
        </div>
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Signing up...' : 'Sign Up' }}
        </button>
      </form>
      <p class="text-center mt-3">
        Already have an account? <router-link to="/signin">Sign In</router-link>
      </p>
    </div>
    
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar.vue'
import TheFooter from '../components/TheFooter.vue'

export default {
  name: 'SignUpView',
  components: {
    TheNavbar,
    TheFooter
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    clearError() {
      this.error = null
    },
    validateForm() {
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match'
        return false
      }
      
      if (this.form.password.length < 8) {
        this.error = 'Password must be at least 8 characters long'
        return false
      }
      
      return true
    },
    async handleSignUp() {
      if (!this.validateForm()) {
        return
      }
      
      this.loading = true
      this.error = null
      
      try {
        await this.$store.dispatch('register', { 
          name: this.form.name,
          email: this.form.email, 
          password: this.form.password 
        })
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        this.error = error.message || 'Failed to sign up. Please try again.'
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