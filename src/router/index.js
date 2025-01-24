import { createRouter, createWebHistory } from 'vue-router';
import PocetnaStranica from '../views/PocetnaStranica.vue';
import store from '@/services/store';

const routes = [
  {
    path: '/',
    name: 'pocetnaStranica',
    component: PocetnaStranica,
    props:true,
  },
  {
    path: '/login',
    name: 'loginSignup',
    component: () => import('../views/LoginSignup.vue'),
  },
  {
    path: '/profil',
    name: 'profilStranica',
    component: () => import('../views/ProfilStranica.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/noviRecept',
    name: 'noviRecept',
    component: () => import('../views/NoviRecept.vue'),
    meta: { requiresAuth: true }, 
  },
  {
    path: '/oNama',
    name: 'oNama',
    component: () => import('../views/ONama.vue'),
  },
  {
    path: '/recept/:id',
    name: 'receptStranica',
    component: () => import('../views/ReceptStranica.vue'),
    props:true,
    meta: { requiresAuth: true },
  },
  {
    path: '/shoppingLista',
    name: 'shoppingLista',
    component: () => import('../views/ShoppingLista.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/mojiRecepti',
    name: 'mojiRecepti',
    component: () => import('../views/MojiRecepti.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/uredirecept/:id',
    name: 'urediRecept',
    component: () => import('../views/UrediRecept.vue'),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL || '/'),
  routes, 
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isAuthenticated; 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/profil');
  } else {
    console.log(`Navigating to: ${to.path}, Authenticated: ${store.state.isAuthenticated}`);
    next();
  }
});

export default router;