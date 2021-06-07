import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import Swal from 'sweetalert2'
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
    categories: [],
    productDetail: {},
    banners: [],
    customerCarts: []
  },
  mutations: {
    updateCategories (state, payload) {
      state.categories = payload.categories
    },
    updateProducts (state, payload) {
      state.products = payload.products
    },
    productDetail (state, payload) {
      state.productDetail = payload.product
    },
    updateBanners (state, payload) {
      state.banners = payload.banners
    },
    updateCustomerCarts (state, payload) {
      state.customerCarts = payload.customerCarts
    }
  },
  actions: {
    login (context, data) {
      return axios.post('/login', { ...data })
    },
    getCategories (context) {
      axios.get('/categories', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('updateCategories', { categories: data })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProducts (context) {
      axios.get('/products', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('updateProducts', { products: data })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, data) {
      axios.post('/products', data, {
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          context.dispatch('getProducts')
          Toast.fire({
            icon: 'success',
            title: 'New Product Added'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    editProduct (context, data) {
      const editData = {
        name: data.name,
        image_url: data.image_url,
        price: data.price,
        stock: data.stock,
        CategoryId: data.CategoryId
      }
      axios.put('/products/' + data.id, editData, {
        headers: { access_token: localStorage.access_token }
      })
        .then(data => {
          context.dispatch('getProducts')
          Toast.fire({
            icon: 'success',
            title: 'Product Detail Edited'
          })
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    deleteProduct (context, data) {
      axios.delete('/products/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getProducts')
          Swal.fire(
            'Deleted!',
            'Selected product has been deleted.',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateStock (context, data) {
      axios.patch('/products/' + data.id, { stock: data.stock }, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getProducts')
          Toast.fire({
            icon: 'success',
            title: 'Stock Updated'
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    productDetail (context, data) {
      axios.get('/products/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('productDetail', { product: data })
        })
        .catch(err => {
          console.log(err)
        })
    },
    getBanners (context) {
      axios.get('/banners', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('updateBanners', { banners: data })
        })
        .catch(err => {
          console.log(err)
        })
    },
    addBanner (context, data) {
      axios.post('/banners', data, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getBanners')
          Toast.fire({
            icon: 'success',
            title: 'New Banner Added'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    changeBannerStatus (context, data) {
      axios.patch('/banners/' + data.id, { status: data.status }, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getBanners')
          Toast.fire({
            icon: 'success',
            title: 'Banner Status Updated'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    addCategory (context, data) {
      axios.post('/categories', data, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getCategories')
          Toast.fire({
            icon: 'success',
            title: 'New Category Added'
          })
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    deleteCategory (context, data) {
      axios.delete('/categories/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          Swal.fire(
            'Deleted!',
            'Selected category has been deleted.',
            'success'
          )
          context.dispatch('getCategories')
        })
        .catch(err => {
          console.log(err)
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    },
    deleteBanner (context, data) {
      axios.delete('/banners/' + data.id, {
        headers: { access_token: localStorage.access_token }
      })
        .then(() => {
          context.dispatch('getBanners')
          Swal.fire(
            'Deleted!',
            'Selected banner has been deleted.',
            'success'
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCustomerCarts (context) {
      axios.get('/customer-carts', {
        headers: { access_token: localStorage.access_token }
      })
        .then(({ data }) => {
          context.commit('updateCustomerCarts', { customerCarts: data })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
