<script setup>
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

let products = ref(null)

onBeforeMount(async () => {
  products.value = await useFetch('/api/prisma/get-all-products')

  setTimeout(() => userStore.isLoading = false, 1000)
})

</script>

<template>
  <div id="IndexPage" class="pt-4 max-w-[1200px] mx-auto px-2">
    <!-- {{ prods.data }} -->
    <div v-if="products">
      <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        <div v-for="product in products.data" :key="product">
          <ProductComponent :product="product" />
        </div>
      </div>
    </div>

    <!-- <div class="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      <div v-for="product in products" :key="product.id">
        <ProductComponent :product="product" />
      </div>
    </div> -->
  </div>
</template>
