import Vue from 'vue'
import App from './App'
import router from './router.js'
import { store } from './store.js'

const firebase = require('./firebaseConfig.js')

Vue.config.productionTip = false

// handle page reloads
let app
firebase.auth.onAuthStateChanged(user => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App)
        })
    }
})