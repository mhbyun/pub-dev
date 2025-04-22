<template>
  <div class="popup-container" :class="visible ? 'active' : ''">
		<div class="popup-wrap">
			<div class="popup-header">
				<b class="title">직접선택</b>
				<a href="#" class="close" @click.prevent="onClose"></a>
			</div>
			<div class="popup-body">

				<div class="form-col-wrap direct-select">
					<dl class="form-col">
						<dt>대분류</dt>
						<dd>
							<select class="w100p">
								<option>선택해주세요1111111.</option>
							</select>
						</dd>
					</dl>
					<dl class="form-col">
						<dt>중분류</dt>
						<dd>
							<select class="w100p">
								<option>선택해주세요1111111.</option>
							</select>
						</dd>
					</dl>
					<dl class="form-col">
						<dt>소분류</dt>
						<dd>
							<select class="w100p">
								<option>선택해주세요1111111.</option>
							</select>
						</dd>
					</dl>
				</div>

			</div>
			<div class="popup-footer">
        <a href="javascript:;" class="btn-md btn-ghost close" data-dismiss="modalPopup" @click.prevent="onClose">취소</a>
        <a href="javascript:;" class="btn-md btn-secondary close" data-dismiss="modalPopup" @click.prevent="onClose">저장</a>
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


onMounted(() => {
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

// 예시 데이터 (백엔드에서 props로 받아올 수도 있음)
const items = ref([
  { id: 1, text: '2025-010101223 홍길동(자동차인 차동차물 보여지는) 2025-03-12 11:08:44' },
  { id: 2, text: '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44' },
  { id: 3, text: '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44' },
  { id: 4, text: '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44' },
  { id: 5, text: '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44' }
])

const selectedId = ref(null)

const onClose = () => {
  emit('update:visible', false)
}

// 항목 선택 후 즉시 전송
const selectItem = (item) => {
  selectedId.value = item.id
  emit('submit', item)
  emit('update:visible', false)
}
</script>
