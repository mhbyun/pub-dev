<template>
  <section id="tab1" class="tab-content">
    <CallSearchBox/>
    <div class="history-box type-call">
      <template v-for="(section, sIdx) in historyList" :key="sIdx">
        <h4 class="text-date">{{ section.date }}</h4>

        <ul
          v-for="(item, idx) in section.items"
          :key="idx"
          :class="[
            'history-item',
            item.active ? 'active' : '',
            item.showSubInfo ? 'sub-item-show' : ''
          ]"
          @click="setActiveItem(section.date, idx, item)"
        >
          <!-- active item (선택된 항목) -->
          <template v-if="item.active">
            <li class="c">
              <p class="info3">{{ item.name ? item.name+'님' : item.phone }}</p>
              <div class="info4">
                <span class="info4-item1">
                  <b>휴대전화</b>
                  <b>{{ item.phone }}</b>
                </span>
                <span class="info4-item2">{{ item.callType }}</span>
                <span class="info4-item2">{{ item.time }}</span>
              </div>
            </li>
            <li class="r">
              <i :class="['mic-state', item.micState]"></i>
              <div class="phone-btns">
                <a class="btn-md btn-round btn-success phone-btn call" @click.stop="openPopup(item)" />
                <a href="#!" class="btn-md btn-round btn-dark phone-btn msg"></a>
              </div>
            </li>
          </template>

          <!-- 일반 항목 -->
          <template v-else>
            <li class="l">
              <i :class="['call-state', item.callState]"></i>
            </li>
            <li class="c">
              <b class="info1">{{ item.phone }}</b>
              <div class="info2 sub-item">
                <span class="info2-item1">
                  <i>{{ item.name }}</i>
                  <i>{{ item.role }}</i>
                </span>
                <span class="info2-item2">{{ item.callId }}</span>
              </div>
            </li>
            <li class="r">
              <span class="time">{{ item.time }}</span>
              <div class="sub-item">
                <i :class="['mic-state', item.micState]"></i>
              </div>
            </li>
          </template>
        </ul>
      </template>
    </div>
  </section>

</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import CallSearchBox from 'components/CallSearchBox.vue'
import { usePopupStore } from 'stores/popup'
import { POPUP_TYPES } from 'assets/js/publish/popupTypes'
import { global } from 'assets/js/publish/global'
import { useDetailViewStore } from 'stores/detailView'



const popup = usePopupStore()

const openPopup = () => {
  popup.open(POPUP_TYPES.FORM, {
    message: 'TabCall에서 열었어요!',
    from: 'TabCall'
  })
}

// 팝업 결과 수신
watch(() => popup.result, (newVal) => {
  if (newVal) {
    console.log('팝업에서 받은 결과:', newVal)
    // popup.result = null  // 필요 시 초기화
  }
})

const store = useDetailViewStore()



// call-state.type1 : inbound
// call-state.type2 : 놓친콜
// call-state.type3 : outbound
// call-state.type4 : 안나감

const historyList = ref([
  {
    date: '오늘, 3월 25일 (월)',
    items: [
      {
        phone: '010-1234-1111',
        time: '오후 10:50',
        micState: 'type1',
        callState: 'type2',
        showSubInfo: false,
        active: false
      },
      {
        phone: '010-1234-2222',
        name: '홍길서',
        role: '피보험자 운전자',
        callId: '2025-010101234567',
        time: '오후 10:50',
        micState: 'type2',
        callState: 'type1',
        showSubInfo: true,
        active: false
      },
      {
        phone: '010-1234-3333',
        name: '홍길남',
        role: '피보험자 운전자',
        callId: '2025-010101234567',
        callType: '수신전화, 3분 39초',
        time: '오후 6:24',
        micState: 'type4',
        callState: 'type3',
        active: false,
        showSubInfo: true
      }
    ]
  },
  {
    date: '어제, 3월 24일 (일)',
    items: [
      {
        phone: '010-1234-4444',
        time: '오후 10:50',
        micState: 'type3',
        callState: 'type1',
        showSubInfo: true,
        active: false
      }
    ]
  }
])

const setActiveItem = (date, index, item) => {
  historyList.value.forEach(section => {
    section.items.forEach(item => {
      item.active = false
    })
  })

  const section = historyList.value.find(s => s.date === date)
  if (section) {
    section.items[index].active = true
  }

  // 메시지 상세
  store.set('call', item)
}

</script>
