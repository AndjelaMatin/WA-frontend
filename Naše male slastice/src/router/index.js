import { createRouter, createWebHistory } from 'vue-router'
import 'bootstrap/dist/css/bootstrap.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: () => import('../views/Pocetna.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/Profil.vue')
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
      path: '/recept',
      name: 'recept',
      component: () => import('../views/Recept.vue')
    },
    {
      path: '/shoppingLista',
      name: 'shoppingLista',
      component: () => import('../views/ShoppingLista.vue')
    },
    {
      path: '/mojaBiblioteka',
      name: 'mojaBiblioteka',
      component: () => import('../views/MojaBiblioteka.vue')
    }
  ]
})

export default router
