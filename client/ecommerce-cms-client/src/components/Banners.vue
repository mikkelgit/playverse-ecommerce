<template>
  <div>
    <div class="container row">
      <div class="d-flex justify-content-between align-items-center">
      <p class="fs-2 fw-bold">Banners</p>
      <a @click="addBanner" class="btn btn-outline-success">
        <i class="fas fa-plus"></i>
        <span class="ms-2">Add Banner</span>
      </a>
      </div>
      <hr>
      <div>
      <table class="table">
        <thead>
          <tr>
            <td>No.</td>
            <td>Title</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(banner, index) in banners" :key="banner.id">
            <td>{{ index + 1 }}</td>
            <td>{{ banner.title }}</td>
            <td>{{ banner.status }}</td>
            <td><a @click="changeBannerStatus(banner.id, banner.status)" class="btn btn-outline-primary">Change Status</a> | <a @click="deleteBanner(banner.id)" class="btn btn-outline-danger">Delete</a></td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Banners',
  created () {
    this.$store.dispatch('getBanners')
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  methods: {
    addBanner () {
      this.$router.push({ name: 'AddBanner' })
    },
    deleteBanner (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete'
      }).then((result) => {
        this.$store.dispatch('deleteBanner', { id })
      })
    },
    changeBannerStatus (id, currentStatus) {
      let newStatus = currentStatus
      if (newStatus === 'Active') {
        newStatus = 'Inactive'
      } else {
        newStatus = 'Active'
      }
      this.$store.dispatch('changeBannerStatus', { id, status: newStatus })
    }
  }
}
</script>

<style>

</style>
