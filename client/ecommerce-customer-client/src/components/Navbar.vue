<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid d-flex justify-content-between px-5 shadow-sm align-items-center">
        <div @click.prevent="changePage('Home')" class="d-flex align-items-center">
            <i class="fas fa-gamepad fa-2x mx-2 text-primary"></i>
            <a class="navbar-brand fw-bold text-primary" href="#">PlayVerse</a>
        </div>
        <div class="m-2 d-flex align-items-center">
            <div v-if="userStatus" class="mx-2 d-flex align-items-center">
                <div @click="changePage('Cart')" >
                    <span v-if="cart.length" class="d-inline cart-count px-1 text-white fw-bold">{{cart.length}}</span>
                    <i class="fas fa-shopping-cart p-2 navbar-ico"></i>
                </div>
                <div class="ms-2">
                    <i @click="changePage('Transaction')" class="fas fa-file-invoice-dollar p-2 navbar-ico"></i>
                    <!-- <i class="fas fa-heart p-2 navbar-ico"></i> -->
                </div>
            <i class="fas fa-ellipsis-v ms-2"></i>
            </div>
            <div class="mx-2 d-flex">
                <div v-if="userStatus">
                    <a @click="logout" class="btn btn-outline-danger mx-1" >Logout</a>
                </div>
                <div v-else>
                    <a class="btn btn-outline-primary mx-1" data-bs-toggle="modal" data-bs-target="#loginModal" >Login</a>
                    <a @click="changePage('Register')" class="btn btn-primary mx-1" >Register</a>
                </div>
            </div>
        </div>
    </div>
    </nav>
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
    name: 'Navbar',
    methods: {
        changePage (des) {
            this.$router.push({ name: des }).catch(()=>{});
        },
        logout () {
            localStorage.clear()
            this.$store.dispatch('checkAuth')
            this.$router.push({ name: 'Home' }).catch(()=>{});
            Toast.fire({
                icon: 'success',
                title: 'Logged Out'
            })
        }
    },
    created () {
        this.$store.dispatch('checkAuth')
        if (this.$userStatus) {
            this.$store.dispatch('getCart')
        }
    },
    computed: {
        userStatus () {
            return this.$store.state.loggedIn
        },
        cart () {
            let unDoneCart = []
            this.$store.state.cart.forEach(el => {
                if (!el.done) {
                    unDoneCart.push(el)
                }
            })
            return unDoneCart
        }
    }
}
</script>

<style scoped>
i.fas.fa-ellipsis-v {
    opacity: 0.3;
}
i.fas.navbar-ico {
    opacity: 0.5;
    font-size: 1.5rem
}
i.fas.navbar-ico:hover {
    opacity: 0.8;
    background-color: #dcdcdc;
    border-radius: 5px;
    font-size: 1.5rem
}
span.cart-count {
    position: relative;
    z-index: 1;
    left: 45px;
    bottom: 15px;
    font-family: 'Courier New', Courier, monospace;
    background-color: #e04a3a;
    border-radius:50%;
    -moz-border-radius:50%;
    -webkit-border-radius:50%;
    user-select: none
}
</style>