import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)

// Register h globally for our router implementation
window.h = h

app.mount('#app')