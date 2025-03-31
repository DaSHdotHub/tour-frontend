<template>
  <div>
    <TheNavbar />
    
    <div class="container">
      <div class="home-content">
        <h1 class="home-title">Welcome to Tour</h1>
        <p class="home-subtitle">Create documents as you need them!</p>
        
        <div class="action-buttons">
          <router-link v-if="!isAuthenticated" to="/signin" class="btn btn-primary btn-lg">Sign In</router-link>
          <router-link v-if="!isAuthenticated" to="/signup" class="btn btn-outline-primary btn-lg">Sign Up</router-link>
          <router-link v-if="isAuthenticated" to="/dashboard" class="btn btn-primary btn-lg">Go to Dashboard</router-link>
        </div>
        
        <div class="features">
          <div class="feature">
            <h3>Easy to Use</h3>
            <p>Our intuitive interface makes project tracking a breeze</p>
          </div>
          <div class="feature">
            <h3>Collaboration</h3>
            <p>Work together with your team in real-time</p>
          </div>
          <div class="feature">
            <h3>Reporting</h3>
            <p>Generate detailed reports to track your progress</p>
          </div>
        </div>
      </div>
    </div>
    
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  components: {
    TheNavbar,
    TheFooter
  },
  computed: {
    ...mapGetters(['isAuthenticated'])
  }
}
</script>

<style scoped>
.container {
  padding: 50px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.home-content {
  text-align: center;
}

.home-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: var(--golden-amber);
  margin-bottom: 20px;
}

.home-subtitle {
  font-size: 1.5rem;
  color: var(--pure-white);
  margin-bottom: 40px;
}

.action-buttons {
  margin-bottom: 60px;
}

.action-buttons .btn {
  margin: 0 10px;
  min-width: 150px;
}

.btn-outline-primary {
  border-color: var(--coral-pink);
  color: var(--coral-pink);
}

.btn-outline-primary:hover {
  background-color: var(--coral-pink);
  color: var(--pure-white);
}

.features {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
}

.feature {
  flex-basis: 300px;
  margin: 20px;
  padding: 30px;
  background-color: var(--plum-purple);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-10px);
}

.feature h3 {
  color: var(--golden-amber);
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .home-title {
    font-size: 2.5rem;
  }
  
  .action-buttons .btn {
    display: block;
    width: 100%;
    margin: 10px 0;
  }
}
</style>