<template>
  <ul class="callDetail-tab">
    <li class="tab tab1" :class="{active: activeCallDetailTab=='callDetail'}" @click="activeCallDetailTab = 'callDetail'">통화 상세정보</li>
    <li class="tab tab2" :class="{active: activeCallDetailTab=='summationDetail'}" @click="activeCallDetailTab = 'summationDetail'">상담 요약</li>
  </ul>
  <div class="callDetail-sec">
    <section class="card">
      <div class="card-title">통화 상세정보</div>

      <!-- 공통 내용 -->
      <div class="IncidentType">
        <div class="form-mix">
          <div class="input-mix w160px">
            <div class="dropdown-wrap" ref="dropdownRef" :class="{ active: isOpen }" v-click-outside="closeDropdown">
              <div class="dropdown-tit" @click="toggleDropdown">
                <input type="text" class="w100p ellipsis" placeholder="접수번호" :value="appNum">
              </div>
              <div class="dropdown-body" v-show="isOpen">
                <div class="list-item">
                  <a
                    v-for="(item, index) in recentList.slice(0, 5)"
                    :key="index"
                    @click.stop="recentClike(item)"
                  >
                    {{ item }}
                  </a>
                </div>
              </div>
            </div>
            <span class="unit">
              <a href="javascript:;" class="btn-ico" @click="anotherAppNumClick()">
                <img src="../../../assets/images/ico-import.svg" alt="">
              </a>
            </span>
          </div>

          <select class="w120px">
            <option>피보험자</option>
          </select>

          <select class="w80px">
            <option>역할</option>
          </select>

          <span class="badge-md badge-soft-primary ml-auto">파트너</span>
          <!-- <span class="badge-md badge-soft-success ml-auto">브로커</span> -->
        </div>

        <div class="case-select">
          <ul>
            <!-- 참고 : li가 비어있다해도 4배수로 있어야 함 -->
            <li class="active">개동</li>
            <li>개동(지급처)</li>
            <li>보상처리진행</li>
            <li>유선합의</li>

            <li>개동(운전자)</li>
            <li class="active">최초안내</li>
            <li>종결안내</li>
            <li>과실협의</li>

            <li data-toggle="modalPopup" data-target="#modalTest2" @click="openPopupDirect()">직접선택</li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <p class="form-mix">
            <span class="badge-sm badge-fill badge-fill-dark">
              <em>선택된 소분류</em>
              <a href="javascript:;" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-fill badge-fill-dark">
              <em>선택된 소분류</em>
              <a href="javascript:;" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-fill badge-fill-dark">
              <em>선택된 소분류</em>
              <a href="javascript:;" class="badge-btn-del"></a>
            </span>
          </p>
        </div>

        <div class="form-mix flex-end">
          <a href="javascript:;" class="btn-sm btn-basic">저장</a>
          <a href="javascript:;" class="btn-sm btn-basic">재사용</a>
        </div>

        <div class="player-box">
          <p class="player-info">
            <b><i>{{ callDetail?.name ? callDetail?.name+' 님':'' }}{{ callDetail?.callId ? ' ( '+callDetail?.callId+' )':'' }} / 2025-0101_12345.wav </i></b>
            <a href="javascript:;" class="btn-sm btn-ghost">청취</a>
          </p>

          <!-- 청취 시 활성화 : active -->
          <ul class="player-item active">
            <li>
              <a href="#!" class="play-btn play-btn1"><img src="../../../assets/images/play-ico2.svg" alt=""></a>
            </li>
            <li class="timer">
              <span>2:47</span>
              <i>/</i>
              <em>3:29</em>
            </li>
            <li class="bar">
              <span><i style="width:60%;"></i></span>
            </li>
            <li>
              <a href="#!" class="play-btn play-btn2"><img src="../../../assets/images/play-ico3.svg" alt=""></a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tab1 통화 상세정보 내용-->
      <div class="content content1" :class="{active: activeCallDetailTab=='callDetail'}">
        <div class="chat-wrap">
          <div class="chat-body">
            <template v-for="(item, index) in detailChatData" :key="index">
              <!-- 날짜 -->
              <p v-if="item.type === 'date'" class="text-date" v-html="item.text"></p>

              <!-- 메시지 -->
              <div v-else :class="['chat-item', item.type]">
                <div class="text-msg" v-html="item.text"></div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-title">상담 요약</div>

      <!-- Tab2 상담 요약 내용-->
      <div class="content content2" :class="{active: activeCallDetailTab=='summationDetail'}">
        <div class="form-col-wrap type-column summary-item">
          <p class="summary-title">고애주님(2025-0101012345)</p>
          <dl class="form-col">
            <dt>
              <i><img src="../../../assets/images/ico-summary1.svg" alt=""></i>
              <span>상담 주제</span>
            </dt>
            <dd>
              <ul class="box-item">
                <li>고객과 상대방이 오토바이 사고 이후 보험 처리와 관련된 책임 소재를 두고 서로 상반된 주장을 하고 있음. 고객은 본인이 보험 접수를 요청한 적이 없다고 주장하는 반면, 상대방은 고객이 현장에서 책임을 인정하고 보험 처리를 하기로 했다고 주장함.고객과 상대방이 오토바이 사고 이후 보험 처리와 관련된 책임 소재를 두고 서로 상반된 주장을 하고 있음. 고객은 본인이 보험 접수를 요청한 적이 없다고 주장하는 반면, 상대방은 고객이 현장에서 책임을 인정하고 보험 처리를 하기로 했다고 주장함.</li>
              </ul>
            </dd>
          </dl>
          <dl class="form-col">
            <dt>
              <i><img src="../../../assets/images/ico-summary2.svg" alt=""></i>
              <span>고객 내용 요약</span>
            </dt>
            <dd>
              <ul class="box-item">
                <li>고객은 상대방에게 개인 합의가 가능한지 문의했으나 거절당함.</li>
                <li>고객은 사고 당시 KB손해보험을 통해 처리하자고 제안했으나, 상대방이 이를 거
                  절.하고 다른 방식으로 처리하려 했다고 주장함.</li>
                <li>고객은 상대방에게 개인 합의가 가능한지 문의했으나 거절당함.</li>
                <li>고객은 사고 당시 KB손해보험을 통해 처리하자고 제안했으나, 상대방이 이를 거
                  절.하고 다른 방식으로 처리하려 했다고 주장함.</li>
                <li>고객은 상대방에게 개인 합의가 가능한지 문의했으나 거절당함.</li>
                <li>고객은 사고 당시 KB손해보험을 통해 처리하자고 제안했으나, 상대방이 이를 거
                  절.하고 다른 방식으로 처리하려 했다고 주장함.</li>
              </ul>
            </dd>
          </dl>
          <dl class="form-col">
            <dt>
              <i><img src="../../../assets/images/ico-summary3.svg" alt=""></i>
              <span>상담사 내용 요약</span>
            </dt>
            <dd>
              <ul class="box-item">
                <li>상대방은 현장에서 고객이 모든 책임을 인정했다고 주장함.</li>
                <li>상대방은 우리 보험사에 100% 다 처리 받으라고 이야기 들었다고 주장함.</li>
                <li>상담사는 상대방과 연락하여 상황을 명확히 할 것을 제안함.</li>
              </ul>
            </dd>
          </dl>
        </div>

        <dl class="summary-tag">
          <dt>상담 키워드</dt>
          <dd>
            <span class="badge-sm badge-line badge-line-primary">
              <em>보험접수</em><a href="#!" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-line badge-line-primary">
              <em>과실비율</em><a href="#!" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-line badge-line-primary">
              <em>보험사고 담당자</em><a href="#!" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-line badge-line-primary">
              <em>CCTV제공</em><a href="#!" class="badge-btn-del"></a>
            </span>
            <span class="badge-sm badge-line badge-line-primary">
              <em>오토바이사고</em><a href="#!" class="badge-btn-del"></a>
            </span>
          </dd>
        </dl>

      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed  } from 'vue'
