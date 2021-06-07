<template>
  <div class="container d-flex justify-content-center mt-5">
    <div class="border border-2 shadow">
      <div class="d-flex justify-content-between align-items-center p-5">
          <svg id="wave-bottom" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 270" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(248, 249, 250, 1)" offset="0%"></stop><stop stop-color="rgba(174, 198, 207, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,54L40,67.5C80,81,160,108,240,130.5C320,153,400,171,480,171C560,171,640,153,720,126C800,99,880,63,960,40.5C1040,18,1120,9,1200,27C1280,45,1360,90,1440,108C1520,126,1600,117,1680,130.5C1760,144,1840,180,1920,180C2000,180,2080,144,2160,130.5C2240,117,2320,126,2400,117C2480,108,2560,81,2640,76.5C2720,72,2800,90,2880,81C2960,72,3040,36,3120,36C3200,36,3280,72,3360,94.5C3440,117,3520,126,3600,144C3680,162,3760,189,3840,180C3920,171,4000,126,4080,90C4160,54,4240,27,4320,22.5C4400,18,4480,36,4560,58.5C4640,81,4720,108,4800,121.5C4880,135,4960,135,5040,153C5120,171,5200,207,5280,211.5C5360,216,5440,189,5520,166.5C5600,144,5680,126,5720,117L5760,108L5760,270L5720,270C5680,270,5600,270,5520,270C5440,270,5360,270,5280,270C5200,270,5120,270,5040,270C4960,270,4880,270,4800,270C4720,270,4640,270,4560,270C4480,270,4400,270,4320,270C4240,270,4160,270,4080,270C4000,270,3920,270,3840,270C3760,270,3680,270,3600,270C3520,270,3440,270,3360,270C3280,270,3200,270,3120,270C3040,270,2960,270,2880,270C2800,270,2720,270,2640,270C2560,270,2480,270,2400,270C2320,270,2240,270,2160,270C2080,270,2000,270,1920,270C1840,270,1760,270,1680,270C1600,270,1520,270,1440,270C1360,270,1280,270,1200,270C1120,270,1040,270,960,270C880,270,800,270,720,270C640,270,560,270,480,270C400,270,320,270,240,270C160,270,80,270,40,270L0,270Z"></path></svg>
        <div>
          <img src="https://i.imgur.com/3ggjnqD.png" alt="">
        </div>
        <div class="d-flex align-items-center flex-column ms-5">
          <h1>Login</h1>
          <div class="mt-3">
            <input v-model="loginEmail" type="text" class="form-control" placeholder="Email">
          </div>
          <div class="mt-3">
            <input v-model="loginPassword" type="password" class="form-control" placeholder="Password">
          </div>
          <div class="mt-3 col-12">
            <a @click="adminLogin" class="btn btn-primary col-12">Login</a>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})
export default {
  name: 'Home',
  data () {
    return {
      loginEmail: '',
      loginPassword: ''
    }
  },
  methods: {
    adminLogin () {
      this.$store.dispatch('login', { email: this.loginEmail, password: this.loginPassword })
        .then(({ data }) => {
          if (data.role === 'admin') {
            localStorage.setItem('access_token', data.access_token)
            this.$router.push({ name: 'Home' })
            Toast.fire({
              icon: 'success',
              title: 'Welcome'
            })
          } else {
            this.loginEmail = ''
            this.loginPassword = ''
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Unauthorized'
            })
          }
        })
        .catch(err => {
          this.loginEmail = ''
          this.loginPassword = ''
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong :/',
            text: err.response.data.errors.join('\r\n')
          })
        })
    }
  }
}
</script>

<style>
div.border.border-2.shadow {
  border-radius: 15px;
  background-color: #f8f9fa;
}
#wave-bottom {
  z-index: -1;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
