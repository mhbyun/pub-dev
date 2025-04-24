<template>
  <component
    :is="componentMap[popup.name]"
    v-if="popup.visible"
    :visible="popup.visible"
    :init-data="popup.initData"
    @submit="popup.submit"
    @update:visible="popup.close"
  />
</template>

<script setup>
import { usePopupStore } from 'stores/popup'
import PopupForm from 'components/popups/PopupForm.vue'
import PopupFormDirect from 'components/popups/PopupFormDirect.vue'
import popupAlert from 'components/popups/popupAlert.vue'
import { POPUP_TYPES } from 'assets/js/publish/popupTypes'

const popup = usePopupStore()

// 등록 가능한 팝업 컴포넌트
const componentMap = {
  [POPUP_TYPES.FORM]: PopupForm,
  [POPUP_TYPES.DIRECT]: PopupFormDirect,
  [POPUP_TYPES.ALERT]: popupAlert
}
</script>
