<template>
  <div class="search-box2">
    <div class="wrap">
      <div class="input-mix type-datepicker w150px">
        <span class="unit">
          <a href="javascript:;" class="btn-ico type-text"></a>
        </span>
        <input type="text" placeholder="yyyy-mm-dd" value="2022-11-01" readonly="">
      </div>
      <div class="input-mix type-datepicker w150px">
        <span class="unit">
          <a href="javascript:;" class="btn-ico type-text"></a>
        </span>
        <input type="text" placeholder="yyyy-mm-dd" value="2022-11-01" readonly="">
      </div>
      <select class="w150px">
        <option>전체선택</option>
        <option>이미지</option>
        <option>미디어</option>
        <option>문서</option>
      </select>
      <select class="w150px">
        <option>접수번호</option>
        <option>전화번호</option>
        <option>카카오톡</option>
      </select>
      <label class="input-mix w-lg">
        <input type="text" class="w100p" placeholder="검색어를 입력해 주세요.">
        <span class="unit">
          <a href="javascript:;" class="btn-ico ico-search"></a>
        </span>
      </label>
    </div>
    <a href="javascript:;" class="btn-md btn-secondary">조회</a>
  </div>

  <section class="mBox-file-wrap">
    <template v-for="(group, groupIndex) in fileGroups" :key="groupIndex">
      <!-- 날짜 헤더 -->
      <div class="flex-row">
        <p class="text-title text-md">{{ group.date }}</p>
        <label class="checkbox-item">
          <input
            type="checkbox"
            :checked="isAllChecked(group)"
            @change="toggleAll(group)"
          />
          <span>전체선택</span>
        </label>
      </div>

      <!-- 파일 리스트 -->
      <ul>
        <li
          class="mBox-file"
          v-for="(file, fileIndex) in group.files"
          :key="fileIndex"
        >
          <label class="checkbox-item">
            <input
              type="checkbox"
              v-model="file.checked"
            />
            <span></span>
          </label>
          <p>
            <i :class="`file-ico ${file.icon}`"></i>
          </p>
          <ol>
            <li>{{ file.time }}</li>
            <li>{{ file.phone }}</li>
            <li>{{ file.callId }}</li>
            <li>
              <i>{{ file.code }}</i>
              <i>{{ file.name }}</i>
            </li>
          </ol>
        </li>
      </ul>
    </template>
  </section>
  <div class="form-mix flex-end">
    <a href="javascript:;" class="btn-md btn-basic">삭제</a>
    <a href="javascript:;" class="btn-md btn-secondary">다운로드</a>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// ✅ 데이터 구조: 날짜별 그룹화
const fileGroups = ref([
  {
    date: '2025년 3월 31일 (화)',
    files: [
      { icon: 'type1', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false },
      { icon: 'type2', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false },
      { icon: 'type3', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false }
    ]
  },
  {
    date: '2025년 3월 30일 (월)',
    files: [
      { icon: 'type4', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false },
      { icon: 'type1', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false },
      { icon: 'type1', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false },
      { icon: 'type1', time: '오후 08:22', phone: '010-2325-5628', callId: '2025-0101012345', code: '인001', name: '고애주', checked: false }
    ]
  }
])

// ✅ 그룹 전체 체크 상태 확인
const isAllChecked = (group) => {
  return group.files.every(file => file.checked)
}

// ✅ 전체 선택/해제 토글
const toggleAll = (group) => {
  const shouldCheck = !isAllChecked(group)
  group.files.forEach(file => (file.checked = shouldCheck))
}
</script>
