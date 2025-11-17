import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Card/Login.vue'
import Register from '../views/Card/Register.vue'
import Card from '../views/Card/Card.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/card', name: 'card', component: Card },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
