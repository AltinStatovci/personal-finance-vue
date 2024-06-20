import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from "@/views/auth/RegisterView.vue";
import LogInView from "@/views/auth/LogInView.vue";
import {useAuthStore} from "@/stores/authStore.js";
import ProfileView from "@/views/ProfileView.vue";
import AddCashOrExpensesView from "@/views/AddCashOrExpensesView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/logIn',
      name: 'logIn',
      component: LogInView
    },

    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/addCashOrExpenses',
      name: 'addCashOrExpenses',
      component: AddCashOrExpensesView,
      meta: {
        requiresAuth: true
      }
    },


  ]
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: 'logIn',
      // save the location we were at to come back later
      query: {redirect: to.fullPath},
    }
  } else if (!to.meta.requiresAuth && authStore.isLoggedIn) {
    return {
      name: 'home'
    }
  }
})

export default router

