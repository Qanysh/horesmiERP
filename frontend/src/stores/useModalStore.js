import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showAccessDenied: false,
  }),
  actions: {
    openAccessDenied() {
      this.showAccessDenied = true
    },
    closeAccessDenied() {
      this.showAccessDenied = false
    },
  },
})
