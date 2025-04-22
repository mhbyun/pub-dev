<template>
  <div class="myPhone-top">
    <div class="form-mix">
      <div class="input-mix w60p">
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
            <img src="../assets/images/ico-import.svg" alt="">
          </a>
        </span>
      </div>

      <select class="w40p">
        <option>선택</option>
      </select>
    </div>

    <div class="form-mix">
      <input type="text" placeholder="전화번호" class="flex1" />
      <div class="phone-btns">
        <!-- 버튼 비활성화 시 class 추가: btn-disabled -->
				<!-- <a href="#!" class="btn-md btn-success phone-btn call btn-disabled"></a> -->
        <a href="#" class="btn-md btn-success phone-btn call"></a>
        <a href="#" class="btn-md btn-danger phone-btn hangup"></a>
        <a href="#" class="btn-md btn-dark phone-btn msg"></a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const appNum = ref('')

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

// 예시 데이터
const recentList = ref([
  '2025-010101223 홍길동(자동차인 차동차물) 2025-03-12 11:08:44',
  '2025-010101224 김철수(자동차물건) 2025-03-12 11:10:22',
  '2025-010101225 이영희(차량사고) 2025-03-12 11:13:01',
  '2025-010101226 박민수(운전자보장) 2025-03-12 11:14:55',
  '2025-010101227 최지우(종합보험) 2025-03-12 11:16:37',
  '2025-010101228 김나연(차량파손) 2025-03-12 11:18:59' // 👉 이건 6번째라 안보임
])

const recentClike = (item) => {
  console.log("recentClike : ", item);
  appNum.value=item;
  toggleDropdown()
}


</script>
