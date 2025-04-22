<template>
  <div class="search-box">
    <div class="form-mix">
      <!-- 시작일자 -->
      <div class="input-mix type-datepicker w100p">
        <span class="unit">
          <a href="javascript:;" class="btn-ico type-text" @click="showStartDate"></a>
        </span>
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          v-model="startDate"
          readonly
          @click="showStartDate"
        />

        <q-popup-proxy
          ref="startRef"
          cover
          transition-show="none"
          transition-hide="none"
        >
          <q-date
            v-model="startDate"
            mask="YYYY-MM-DD"
            today-btn
            @update:model-value="onStartSelect"
          />
        </q-popup-proxy>
      </div>
      <!-- 종료일자 -->
      <div class="input-mix type-datepicker w100p">
        <span class="unit">
          <a href="javascript:;" class="btn-ico type-text" @click="showEndDate"></a>
        </span>
        <input
          type="text"
          placeholder="yyyy-mm-dd"
          v-model="endDate"
          readonly
          @click="showEndDate"
        />

        <q-popup-proxy
          ref="endRef"
          cover
          transition-show="none"
          transition-hide="none"
        >
          <q-date
            v-model="endDate"
            mask="YYYY-MM-DD"
            today-btn
            @update:model-value="onEndSelect"
          />
        </q-popup-proxy>
      </div>
    </div>

    <div class="form-mix">
      <input type="text" placeholder="전화번호" class="w40p" v-model="tellNum">
      <input type="text" placeholder="접수번호" class="w50p" v-model="appNum">
      <a class="btn-md btn-secondary" @click="searchApi">조회</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { global } from 'assets/js/publish/global'

// ✅ 날짜 초기값은 오늘로
const today = new Date().toISOString().slice(0, 10)

const startDate = ref(today)
const endDate = ref(today)

const startRef = ref(null)
const endRef = ref(null)

const showStartDate = () => {
  setTimeout(() => startRef.value?.show(), 0)
}
const showEndDate = () => {
  setTimeout(() => endRef.value?.show(), 0)
}

const tellNum = ref('') //전화번호
const appNum = ref('') //접수번호

const onStartSelect = () => startRef.value?.hide()
const onEndSelect = () => endRef.value?.hide()

const searchApi = () => {
  let data = { startDate:startDate.value, endDate:endDate.value, tellNum:tellNum.value, appNum:appNum.value }
  global.consoleLog('통화목록/문자목록', data);
}


</script>

