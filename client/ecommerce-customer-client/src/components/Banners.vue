<template>
    <div v-show="banners" id="promo-banner" class="carousel slide shadow" data-bs-ride="carousel">
        <div class="carousel-inner">
            <div v-for="(banner, i) in banners" :key="banner.id" :class="[i ? 'carousel-item' : 'carousel-item active']">
            <img :src="banner.image_url" style="max-height: 40vh; object-fit: cover" class="d-block w-100">
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#promo-banner" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#promo-banner" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
</template>

<script>
export default {
    name: 'Banners',
    created() {
        this.$store.dispatch('getBanners')
    },
    computed: {
        banners () {
            return this.$store.state.banners
        }
    }
}
</script>

<style scoped>
div.carousel.slide.shadow {
  border-radius: 10px;
}
div.carousel-inner {
  border-radius: 10px;
}
</style>