import { usePopupStore } from 'stores/popup'
import { POPUP_TYPES } from 'assets/js/publish/popupTypes'
import { storeToRefs } from 'pinia'
import { useDetailViewStore } from 'stores/detailView'

const { detailData, detailType, isVisible } = storeToRefs(useDetailViewStore())

// computed 로 타입 가드
const callDetail = computed(() => {
  return detailType.value === 'call' ? detailData.value : null
})

const isOpen = ref(false)
const appNum = ref('')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const recentClike = (item) => {
  console.log("recentClike : ", item);
  appNum.value=item;
  toggleDropdown()
}

const closeDropdown = () => {
  isOpen.value = false
}


const detailChatData = ref([
  {
    type: 'date',
    text: '1월 30일 화요일'
  },
  {
    type: 'recive',
    text: '블랙박스 영상 보내드립니다. <br>확인 후 연락 부탁드립니다.'
  },
  {
    type: 'recive',
    text: '블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다. 블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.'
  },
  {
    type: 'sent',
    text: '홍길동님 블박 영상 보내주세요'
  },
  {
    type: 'recive',
    text: '네 그렇게 하시면 됩니다'
  },
  {
    type: 'sent',
    text: '홍길동님 블박 영상 보내주세요'
  }
])

// 예시 데이터
const recentList = ref([
  '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44',
  '2025-010101224 김철수(자동차물건) 2025-03-12 11:10:22',
  '2025-010101225 이영희(차량사고) 2025-03-12 11:13:01',
  '2025-010101226 박민수(운전자보장) 2025-03-12 11:14:55',
  '2025-010101227 최지우(종합보험) 2025-03-12 11:16:37',
  '2025-010101228 김나연(차량파손) 2025-03-12 11:18:59' // 👉 이건 6번째라 안보임
])


onMounted(() => {
  console.log('tabcall');

  console.log("detailData : ", detailData.value);
})

const activeCallDetailTab=ref('callDetail')


const popup = usePopupStore()

const openPopupDirect = () => {
  popup.open(POPUP_TYPES.DIRECT, {
    message: '직접선택에서 열었어요!',
    from: '직접선택'
  })
}

// 팝업 결과 수신
watch(() => popup.result, (newVal) => {
  if (newVal) {
    console.log('팝업에서 받은 결과:', newVal)
    // popup.result = null  // 필요 시 초기화
  }
})
</script>
