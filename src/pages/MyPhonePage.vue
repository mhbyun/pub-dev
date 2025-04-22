<template>
  <div class="myPhone-body">
    <ul class="myPhone-tab-title">
      <li
        class="tab-title"
        :class="{ active: activeTab === 'call' }"
        @click="activeTab = 'call', goDetail('')"
        data-target="#tab1"
      >
        통화
      </li>
      <li
        class="tab-title"
        :class="{ active: activeTab === 'msg' }"
        @click="activeTab = 'msg', goDetail('msg')"
        data-target="#tab2"
      >
        메시지 <i class="new-msg active">13</i>
      </li>
    </ul>

    <div class="myPhone-tab-content">
      <TabCall v-if="activeTab === 'call'" />
      <TabMessage v-else />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabCall from 'components/TabCall.vue'
import TabMessage from 'components/TabMessage.vue'

const activeTab = ref('call')

const router = useRouter()

const goDetail = (data) => {
  const path = data ? `/detail${data}` : '/'
  router.push(path)
}
</script>
