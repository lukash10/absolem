import Home from '../views/Home.vue';
import Dashboard from '../dashboard/Dashboard.vue';
import ListProduct from '../components/ListProduct.vue';


import { createRouter, createWebHistory } from 'vue-router';

const history = createWebHistory()
const routes = [
  {
    path: '/dashboard',name: 'Dashboard',component: Dashboard,
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/listproduct',name: 'ListProduct',component: ListProduct,
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/cadproduto',
    name: 'CadProduto',
    component: () => import('../dashboard/produto/CadProd.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/listproduto',
    name: 'ListProduto',
    component: () => import('../dashboard/produto/ListProd.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/subcadcat',
    name: 'SubCadCat',
    component: () => import('../dashboard/subcategoria/SubCadCat.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/sublistcat',
    name: 'SubListCat',
    component: () => import('../dashboard/subcategoria/SubListCat.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/cadcat',
    name: 'CadCat',
    component: () => import('../dashboard/categoria/CadCat.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/listcat',
    name: 'ListCat',
    component: () => import('../dashboard/categoria/ListCat.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/listTabacaria',
    name: 'ListTabacaria',
    component: () => import('../components/ListTabacaria.vue'),
    meta: {
      layout: 'dashboard'
    }
  },
]
const router = createRouter({
  linkActiveClass: 'active',
  history,
  routes
})

export { router }
