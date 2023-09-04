import { createRouter, createWebHistory } from 'vue-router'
import Register from "@/views/Register.vue";
import Expenses from "@/views/Expenses.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: Expenses
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/expenses') {
    const hasLogin = !!localStorage.token
    if (hasLogin) {
      next()
    } else {
      next({
        replace: false,
        name: 'login'
      })
    }
  } else {
    next()
  }
})

export default router
