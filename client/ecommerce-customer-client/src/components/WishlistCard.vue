<template>
    <div class="d-flex justify-content-between align-items-center border-bottom my-2">
        <p class="fs-5 m-0">{{ wishlist.Product.name }}</p>
        <div>
            <button @click="addToCart" class="fas fa-cart-plus mx-2" style="font-size: 1.5rem;"></button>
            <button @click="deleteWishlist" class="fas fa-trash-alt mx-2" style="font-size: 1.5rem;"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WishlistCard',
    props: ['wishlist'],
    methods: {
        deleteWishlist () {
            this.$store.dispatch('deleteWishlist', { id: this.wishlist.id })
        },
        addToCart() {
            this.$store.dispatch('addToCart', { id: this.wishlist.Product.id })
        },
    }
}
</script>

<style>

</style>