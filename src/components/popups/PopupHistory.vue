<template>
  <div class="popup-container" :class="visible ? 'active' : ''">
    <div class="popup_wrap type_split"><!--20250428 클래스 추가-->
      <div class="popup-header">
        <a href="#" class="close" @click.prevent="onClose"></a>
      </div>
      <div class="popup-body">
        <div class="split-box">
          <!-- left -->
          <section class="left">
            <div class="text-title md mb20">통화 상세정보</div>
            <div class="IncidentType">
              <div class="form-mix">
                <div class="input-mix w160px">
                  <div class="dropdown-wrap" ref="dropdownRef">
                    <div class="dropdown-tit">
                      <input
                        type="text"
                        class="w100p ellipsis"
                        placeholder="접수번호"
                        :value="appNum"
                      />
                    </div>
                    <div class="dropdown-body">
                      <div class="list-item"></div>
                    </div>
                  </div>
                  <span class="unit">
                    <a href="javascript:;" class="btn-ico"></a>
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
                  <li>직접선택</li>
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
                </p>
              </div>

              <div class="player-box">
                <p class="player-info">
                  <b><i> 고애주님 / 2025-0101_12345.wav </i></b>
                </p>

                <!-- 청취 시 활성화 : active -->
                <ul class="player-item active">
                  <li>
                    <a href="#!" class="play-btn play-btn1"
                      ><img src="../../assets/images/play-ico2.svg" alt=""
                    /></a>
                  </li>
                  <li class="timer">
                    <span>2:47</span>
                    <i>/</i>
                    <em>3:29</em>
                  </li>
                  <li class="bar">
                    <span><i style="width: 60%"></i></span>
                  </li>
                  <li>
                    <a href="#!" class="play-btn play-btn2"
                      ><img src="../../assets/images/play-ico3.svg" alt=""
                    /></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="content">
              <div class="chat-wrap">
                <div class="chat-body">
                  <!-- 데이터 없을때 -->
                  <!-- <div class="no-data">
                    등록된 파일이 없습니다<span class="desc"
                      >녹취 파일이 없어 통화 요약 정보가 제공되지
                      않습니다.</span
                    >
                  </div> -->

                  <template
                    v-for="(item, index) in detailChatData"
                    :key="index"
                  >
                    <p
                      v-if="item.type === 'date'"
                      class="text-date"
                      v-html="item.text"
                    ></p>
                    <div v-else :class="['chat-item', item.type]">
                      <div class="text-msg" v-html="item.text"></div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </section>
          <!-- right -->
          <section class="right">
            <div class="text-title md mb20">상담 요약</div>
            <div class="content">
              <div class="form-col-wrap type-column summary-item">
                <p class="summary-title">고애주님(2025-0101012345)</p>
                <dl class="form-col">
                  <dt>
                    <i
                      ><img src="../../assets/images/ico-summary1.svg" alt=""
                    /></i>
                    <span>상담 주제</span>
                  </dt>
                  <dd>
                    <ul class="box-item">
                      <li>
                        고객과 상대방이 오토바이 사고 이후 보험 처리와 관련된
                        책임 소재를 두고 서로 상반된 주장을 하고 있음. 고객은
                        본인이 보험 접수를 요청한 적이 없다고 주장하는 반면,
                        상대방은 고객이 현장에서 책임을 인정하고 보험 처리를
                        하기로 했다고 주장함.고객과 상대방이 오토바이 사고 이후
                        보험 처리와 관련된 책임 소재를 두고 서로 상반된 주장을
                        하고 있음. 고객은 본인이 보험 접수를 요청한 적이 없다고
                        주장하는 반면, 상대방은 고객이 현장에서 책임을 인정하고
                        보험 처리를 하기로 했다고 주장함.
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form-col">
                  <dt>
                    <i
                      ><img src="../../assets/images/ico-summary2.svg" alt=""
                    /></i>
                    <span>고객 내용 요약</span>
                  </dt>
                  <dd>
                    <ul class="box-item">
                      <li>
                        고객은 상대방에게 개인 합의가 가능한지 문의했으나
                        거절당함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 상대방에게 개인 합의가 가능한지 문의했으나
                        거절당함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 상대방에게 개인 합의가 가능한지 문의했으나
                        거절당함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 상대방에게 개인 합의가 가능한지 문의했으나
                        거절당함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                      <li>
                        고객은 상대방에게 개인 합의가 가능한지 문의했으나
                        거절당함.
                      </li>
                      <li>
                        고객은 사고 당시 KB손해보험을 통해 처리하자고
                        제안했으나, 상대방이 이를 거 절.하고 다른 방식으로
                        처리하려 했다고 주장함.
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dl class="form-col">
                  <dt>
                    <i
                      ><img src="../../assets/images/ico-summary3.svg" alt=""
                    /></i>
                    <span>상담사 내용 요약</span>
                  </dt>
                  <dd>
                    <ul class="box-item">
                      <!-- <li>
                        상대방은 현장에서 고객이 모든 책임을 인정했다고 주장함.
                      </li>
                      <li>
                        상대방은 우리 보험사에 100% 다 처리 받으라고 이야기
                        들었다고 주장함.
                      </li>
                      <li>
                        상담사는 상대방과 연락하여 상황을 명확히 할 것을 제안함.
                      </li> -->
                      <!-- 데이터 없을때 -->
                      <li class="no-data">
                        <span class="desc"
                          >녹취 파일이 없어 상담 요약이 제공되지 않습니다.</span
                        >
                      </li>
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
                    <em>보험사고 담당자</em
                    ><a href="#!" class="badge-btn-del"></a>
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
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted } from 'vue';

  const props = defineProps({
    visible: Boolean,
    initData: Object,
  });

  onMounted(() => {
    console.log('팝업에 전달된 데이터:', props.initData);
  });

  watch(
    () => props.initData,
    (val) => {
      if (val) {
        console.log('💡 새로운 팝업 데이터 감지:', val);
      }
    },
    { immediate: true },
  );

  const emit = defineEmits(['update:visible', 'submit']);

  const onClose = () => {
    emit('update:visible', false);
  };

  const detailChatData = ref([
    {
      type: 'date',
      text: '1월 30일 화요일',
    },
    {
      type: 'recive',
      text: '블랙박스 영상 보내드립니다. <br>확인 후 연락 부탁드립니다.',
    },
    {
      type: 'recive',
      text: '블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다. 블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.블랙박스 영상 보내드립니다. 확인 후 연락 부탁드립니다.',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
    {
      type: 'recive',
      text: '네 그렇게 하시면 됩니다',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
    {
      type: 'sent',
      text: '홍길동님 블박 영상 보내주세요',
    },
  ]);
</script>

<style>
  popup_wrap.type_split {
    position: relative;
  }
  popup_wrap.type_split .popup-header {
    position: absolute !important;
    right: 37px;
    top: 20px;
  }
  popup_wrap.type_split .popup-body {
    height: calc(100vh - 100px);
  }
  popup_wrap.type_split .popup-body .split-box {
    height: inherit;
  }
  popup_wrap.type_split .popup-body .split-box section {
    display: flex;
    flex-direction: column;
  }

  popup_wrap.type_split .popup-body .split-box section.left .content {
    display: flex;
    flex: 1;
    min-height: 10px;
    margin-top: 10px;
  }

  popup_wrap.type_split .popup-body .split-box section.right .content {
    flex: 1;
    min-height: 10px;
    display: flex;
    flex-direction: column;
  }
  popup_wrap.type_split
    .popup-body
    .split-box
    section.right
    .content
    .summary-item
    .summary-title {
    margin-top: 6px;
  }
</style>
