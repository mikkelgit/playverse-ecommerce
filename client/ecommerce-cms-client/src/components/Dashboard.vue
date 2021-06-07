<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Dashboard</p>
      <hr>
    <div>
      <div v-show="banners" id="carouselExampleControls" class="carousel slide shadow" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(banner, i) in banners" :key="banner.id" :class="[i ? 'carousel-item' : 'carousel-item active']">
            <img :src="banner.image_url" style="max-height: 40vh" class="d-block w-100">
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      <div class="row mt-3">
      <div class="col-6 dashboardPreview">
        <div class="fs-2 text-light col-12 bg-info rounded-3 p-2">
          <div class="d-flex justify-content-between align-items-center">
          <p class="ms-3 my-auto">{{products.length}} Products</p>
          <i class="fas fa-shopping-basket fa-2x"></i>
          </div>
        </div>
      </div>
      <div class="col-6 dashboardPreview">
        <div class="fs-2 text-light col-12 bg-warning rounded-3 p-2">
          <div class="d-flex justify-content-between align-items-center">
            <p class="ms-3 my-auto">{{categories.length}} Categories</p>
            <i class="fas fa-tags fa-2x"></i>
          </div>
        </div>
      </div>
      <div class="col-12 dashboardPreview mt-3">
        <div class="fs-2 text-light col-12 bg-secondary rounded-3 p-2">
          <div class="d-flex justify-content-between align-items-center">
            <p class="ms-3 my-auto">{{banners.length}} Active Banners</p>
            <i class="fas fa-ad fa-2x"></i>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  created () {
    this.$store.dispatch('getCategories')
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getBanners')
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    products () {
      return this.$store.state.products
    },
    banners () {
      const availableBanners = []
      this.$store.state.banners.forEach(el => {
        if (el.status === 'Active') {
          availableBanners.push(el)
        }
      })
      return availableBanners
    }
  }
}
</script>

<style>
div.fs-2.text-light.col-12:hover {
  box-shadow: 0 .5rem 1rem rgba(0,0,0, .25);
  transition: 0.3s
}
i.fas {
  opacity: 0.3;
}
i.fas:hover {
  opacity: 0.8;
}
div.carousel.slide.shadow {
  border-radius: 10px;
}
div.carousel-inner {
  border-radius: 10px;
}
</style>
