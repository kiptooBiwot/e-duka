import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: []
  }),
  persist: true
})