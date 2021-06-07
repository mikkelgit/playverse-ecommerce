import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Products from '../components/Products.vue'
import AddProduct from '../components/AddProduct.vue'
import EditProduct from '../components/EditProduct.vue'
import Categories from '../components/Categories.vue'
import Banners from '../components/Banners.vue'
import AddBanner from '../components/AddBanner.vue'
import Transaction from '../components/Transaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: { name: 'Dashboard' },
    component: Home,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'add',
        name: 'AddProduct',
        component: AddProduct
      },
      {
        path: 'edit/:id',
        name: 'EditProduct',
        component: EditProduct
      },
      {
        path: 'categories',
        name: 'Categories',
        component: Categories
      },
      {
        path: 'banners',
        name: 'Banners',
        component: Banners
      },
      {
        path: 'add-banner',
        name: 'AddBanner',
        component: AddBanner
      },
      {
        path: 'transaction',
        name: 'Transaction',
        component: Transaction
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !localStorage.access_token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
