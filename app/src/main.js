import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Home from './views/Home'
import About from './views/About'

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
]

const router = new VueRouter({
    routes
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
