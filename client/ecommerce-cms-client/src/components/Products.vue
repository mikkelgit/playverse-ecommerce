<template>
  <div>
    <div class="container row">
      <div class="d-flex justify-content-between align-items-center">
      <p class="fs-2 fw-bold">Products</p>
      <a @click="addProduct" class="btn btn-outline-success">
        <i class="fas fa-plus"></i>
        <span class="ms-2">Add Product</span>
      </a>
      </div>
      <hr>
      <div class="d-flex flex-column">
        <ProductCard v-for="product in products" :key="product.id" :product="product" ></ProductCard>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './ProductCard'
export default {
  name: 'Products',
  components: {
    ProductCard
  },
  methods: {
    addProduct () {
      this.$router.push({ name: 'AddProduct' })
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    toIdr (int) {
      return int
    }
  }
}
</script>

<style scoped>
</style>
