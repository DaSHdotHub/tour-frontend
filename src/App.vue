<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
:root {
  --deep-navy: #1a1a2e;
  --plum-purple: #2d2d44;
  --coral-pink: #e94560;
  --golden-amber: #f9c74f;
  --lime-green: #90be6d;
  --pure-white: #f4f4f4;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--deep-navy);
  color: var(--pure-white);
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1 0 auto;
}

.btn-primary {
  background-color: var(--coral-pink);
  border-color: var(--coral-pink);
  border-radius: 10px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}

.btn-primary:hover {
  background-color: var(--golden-amber);
  border-color: var(--golden-amber);
}

.form-control {
  background-color: var(--plum-purple);
  border: none;
  border-radius: 10px;
  color: var(--pure-white);
}

.form-control:focus {
  background-color: var(--plum-purple);
  box-shadow: 0 0 0 0.2rem rgba(206, 212, 218, 0.25);
  color: var(--pure-white);
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-group label {
  font-weight: bold;
  color: var(--lime-green);
}

.alert {
  background-color: var(--plum-purple);
  color: var(--pure-white);
  border: none;
}
</style>