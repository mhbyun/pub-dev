<template>
  <router-view />
</template>

<script setup>
import 'assets/css/style.css'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { initTabs } from 'assets/js/publish/style.js'

const route = useRoute()

watch(
  () => route.fullPath,
  () => {
    // DOM이 완전히 렌더링된 후 실행되도록
    setTimeout(() => initTabs(), 0)
  },
  { immediate: true } // 첫 진입 시에도 실행
)


</script>
<style>
#q-app {
  font-family: "Pretendard", "Malgun Gothic", "맑은고딕", -apple-system, "돋움", "dotum", sans-serif;
  font-size: 14px; /* or 16px */
}
</style>
