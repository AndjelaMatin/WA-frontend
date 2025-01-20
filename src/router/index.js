import { createRouter, createWebHistory} from 'vue-router'
import PocetnaStranica from '../views/PocetnaStranica.vue'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes: [
    {
      path: '/',
      name: 'pocetnaStranica',
      component: PocetnaStranica,
      props:true,
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
      path: '/recepti/:id',
      name: 'ReceptStranica',
      component: () => import('../views/ReceptStranica.vue'),
      props:true,
    },
    {
      path: '/shoppingLista',
      name: 'shoppingLista',
      component: () => import('../views/ShoppingLista.vue')
    }
  ]
})
export default router
