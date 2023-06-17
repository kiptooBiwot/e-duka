<script setup>
// import { useUserStore } from '@/store/userStore'
import { useUserStore } from '~/stores/userStore';

const userStore = useUserStore()
const user = useSupabaseUser()

let selectedArray = ref([])

onMounted(() => {
  setTimeout(() => userStore.isLoading = false, 200)
})

const cards = ref([
  'visa.png',
  'mastercard.png',
  'paypal.png',
  'applepay.png',
])

const totalPriceComputed = computed(() => {
  let price = 0

  userStore.cart.forEach((item) => {
    price += item.price
  })

  return price / 100
})

const selectedRadioFunc = (e) => {
  if (!selectedArray.value.length) {
    selectedArray.value.push(e)
    return
  }

  selectedArray.value.forEach((item, index) => {
    if (e.id !== item.id) {
      selectedArray.value.push(e)
    } else {
      selectedArray.value.splice(index, 1)
    }
  })
}

const goToCheckout = () => {
  let ids = []
  userStore.checkout = []

  selectedArray.value.forEach(item => ids.push(item.id))

  let res = userStore.cart.filter((item) => {
    return ids.indexOf(item.id) !== -1
  })

  res.forEach(item => userStore.checkout.push(toRaw(item)))

  return navigateTo('/checkout')
}

// const products = [
//   {
//     id: 1, title: 'title 1', description: 'This is a description', url: 'https://picsum.photos/id/7/800/800', price: 9999
//   },
//   {
//     id: 2, title: 'title 2', description: 'This is a description', url: 'https://picsum.photos/id/71/800/800', price: 9999
//   },
//   {
//     id: 3, title: 'title 3', description: 'This is a description', url: 'https://picsum.photos/id/72/800/800', price: 999
//   }, {
//     id: 4, title: 'title 4', description: 'This is a description', url: 'https://picsum.photos/id/73/800/800', price: 799
//   }
// ]


</script>

<template>
  <div id="ShoppingCart" class="max-w-[1200px] mx-auto px-2 mt-4">
    <div v-if="!userStore.cart.length" class="h-[500px] flex items-center justify-center">
      <div class="pt-20">
        <img src="/cart-empty.png" class="mx-auto" width="250" alt="">

        <div class="text-xl text-center mt-4">No items yet?</div>
        <div v-if="!user" class="flex text-center">
          <NuxtLink to="/auth" class="bg-[#fd3747] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
            Sign In
          </NuxtLink>
        </div>
      </div>
    </div>

    <div v-else class="md:flex gap-4 justify-between mx-auto w-full">
      <div class="md:w-[65%]">
        <div class="bg-white rounded-lg p-4">
          <div class="text-2xl font-bold mb-2">
            Shopping Cart ({{ userStore.cart.length }})
          </div>
        </div>

        <div class="bg-[#feeeef] rounded-lg p-4 mt-4">
          <div class="text-red-500 font-bold">Welcome Deal applicable on 1 item only.</div>
        </div>

        <div id="Items" class="bg-white rounded-lg p-4 mt-4">
          <div v-for="product in userStore.cart" :key="product.id">
            <CartItem :product='product' :selectArray='selectedArray' @selectedRadio='selectedRadioFunc' />
          </div>
        </div>
      </div>

      <div class="md:hidden block my-4" />

      <div class="md:w-[35%]">
        <div id="summary" class="bg-white rounded-lg p-4">
          <div class="text-2xl font-extrabold mb-2">Summary</div>
          <div class="flex items-center justify-between my-4">
            <div class="font-semibold">Total</div>
            <div class="text-2xl font-semibold">
              Ksh.<span class="font-extrabold">{{ totalPriceComputed }}</span>
            </div>
          </div>

          <button @click="goToCheckout"
            class="flex items-center justify-center bg-[#fd374f] w-full text-white text-[21px] font-semibold p-1.5 rounded-full mt-4">
            Checkout
          </button>
        </div>

        <div id="PaymentProtection" class="bg-white rounded-lg p-4 mt-4">
          <div class="text-lg font-semibold mb-2">Payment methods</div>
          <div class="flex items-center justify-start gap-8 my-4">
            <div v-for="card in cards" :key=card>
              <img :src="card" class="h-6" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
