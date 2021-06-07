<template>
  <div class="container-sm">
    <div class="row">
      <div class="my-3">
        <Banners></Banners>
      </div>
      <div class="col-3">
        <p v-if="userStatus" class="fs-2 fw-bold text-secondary" >Wishlist</p>
        <div v-if="!userStatus" class="d-flex flex-column pe-5 mt-5">
          <img class="mt-5" src="@/assets/welcome-illustration.svg" alt="" style="max-width: 30vw; opacity: 0.8">
        </div>
        <div v-else class="d-flex flex-column pe-5 mt-5">
          <div v-if="wishlists.length" >
            <WishlistCard v-for="wishlist in wishlists" :key="wishlist.id" :wishlist="wishlist" ></WishlistCard>
          </div>
          <img v-else src="@/assets/wishlist-illustration.svg" alt="" style="max-width: 30vw; opacity: 0.8">
        </div>
      </div>
      <div class="col-9">
        <p class="fs-2 fw-bold text-secondary" >Products<span class="mx-2 badge bg-warning p-1">{{ products.length }}</span></p>
        <div class="row mb-5">
          <ProductCard v-for="product in products" :key="product.id" :product="product" ></ProductCard>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
import WishlistCard from '../components/WishlistCard'
import Banners from '../components/Banners'
export default {
  name: 'Home',
  components: {
    ProductCard,
    WishlistCard,
    Banners
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('checkAuth')
    if (this.userStatus) {
      this.$store.dispatch('getWishlists')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    userStatus () {
      return this.$store.state.loggedIn
    },
    wishlists () {
      return this.$store.state.wishlists
    }
  }
}
</script>

<style>

a.cart-btn {
  /* display: none; */
  visibility: hidden;
  border-radius: 0px 0px 15px 15px
}

div.card-body:hover + a.cart-btn, a.cart-btn:hover {
  /* display: inline-block; */
  visibility: visible
}

div.product-card:hover {
  box-shadow: 0 .5rem 2rem rgba(0,0,0, .25);
  transition: 0.3s
}

button.fas.fa-heart, button.fas.fa-trash-alt, button.fas.fa-cart-plus {
  opacity: 0.5;
  padding: 0;
  border: none;
  background: none;
}

button.fas.fa-heart:hover {
  opacity: 0.8;
}
</style>