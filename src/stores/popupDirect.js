import { defineStore } from 'pinia'

export const usePopupDirectStore = defineStore('popupDirect', {
  state: () => ({
    visible: false,
    initData: {},
    result: null
  }),
  actions: {
    open(data = {}) {
      this.initData = data
      this.visible = true
    },
    close() {
      this.visible = false
    },
    submit(result) {
      this.result = result
      this.visible = false
    }
  }
})
