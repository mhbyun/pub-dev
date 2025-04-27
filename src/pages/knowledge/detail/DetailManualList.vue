<template>
  <section class="card board-list-card">
    <div class="list-filter">
      <i>전체(35)</i>
      <ul>
        <li class="active">정확도순</li>
        <li>최신순</li>
      </ul>
    </div>

    <div class="board-list-wrap">
      <div class="board-list">
        <dl
          class="item"
          v-for="item in boardList"
          :key="item.id"
          :class="{ active: activeId === item.id }"
          @click="goToDetail(item.id)"
        >
          <dt>
            <span class="badge-xs badge-board" :class="item.type">{{
              item.label
            }}</span>
            <b>{{ item.title }}</b>
            <i>{{ item.date }}</i>
          </dt>
          <dd class="text1">
            {{ item.summary }}
          </dd>
          <dd class="text2">{{ item.category }}</dd>
        </dl>
      </div>
    </div>

    <div class="pagenation">
      <a class="direction l type-disabled" href="#!"></a>
      <a href="#!" class="first active">1</a>
      <a href="#!">2</a>
      <a href="#!">3</a>
      <a href="#!">4</a>
      <a href="#!">5</a>
      <a class="direction r" href="#!"></a>
    </div>

    <label class="input-mix w100p">
      <input type="text" class="w100p" placeholder="검색어를 입력해 주세요" />
      <span class="unit">
        <a href="javascript:;" class="btn-ico ico-search"></a>
      </span>
    </label>
  </section>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
  import { useRouter } from 'vue-router';

  const activeId = ref(null);

  const goToDetail = (id) => {
    activeId.value = id;
    console.log('선택한 ID:', id);
    router.push({ name: 'manualDetail', params: { id: activeId.value } });
  };

  const router = useRouter();

  const boardList = ref([
    {
      id: '1004',
      type: 'type4',
      label: '화재',
      title: '주택화재 손해 인정 기준 요약',
      date: '2025-03-14',
      summary:
        '주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시...',
      category: '상품 > 화재보험 > 보험금 지급기준',
    },
    {
      id: '1005',
      type: 'type6',
      label: '실손',
      title: '실손 의료비 지급 기준 요약',
      date: '2025-03-14',
      summary:
        '실손의료비는 실비로 보장하는 보험으로, 실제 발생한 의료비를 기준으로 지급됩니다...',
      category: '상품 > 실손보험 > 지급기준',
    },
    {
      id: '1005',
      type: 'type4',
      label: '화재',
      title: '주택화재 손해 인정 기준 요약',
      date: '2025-03-14',
      summary:
        '주택화재의 경우 건물, 가재도구, 벽지·장판 등은 보상 가능 항목에 포함됩니다. 다만, 보험 가입 시...',
      category: '상품 > 화재보험 > 보험금 지급기준',
    },
    {
      id: '1006',
      type: 'type6',
      label: '실손',
      title: '실손 의료비 지급 기준 요약',
      date: '2025-03-14',
      summary:
        '실손의료비는 실비로 보장하는 보험으로, 실제 발생한 의료비를 기준으로 지급됩니다...',
      category: '상품 > 실손보험 > 지급기준',
    },
  ]);
</script>
