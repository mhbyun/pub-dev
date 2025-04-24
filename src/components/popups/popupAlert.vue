<template>
  <div class="popup-container" :class="visible ? 'active' : ''">
		<div class="popup-wrap type-alert">
			<div class="popup-body">
				<div>{{ message }}</div>
			</div>
      <div class="popup-footer" v-if="!isSending">
        <a href="javascript:;" class="btn-md btn-secondary close" @click.prevent="onSend">전송</a>
        <a href="javascript:;" class="btn-md btn-ghost close" @click.prevent="onClose">취소</a>
			</div>
      <div class="popup-footer" v-else>
        <a href="javascript:;" class="btn-md btn-secondary" @click.prevent="onConfirm">확인</a>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  visible: Boolean,
  initData : Object
})

const message = ref('명함을 전송하시겠습니까?')

const isSending = ref(false)
const sendSuccess = ref(null) // null | true | false


onMounted(() => {
  message.value='명함을 전송하시겠습니까?';
  console.log('팝업에 전달된 데이터:', props.initData)
})

watch(
  () => props.initData,
  (val) => {
    if (val) {
      console.log('💡 새로운 팝업 데이터 감지:', val)
    }
  },
  { immediate: true }
)

const emit = defineEmits(['update:visible', 'submit'])


const onClose = () => {

  isSending.value = false
  console.log("명함전송 취소")
  emit('update:visible', false)
}

const onSend = () => {
  isSending.value = true
  console.log("명함전송 api 필요  ==> 전송이 완료 되면 전송 완료 메시지 호출")
  // message.value='전송 되었습니다.'
  message.value='전송에 실패했습니다.'
}

const onConfirm = () => {
  isSending.value = false
  emit('update:visible', false)
}

</script>
