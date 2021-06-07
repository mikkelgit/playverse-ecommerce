<template>
    <div class="card p-3 rounded-3 shadow-sm mb-3">
        <button @click="deleteProduct" class="fas fa-trash-alt align-self-end" style="font-size: 1.5rem"></button>
        <div class="d-flex">
            <div style="max-width: 15vw">
            <img :src="item.Product.image_url" class="card-img-top" style="object-fit: cover; border-radius: 15px">
            </div>
            <div class="ms-3">
                <p class="fs-3 m-0">{{item.Product.name}}</p>
                <p class="card-text text-primary fw-bold m-0">{{convertToIdr}}</p>
                <div class="d-flex align-items-center mt-3" style="font-size: 1.25rem">
                    <button  @click="updateQuantity(-1)" :disabled="item.quantity === 1 ? true : false" class="fas fa-minus-circle stock-manage"></button>
                    <p class="my-auto mx-3" >{{item.quantity}}</p>
                    <button @click="updateQuantity(1)" class="fas fa-plus-circle stock-manage"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CartCard',
    props: ['item'],
    computed: {
        convertToIdr () {
        return 'Rp ' + this.item.Product.price.toLocaleString()
        }
    },
    methods: {
      deleteProduct () {
        this.$store.dispatch('deleteCartItem', { id: this.item.id })
      },
      updateQuantity (change) {
        this.$store.dispatch('updateQuantity', { id: this.item.id , quantity: this.item.quantity + change })
      }
    }
}
</script>

<style scoped>

button.fas.fa-trash-alt {
  opacity: 0.5;
  padding: 0;
  border: none;
  background: none;
  position: absolute;
}

button.fas.stock-manage {
  opacity: 0.2  ;
  padding: 0;
  border: none;
  background: none;
}

button.fas.stock-manage:hover {
  opacity: 0.5;
}

button.fas.fa-trash-alt:hover {
  opacity: 0.8;
}

</style>