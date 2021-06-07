<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Edit Product</p>
      <hr>
      <div>
        <div>
          <div class="mb-3">
            <div class="row">
              <div class="col-8">
                <label class="form-label">Product Name</label>
                <input v-model="product.name" type="text" class="form-control">
              </div>
              <div class="col-4">
                <label class="form-label">Categories</label>
                  <select v-model="product.CategoryId" class="form-select">
                    <option disabled selected>Select Product Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                  </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Image Link</label>
            <input v-model="product.image_url" type="text" class="form-control">
          </div>
          <div class="mb-3 row">
            <div class="col-6">
              <label class="form-label">Product Price</label>
              <input v-model="product.price" type="number" class="form-control">
            </div>
            <div class="col-6">
              <label class="form-label">Product Stock</label>
              <input v-model="product.stock" type="number" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button @click="backToProduct" type="submit" class="btn btn-outline-danger col-12">Cancel</button>
            </div>
            <div class="col-6">
              <button @click="editProduct" class="btn btn-outline-success col-12">Edit Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditProduct',
  created () {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('productDetail', { id: this.$route.params.id })
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    product () {
      return this.$store.state.productDetail
    }
  },
  methods: {
    backToProduct () {
      this.$router.push({ name: 'Products' })
    },
    editProduct () {
      this.$store.dispatch('editProduct', { id: this.$route.params.id, name: this.product.name, image_url: this.product.image_url, price: this.product.price, stock: this.product.stock, CategoryId: this.product.CategoryId })
      this.$nextTick(() => {
        this.$router.push({ name: 'Products' })
      })
    }
  }
}
</script>

<style>

</style>
