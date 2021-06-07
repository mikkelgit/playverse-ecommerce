<template>
<div id="mySidenav" class="sidenav d-flex align-items-center flex-column shadow">
    <div class="col-12 p-2">
    <a @click="changePage('Products')" class="text-light btn btn-info col-12">Products</a>
    </div>
    <div class="col-12 p-2">
    <a @click="changePage('Categories')" class="text-light btn btn-warning col-12">Categories</a>
    </div>
    <div class="col-12 p-2">
    <a @click="changePage('Banners')" class="text-light btn btn-secondary col-12">Banners</a>
    </div>
    <div class="col-12 p-2">
    <a @click="changePage('Transaction')" class="text-light btn btn-success col-12">Transaction</a>
    </div>
</div>
</template>

<script>
export default {
  name: 'Sidebar',
  methods: {
    changePage (destination) {
      this.$router.push({ name: destination }).catch(() => {})
    }
  }
}
</script>

<style>
.sidenav {
  background-color: #f8f9fa;
  height: 100vh;
  width: 15vw;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  padding-top: 10vh;
}
</style>
