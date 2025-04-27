<template>
  <div class="settings-mid">
    <div class="title-box">
      <div class="title">제외 연락처 등록</div>
      <div class="btns">
        <a href="javascript:;" class="btn-sm btn-basic">초기화</a>
        <a href="javascript:;" class="btn-sm btn-basic">등록</a>
      </div>
    </div>
    <form class="form-box">
      <div class="form-mix">
        <label>제외번호</label>
        <input type="text" placeholder="제외번호" class="w150px" />
      </div>
      <div class="form-mix">
        <label>설정</label>
        <input type="text" placeholder="홍길동" class="w150px" />
      </div>
    </form>
  </div>
</template>

<script setup>
  import { defineProps, defineEmits, ref, onMounted, watch } from 'vue';
  import { global } from 'assets/js/publish/global';
</script>
