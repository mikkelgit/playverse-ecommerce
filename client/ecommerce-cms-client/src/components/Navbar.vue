<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div class="d-flex container-fluid align align-items-center">
                <router-link to="/home" class="fs-5 fw-bold my-auto text-secondary text-decoration-none">Admin CMS</router-link>
                <div>
                    <a @click="logout" class="btn btn-outline-danger m" style="margin-right: 2rem">Logout</a>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'Navbar',
  methods: {
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'Login' })
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'warning',
        title: 'Signed out'
      })
    }
  }
}
</script>

<style>
nav.navbar {
  width: 100vw;
  position: fixed;
  z-index: 3;
}
</style>
