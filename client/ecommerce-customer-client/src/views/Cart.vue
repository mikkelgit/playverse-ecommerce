<template>
    <div class="container">
        <div class="row mt-5">
            <div class="col-8">
                <!-- <p class="fs-2" >Cart</p> -->
                <div class="card card-container mb-5">
                    <div class="card-header fs-2">
                        Cart
                    </div>
                    <div class="card-body">

                        <div v-if="cart.length">
                            <CartCard v-for="item in cart" :key="item.id" :item="item" ></CartCard>
                        </div>
                        <div v-else class="d-flex flex-column align-items-center">
                            <p class="text-secondary fs-2 fw-bold" >Cart Empty</p>
                            <img src="@/assets/empty-illustration.svg" alt="" style="max-width: 30vw; opacity: 0.8">
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            <div class="col-4">
                <p class="fs-2" >Order Sumarry</p>
                <hr>
                <div class="container d-flex justify-content-between">
                    <p class="fs-5 text-secondary fw-bold" >Total Price</p>
                    <p class="fs-5 text-secondary fw-bold" >{{grandTotal}}</p>
                </div>
                <button @click="checkout" :disabled="cart.length ? false : true" class="btn btn-outline-primary col-12" >Checkout</button>
            </div>
        </div>
    </div>
</template>

<script>
import CartCard from '../components/CartCard'
export default {
    name: 'Cart',
    components: {
        CartCard
    },
    created () {
        this.$store.dispatch('getCart')
    },
    computed: {
        cart () {
            let unDoneCart = []
            this.$store.state.cart.forEach(el => {
                if (!el.done) {
                    unDoneCart.push(el)
                }
            })
            return unDoneCart
        },
        grandTotal () {
            let totalPrice = 0
            this.cart.forEach(el => {
                totalPrice += el.Product.price * el.quantity
            });
            return 'Rp. ' + totalPrice.toLocaleString()
        }
    },
    methods: {
        checkout () {
            if (!this.cart.length) {
                console.log('Cart Empty');
            } else {
                this.$store.dispatch('checkout', { cart: this.cart })
            }
        }
    }
}
</script>

<style scoped>
div.card.card-container {
    border-radius: 15px;
}

</style>