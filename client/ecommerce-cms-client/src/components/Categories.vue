<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Categories</p>
      <hr>
      <div class="row">
        <div class="col-8">
        <input v-model="categoryName" type="text" class="form-control" placeholder="New Category">
        </div>
        <a @click="addCategory" class="btn btn-success col-4" >Submit</a>
      </div>
      <div>
      <hr>
      <a v-for="category in categories" :key="category.id" class="btn btn-secondary d-inline-flex align-items-center m-3">
          <span style="margin-right: 1rem">{{category.name}}</span>
          <i @click="deleteCategory(category.id)" class="fas fa-ban"></i>
      </a>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Categories',
  data () {
    return {
      categoryName: ''
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
    addCategory () {
      this.$store.dispatch('addCategory', { name: this.categoryName })
      this.$nextTick(() => {
        this.categoryName = ''
      })
    },
    deleteCategory (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'This will also delete every product with this category',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteCategory', { id })
        }
      })
    }
  }
}
</script>

<style>

</style>
