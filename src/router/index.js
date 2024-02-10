import { createRouter, createWebHistory } from 'vue-router'
import PocetnaStranica from '../views/PocetnaStranica.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'pocetnaStranica',
      component: PocetnaStranica
    },
    {
      path: '/login',
      name: 'loginSignup',
      component: () => import('../views/LoginSignup.vue')
    },
    {
      path: '/profil',
      name: 'profilStranica',
      component: () => import('../views/ProfilStranica.vue')
    },
    {
      path: '/noviRecept',
      name: 'noviRecept',
      component: () => import('../views/NoviRecept.vue')
    },
    {
      path: '/oNama',
      name: 'oNama',
      component: () => import('../views/ONama.vue')
    },
    {
      path: '/recept/:id',
      name: 'receptStranica',
      component: () => import('../views/ReceptStranica.vue')
    },
    {
      path: '/shoppingLista',
      name: 'shoppingLista',
      component: () => import('../views/ShoppingLista.vue')
    }
  ]
})
export default router
