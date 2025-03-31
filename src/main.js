import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Import FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin, faGithub, faXing } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Add icons to the library
library.add(faLinkedin, faGithub, faXing)

const app = createApp(App)

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(store)
app.use(router)
app.mount('#app')