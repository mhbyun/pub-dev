import { defineStore } from 'pinia'

export const useDetailViewStore = defineStore('detailView', {
  state: () => ({
    /**
     * 공통으로 사용할 예정
     * 디테일 데이터 객체
     * { type: 'call' | 'message' | ..., data: Object }
     */
    detail: null
  }),

  getters: {
    // 현재 디테일 데이터
    detailData: (state) => state.detail?.data || null,
    // 타입 확인용
    detailType: (state) => state.detail?.type || null,
    isVisible: (state) => !!state.detail
  },

  actions: {
    /**
     * 디테일 데이터 설정
     * @param {string} type - 'call', 'message', 'user' 등
     * @param {object} data - 디테일 데이터 객체
     */
    set(type, data) {
      this.detail = { type, data }
    },

    /**
     * 디테일 데이터 초기화
     */
    clear() {
      this.detail = null
    },

    /**
     * 일부 속성만 업데이트
     */
    update(partialData) {
      if (this.detail) {
        this.detail.data = { ...this.detail.data, ...partialData }
      }
    }
  }
})
