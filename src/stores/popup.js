import { defineStore } from 'pinia'

export const usePopupStore = defineStore('popup', {
  state: () => ({
    name: '',        // 팝업 구분용 이름
    visible: false,
    initData: {},
    result: null
  }),
  actions: {
    open(name, data = {}) {
      this.name = name
      this.initData = data
      this.visible = true
    },
    close() {
      this.visible = false
      this.name = ''
    },
    submit(result) {
      this.result = result
      this.visible = false
    }
  }
})
