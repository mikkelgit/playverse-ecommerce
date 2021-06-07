<template>
  <div class="row col-12 p-3 my-3">
    <div class="col-3 my-auto">
        <img class="rounded" :src="product.image_url" alt="" style="width: 100%">
    </div>
    <div class="col-5 ps-3 my-auto">
        <p class="fs-2">{{product.name}}</p>
        <p class="fw-bold text-primary">{{product.Category.name}}</p>
        <p class="fst-italic">Price: {{convertToIdr}}</p>
    </div>
    <div class="col-2 my-auto">
        <p class="text-center">Stock</p>
        <div>
        <input v-model="product.stock" type="number" class="form-control" min=0 >
        </div>
        <div>
        <a @click="updateStock" class="btn btn-outline-primary col-12 mt-3">Update Stock</a>
        </div>
    </div>
    <div class="col-2 my-auto">
        <p class="text-center">Action</p>
        <a @click="editProduct" class="btn btn-success col-12">Edit</a>
        <a @click="deleteProduct" class="btn btn-danger col-12 mt-3" >Delete</a>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'ProductCard',
  props: ['product'],
  computed: {
    convertToIdr () {
      return 'Rp ' + this.product.price.toLocaleString()
    }
  },
  methods: {
    deleteProduct () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteProduct', { id: this.product.id })
        }
      })
    },
    editProduct () {
      this.$router.push('/home/edit/' + this.product.id)
    },
    updateStock () {
      this.$store.dispatch('updateStock', { id: this.product.id, stock: this.product.stock })
    }
  }
}
</script>

<style scoped>
div.row.col-12.p-3 {
  border-radius: 15px
}

div.row.col-12.p-3:hover {
  box-shadow: 0 .5rem 1rem rgba(0,0,0, .25);
  transition: 0.3s
}
</style>
