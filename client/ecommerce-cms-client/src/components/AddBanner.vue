<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Add Banner</p>
      <hr>
      <div>
        <div>
          <div class="mb-3">
            <div class="row">
              <div class="col-8">
                <label class="form-label">Banner Title</label>
                <input v-model="bannerTitle" type="text" class="form-control">
              </div>
              <div class="col-4">
                <label class="form-label">Status</label>
                  <select v-model="bannerStatus" class="form-select">
                    <option disabled selected>Select Banner Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">Banner Image Link</label>
            <input v-model="bannerImage" type="text" class="form-control">
          </div>
          <div class="row">
            <div class="col-6">
              <button @click="backToBanners" type="submit" class="btn btn-outline-danger col-12">Cancel</button>
            </div>
            <div class="col-6">
              <button @click="addBanner" class="btn btn-outline-success col-12">Add Banner</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddBanner',
  data () {
    return {
      bannerTitle: '',
      bannerImage: '',
      bannerStatus: ''
    }
  },
  methods: {
    backToBanners () {
      this.$router.push({ name: 'Banners' })
    },
    addBanner () {
      this.$store.dispatch('addBanner', { title: this.bannerTitle, status: this.bannerStatus, image_url: this.bannerImage })
      this.$nextTick(() => {
        this.$router.push({ name: 'Banners' })
      })
    }
  }
}
</script>

<style>

</style>
