<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="navbar-brand" to="/">IdiliaSoft</router-link>
      
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" 
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/signin">Sign In</router-link>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'home' })
        })
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: var(--deep-navy) !important;
  padding: 15px 0;
}

.navbar-brand {
  color: var(--pure-white) !important;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-link {
  color: var(--pure-white) !important;
  margin: 0 10px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--golden-amber) !important;
}
</style>