<template>
  <section class="card">
    <div class="card-title">메시지 상세정보</div>

    <div class="chat-wrap">
      <div class="chat-header">
        010-2976-3510 / 2025-01012345 / 피보험자 운전자 / 고애주
        {{ headerInfo }} {{ detailData }}
      </div>
      <div class="chat-body">
        <template v-for="(item, idx) in chatList" :key="idx">
          <!-- 날짜 -->
          <p v-if="item.type === 'date'" class="text-date">{{ item.text }}</p>

          <!-- 일반 메시지 or 파일 메시지 -->
          <div v-else :class="['chat-item', item.type]">
            <!-- 텍스트 메시지 -->
            <div
              v-if="item.msgType === 'text'"
              class="text-msg"
              v-html="item.text"
            ></div>

            <!-- 파일 메시지 -->
            <div v-else-if="item.msgType === 'file'" class="text-msg file-msg">
              <p><i class="file-ico type1"></i></p>
              <ul>
                <li>제목 : <i>{{ item.fileInfo.name }}</i></li>
                <li>용량 : <i>{{ item.fileInfo.size }}</i></li>
                <li>만료 : <i>{{ item.fileInfo.expire }}</i></li>
              </ul>
            </div>

            <!-- 시간 -->
            <i>{{ item.time }}</i>
          </div>
        </template>
      </div>

    </div>
  </section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDetailViewStore } from 'stores/detailView'
import { ref, computed } from 'vue'

const { detailData, detailType, isVisible } = storeToRefs(useDetailViewStore())

const headerInfo = computed(() => {
  const data = detailData.value // ✅ 여기 꼭 필요!
  return [data?.phone, data?.callId, data?.role, data?.name]
    .filter(Boolean)
    .join(' / ')
})

const chatList = ref([
  { type: 'date', text: '1월 30일 목요일' },
  {
    type: 'recive',
    msgType: 'text',
    text: '블랙박스 영상 보내드립니다. <br>확인 후 연락 부탁드립니다.',
    time: '오전11:25'
  },
  {
    type: 'recive',
    msgType: 'file',
    fileInfo: {
      name: 'KakaoTalk_20250416_155808.jpg',
      size: '2.3M',
      expire: '2월 13일, 오후 03:22'
    },
    time: '오전11:25'
  },
  {
    type: 'sent',
    msgType: 'text',
    text: '홍길동님 블박 영상 보내주세요',
    time: '오전11:25'
  },
  { type: 'date', text: '1월 31일 금요일' },
  {
    type: 'recive',
    msgType: 'text',
    text: '블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다. 블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.',
    time: '오전11:25'
  },
  {
    type: 'sent',
    msgType: 'text',
    text: '홍길동님 블박 영상 보내주세요',
    time: '오전11:25'
  }
])


</script>
