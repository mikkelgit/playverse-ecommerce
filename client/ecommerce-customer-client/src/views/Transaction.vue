<template>
    <div>
        <div class="container">
            <div v-if="cart.length" >
                <p class="fs-3">Order History</p>
                <div>
                    <table class="table">
                        <thead>
                            <tr>
                                <td>No.</td>
                                <td>Product Name</td>
                                <td>Price</td>
                                <td>Date</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in cart" :key="item.id" >
                                <td>{{ i + 1 }}</td>
                                <td>{{ item.Product.name }}</td>
                                <td>{{ 'Rp ' + item.amount.toLocaleString() }}</td>
                                <td>{{ item.updatedAt.toLocaleString().split("T")[0] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div v-else class="d-flex flex-column align-items-center mt-5" >
                <p class="text-secondary fs-2 fw-bold" >No Order History</p>
                <img src="@/assets/empty-transaction.svg" alt="" style="max-width: 30vw; opacity: 0.8">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Transaction',
    created() {
        this.$store.dispatch('getCart')
    },
    computed: {
        cart () {
            let doneCart = []
            this.$store.state.cart.forEach(el => {
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