<template>
  <div class="container" :class="'view-mode-' + viewMode">
    <NavItem />

    <!-- 콘텐츠 공통 영역 -->
    <article class="contents-c">
      <div class="view-mode">
        <a href="#" class="view-mode-btn sm" :class="{ active: viewMode === 'sm' }" @click.prevent="setViewMode('sm')"></a>
        <a href="#" class="view-mode-btn md" :class="{ active: viewMode === 'md' }" @click.prevent="setViewMode('md')"></a>
        <a href="#" class="view-mode-btn lg" :class="{ active: viewMode === 'lg' }" @click.prevent="setViewMode('lg')"></a>
      </div>

      <Softphone />
      <router-view name="main" />
    </article>

    <article class="contents-r">
      <router-view :key="$route.fullPath" name="detail" />
    </article>

    <!-- 전역 팝업 -->
    <PopupManager />


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavItem from 'components/NavItem.vue'
import Softphone from 'components/Softphone.vue'
import PopupManager from 'src/components/PopupManager.vue'
import { useRouter } from 'vue-router'

const viewMode = ref('md')

const router = useRouter()


const applyViewModeSize = (mode) => {
  const screenWidth = window.screen.availWidth
  const screenHeight = window.screen.availHeight
  const height = Math.floor(screenHeight * 1)

  switch (mode) {
    case 'sm':
      window.resizeTo(Math.floor(screenWidth * 0.218), height)
      break
    case 'md':
      window.resizeTo(Math.floor(screenWidth * 0.65), height)
      break
    case 'lg':
      window.resizeTo(Math.floor(screenWidth * 1), height)
      break
  }
}

const setViewMode = (mode) => {
  viewMode.value = mode
  applyViewModeSize(mode)

  if (mode === 'sm') {
    router.push('/myphone')
  }
}

// 화면 resize 감지 후 크기 리셋
const onResize = () => {
  applyViewModeSize(viewMode.value)
}

onMounted(() => {
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})
</script>
