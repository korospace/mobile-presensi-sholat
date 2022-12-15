import { authCheck, authorizationCheck, loginCheck } from '@/services/router.service'
import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginView          from '@/views/LoginView.vue'
import HomeView           from '@/views/HomeView.vue'
import PresensiView       from '@/views/PresensiView.vue'
import ProfileView        from '@/views/ProfileView.vue'
import ChangePasswordView from '@/views/ChangePasswordView.vue'
import HistoryView        from '@/views/HistoryView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    beforeEnter: loginCheck,
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/presensi',
    children   : [
      {
        path: '/presensi',
        name: 'presensi',
        component: PresensiView,
      },
      {
        path: '/profile',
        name: 'profile',
        component: ProfileView,
        beforeEnter: authCheck,
      },
      {
        path: '/history',
        name: 'history',
        component: HistoryView,
        beforeEnter: authCheck,
      },
    ]
  },
  {
    path: '/changepassword',
    name: 'change password',
    component: ChangePasswordView,
    beforeEnter: authCheck,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
