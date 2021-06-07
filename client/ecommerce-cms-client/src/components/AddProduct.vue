<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Add Product</p>
      <hr>
      <div>
        <div>
          <div class="mb-3">
            <div class="row">
              <div class="col-8">
                <label class="form-label">Product Name</label>
                <input v-model="productName" type="text" class="form-control">
              </div>
              <div class="col-4">
                <label class="form-label">Categories</label>
                  <select v-model="productCategory" class="form-select">
                    <option disabled selected>Select Product Category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
                  </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Image Link</label>
            <input v-model="productImage" type="text" class="form-control">
          </div>
          <div class="mb-3 row">
            <div class="col-6">
              <label class="form-label">Product Price</label>
              <input v-model="productPrice" type="number" class="form-control">
            </div>
            <div class="col-6">
              <label class="form-label">Product Stock</label>
              <input v-model="productStock" type="number" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <button @click="backToProducts" type="submit" class="btn btn-outline-danger col-12">Cancel</button>
            </div>
            <div class="col-6">
              <button @click="addProduct" class="btn btn-outline-success col-12">Add Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      productName: '',
      productCategory: '',
      productImage: '',
      productPrice: '',
      productStock: ''
    }
  },
  created () {
    this.$store.dispatch('getCategories')
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    backToProducts () {
      this.$router.push({ name: 'Products' })
    },
    addProduct () {
      this.$store.dispatch('addProduct', { name: this.productName, image_url: this.productImage, price: this.productPrice, stock: this.productStock, CategoryId: this.productCategory })
      this.$nextTick(() => {
        this.$router.push({ name: 'Products' })
      })
    }
  }
}
</script>

<style>

</style>
