<template>
  <div class="home">
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div class="konten p-5">
      <div class="container border shadow p-3 mt-5">
      <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
body {
  background-color: #AEC6CF
}
div.konten {
  margin-left: 30vh
}
div.container.border.shadow.p-3 {
  background-color: #f8f9fa;
  border-radius: 10px;
}
</style>
