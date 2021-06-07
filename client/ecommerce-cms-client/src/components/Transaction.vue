<template>
  <div>
    <div class="container row">
      <p class="fs-2 fw-bold">Customer Transaction History</p>
      <hr>
      <div>
      <table class="table">
        <thead>
          <tr>
            <td>Transaction ID</td>
            <td>User Email</td>
            <td>Total</td>
            <td>Transaction Date</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in doneTransaction" :key="transaction.id.id">
            <td>{{ transaction.id }}</td>
            <td>{{ transaction.User.email }}</td>
            <td>{{ 'Rp ' + transaction.amount.toLocaleString() }}</td>
            <td>{{ transaction.updatedAt.split("T")[0] }}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  created () {
    this.$store.dispatch('getCustomerCarts')
  },
  computed: {
    doneTransaction () {
      const doneCart = []
      this.$store.state.customerCarts.forEach(el => {
        if (el.done) {
          doneCart.push(el)
        }
      })
      return doneCart
    }
  }
}
</script>

<style>

</style>
