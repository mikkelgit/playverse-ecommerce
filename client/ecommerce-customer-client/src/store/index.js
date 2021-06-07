import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import Swal from 'sweetalert2'
import router from '../router'
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    loggedIn: false,
    cart: [],
    wishlists: [],
    banners: []
  },
  mutations: {
    updateProducts (state, payload) {
      state.products = payload.products
    },
    updateLoggedStatus (state, payload) {
      state.loggedIn = payload.status
    },
    updateCart (state, payload) {
      state.cart = payload.cart
    },
    updateWishlists (state, payload) {
      state.wishlists = payload.wishlists
    },
    updateBanners (state, payload) {
      state.banners = payload.banners
    }
  },
  actions: {
    getProducts (context) {
      axios.get('/products')
        .then(({ data }) => {
          context.commit('updateProducts', { products: data })
        })
        .catch(err => {
          console.log(err);
        })
    },
    getCart (context) {
      axios.get('/cart', {
        headers: { access_token: localStorage.access_token }
      })
      .then(({ data }) => {
        context.commit('updateCart', { cart: data })
      })
      .catch(err => {
        console.log(err);
      })
    },
    addToCart (context, data) {
      if (!localStorage.access_token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'To add item to cart, please login first',
        })
      } else {
        axios.post('/cart', { ProductId: data.id }, {
          headers: { access_token: localStorage.access_token }
        })
          .then(data => {
            context.dispatch('getCart')
            Toast.fire({
              icon: 'success',
              title: 'Product added to cart'
            })
          })
          .catch(err => {
            Swal.fire({
              icon: 'error',
              title: 'Cant add product to cart',
              text: err.response.data.message
            })
          })
      }
    },
    deleteCartItem (context, data) {
      axios.delete('/cart/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          context.dispatch('getCart')
          Toast.fire({
            icon: 'success',
            title: 'Product removed from cart'
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    updateQuantity (context, data) {
      axios.patch('/cart/' + data.id, { newQuantity: data.quantity } ,{
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          context.dispatch('getCart')
          Toast.fire({
            icon: 'success',
            title: 'Product quantity updated'
          })
        })
        .catch(err => {
          Swal.fire({
            icon: 'error',
            title: 'Cant add product to cart',
            text: err.response.data.message
          })
        })
    },
    login (context, data) {
      axios.post('/login', data)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.dispatch('checkAuth')
          Toast.fire({
            icon: 'success',
            title: 'Logged In'
          })
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    register (context, data) {
      axios.post('/register', data)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          context.dispatch('checkAuth')
          router.push({ name: 'Home' })
          Toast.fire({
            icon: 'success',
            title: 'Registered, Logged In'
          })
        })
        .catch(err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    checkAuth (context) {
      if (localStorage.access_token) {
        context.commit('updateLoggedStatus', { status: true })
        context.dispatch('getWishlists')
      } else {
        context.commit('updateLoggedStatus', { status: false })
        context.commit('updateWishlists', { wishlists: [] })
      }
    },
    checkout (context, data) {
      axios.post('/checkout', {}, {
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          context.dispatch('getCart')
          Toast.fire({
            icon: 'success',
            title: 'Item Shipped'
          })
        })
        .catch(err => {
          console.log(err.response);
        })
    },
    addToWishlist (context, data) {
      if (!localStorage.access_token) {
        Swal.fire({
          icon: 'warning',
          title: 'Login Required',
          text: 'To add item to wishlist, please login first',
        })
      } else {
        axios.post('/wishlists', { ProductId: data.id }, {
          headers: { access_token: localStorage.access_token }
        })
          .then(data => {
            context.dispatch('getWishlists')
            Toast.fire({
              icon: 'success',
              title: 'Wishlist added'
            })
          })
          .catch(err => {
            console.log(err.response);
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong :/',
              text: err.response.data.message
            })
          })
      }
    },
    getWishlists (context, data) {
      axios.get('/wishlists', {
        headers: { access_token: localStorage.access_token }
      })
      .then(({ data }) => {
        context.commit('updateWishlists', { wishlists: data })
      })
      .catch(() => {
        context.commit('updateWishlists', { wishlists: [] })
      })
    },
    deleteWishlist (context, data) {
      axios.delete('/wishlists/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
      .then(data => {
        context.dispatch('getWishlists')
        Toast.fire({
          icon: 'success',
          title: 'Wishlist deleted'
        })
      })
      .catch(err => {
        console.log(err);
      })
    },
    getBanners (context) {
      axios.get('/banners', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          let activeBanner = []
          data.forEach(el => {
            if (el.status === "Active") {
              activeBanner.push(el)
            }
          });
          context.commit('updateBanners', { banners: activeBanner })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
