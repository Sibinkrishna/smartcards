import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './services/api.js'
// ===============================
// FONT AWESOME SETUP (REQUIRED)
// ===============================
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Import brand icons
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'

// Add icons to library
library.add(faGoogle, faFacebook)

// ===============================
// CREATE APP
// ===============================
const app = createApp(App)

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
