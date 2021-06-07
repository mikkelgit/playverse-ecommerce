<template>
    <div class="col-4 mt-3">
        <div class="card p-0 product-card" style="width: 18rem; border-radius: 15px">
            <div class="card-body p-0">
            <img :src="product.image_url" class="card-img-top mt-3" style="object-fit: contain; border-radius: 15px 15px 0px 0px; width: 100%; height: 20vh">
            <div class="p-3">
                <div class="mb-2 d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="card-title mb-1">{{product.name}}</h5>
                    <span class="card-text text-white bg-primary fw-bold m-0 px-1 rounded-2" >{{product.Category.name}}</span>
                </div>
                <button @click="addToWishlist" :class="[inWishlist ? 'fas fa-heart text-danger' : 'fas fa-heart text-secondary']" style="font-size: 1.5rem"></button>
                </div>
                <div class="d-flex justify-content-between mt-2">
                <p class="card-text text-primary fw-bold m-0">{{ convertToIdr }}</p>
                <p class="card-text">In stock : {{product.stock}}</p>
                </div>
            </div>
            </div>
            <a  href="#" @click.prevent="addToCart(product.id)" class="btn btn-primary cart-btn fw-bold">Add To Cart</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: ['product'],
    computed: {
        convertToIdr () {
        return 'Rp ' + this.product.price.toLocaleString()
        },
        inWishlist () {
            let inWishlist
            this.$store.state.wishlists.forEach(el => {
                if (el.ProductId === this.product.id) {
                    inWishlist = true
                }
            });
            return inWishlist
        },
    },
    methods: {
        addToCart(id) {
            this.$store.dispatch('addToCart', { id })
        },
        addToWishlist () {
            this.$store.dispatch('addToWishlist', { id: this.product.id })
        },
    }
}
</script>

<style>

</style>