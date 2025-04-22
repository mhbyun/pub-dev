<template>
  <section id="tab2" class="tab-content">
    <CallSearchBox/>

    <div class="history-box type-msg">
      <ul
        v-for="(item, idx) in msgList"
        :key="idx"
        class="history-item"
        :class="{ active: item.active }"
        @click="selectItem(idx, item)"
      >
        <li class="l">
          <b class="info1">{{ item.name || item.phone }}</b>
          <div class="info2">
            <span v-if="item.message" class="msg-item">{{ item.message }}</span>
            <span v-if="item.hasImage" class="img-item">이미지</span>
            <span v-if="item.fileCount" class="file-item">첨부파일 {{ item.fileCount }}개</span>
          </div>
        </li>
        <li class="r">
          <span class="date">{{ item.date }}</span>
          <i :class="['new-msg', 'type1', { active: item.unread }]">
            {{ item.newCount }}
          </i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import CallSearchBox from 'components/CallSearchBox.vue'
import { useDetailViewStore } from 'stores/detailView'


const store = useDetailViewStore()


onMounted(() => {
  console.log('TabMessage');
})

// 테스트용 메시지 목록
const msgList = ref([
  {
    phone: '010-1234-5678',
    name: '',
    message: '알겠습니다. 또 연락 드릴게요.',
    hasImage: false,
    fileCount: 0,
    date: '4월 7일',
    newCount: 2,
    unread: true, // 읽지 않음
    active: false
  },
  {
    phone: '',
    name: '남궁길동님',
    message: '바쁘시겠지만 시간 괜찮으실때 전화 부탁드립니다. 지금 상황이 조금 급해서요.',
    hasImage: true,
    fileCount: 2,
    date: '4월 7일',
    newCount: 2,
    unread: false, // 이미 읽음
    active: false
  },
  {
    phone: '010-1234-5678',
    name: '',
    message: '',
    hasImage: false,
    fileCount: 2,
    date: '4월 7일',
    newCount: 2,
    unread: false,
    active: false
  }
])

// 항목 선택 시 active 상태 설정
const selectItem = (index, item) => {
  msgList.value.forEach((item, i) => {
    item.active = i === index
  })

  // 메시지 상세
  store.set('message', item)
}
</script>
