<template>
  <!-- router-view 안에 들어갈 영역 -->
  <CallList />

  <article class="contents-r">
    <DetailCall />
  </article>
</template>

<script setup>
import CallList from 'components/CallList.vue'
import DetailCall from 'components/DetailCall.vue'
</script>
