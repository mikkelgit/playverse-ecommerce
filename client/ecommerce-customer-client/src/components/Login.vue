<template>
    <div class="modal fade" id="loginModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Sign in to Continue</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-2">
                <label class="form-label">Email address</label>
                <input v-model="loginEmail" type="email" class="form-control" placeholder="user@mail.com">
            </div>
            <div class="mb-2">
                <label class="form-label">Password</label>
                <input v-model="loginPassword" type="password" class="form-control" placeholder="********">
            </div>
            <div class="mt-3">
                <button @click="login" type="button" data-bs-dismiss="modal" class="btn btn-outline-primary col-12">Login</button>
            </div>
        </div>
        <hr class="m-0">
            <div class="mx-auto p-2">
                <p class="m-2">Don't have an Account Yet? <a @click="register" data-bs-dismiss="modal" href='#' class="text-success fw-bold">Register here</a></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            loginEmail: '',
            loginPassword: ''
        }
    },
    methods: {
        register () {
            this.$router.push({ name: 'Register' }).catch(()=>{});
        },
        login () {
            this.$store.dispatch('login', { email: this.loginEmail, password: this.loginPassword })
            this.loginEmail = ''
            this.loginPassword = ''
            this.$router.push({ name: 'Home' }).catch(()=>{});
        }
    }
}
</script>

<style>

</style>