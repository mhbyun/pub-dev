<template>
  <!-- 좌측 메뉴 -->
  <aside>
    <h1></h1>
    <ul class="nav">
      <li v-for="(item, index) in sideList" :key="index" class="menu-sec">
        <router-link
          :to="`/${item.route.toLowerCase()}`"
          class="depth1-link"
          :class="[item.iconClass, { active: activeDepth1 === index }]"
          @click="toggleMenu(index)"
        >
          {{ item.title }}
        </router-link>

        <ul v-if="item.items?.length" class="depth2">
          <li
            v-for="(subItem, subIndex) in item.items"
            :key="subIndex"
          >
            <router-link
              :to="`/${item.route.toLowerCase()}/${subItem.path}`"
              class="depth2-link"
              :class="{ active: activeDepth1 === index && activeDepth2 === subIndex }"
              @click="setActiveSubItem(index, subIndex)"
            >
              {{ subItem.label }}
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>


<script setup>
import { ref, toRaw, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const sideList = ref([
  {
    title: 'My Phone',
    iconClass: 'type1',
    route: 'myphone',
    items: []
  },
  {
    title: '모바일 Box',
    iconClass: 'type2',
    route: 'mobilebox',
    items: []
  },
  {
    title: '지식창고',
    iconClass: 'type3',
    route: 'knowledge',
    items: [
      { label: '실무참고서', path: 'manual' },
      { label: '판례', path: 'case' },
      { label: '지침', path: 'guide' },
      { label: '관련법률', path: 'law' },
      { label: '어시스턴트', path: 'assistant' }
    ]
  },
  {
    title: '분석관리',
    iconClass: 'type4',
    route: 'analysis',
    items: [
      { label: '통화이력', path: 'history' },
      { label: '통화통계', path: 'statistics' },
      { label: '데이터분석', path: 'data' }
    ]
  },
  {
    title: '설정',
    iconClass: 'type5',
    route: 'settings',
    items: [
      { label: '제외번호관리', path: 'except' },
      { label: '제외번호 이력로그', path: 'exceptlog' },
      { label: '업무시간관리', path: 'workingtime' },
      { label: '사용자상태', path: 'userstate' },
      { label: '단말기관리', path: 'device' },
      { label: '메뉴관리', path: 'menu' },
      { label: '지식창고관리', path: 'knowledgeadmin' },
      { label: '사용자 및 부서 관리', path: 'usergroup' },
      { label: '모바일 로그', path: 'mobilelog' },
      { label: '시스템설정', path: 'system' }
    ]
  }
])


// ✅ 활성 상태
const activeDepth1 = ref(0)
const activeDepth2 = ref(0)

const toggleMenu = (index) => {
  activeDepth1.value = index
  activeDepth2.value = 0 // 기본 첫 번째 뎁스2 선택
}

const setActiveSubItem = (d1Index, d2Index) => {
  activeDepth1.value = d1Index
  activeDepth2.value = d2Index
}

onMounted(() => {
  menuChange()
})


watch(() => route.path, () => {
  menuChange()
})

const menuChange = () => {
  const path = route.path.split('/').filter(Boolean) // ['knowledge', 'manual'] 같은 배열
  const [depth1Path, depth2Path] = path

  sideList.value.forEach((menu, index) => {
    if (menu.route === depth1Path) {
      activeDepth1.value = index

      if (menu.items?.length) {
        const subIndex = menu.items.findIndex(item => item.path === depth2Path)
        activeDepth2.value = subIndex !== -1 ? subIndex : 0
      }
    }
  })
}

</script>
