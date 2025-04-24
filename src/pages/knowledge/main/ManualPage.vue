<template>
  <section class="contents-c-body">
    <div class="text-title lg">지식검색</div>
    <label class="input-mix w-lg">
      <input type="text" class="w100p" placeholder="검색어 + Enter">
      <span class="unit">
        <a href="javascript:;" class="btn-ico ico-search"></a>
      </span>
    </label>
    <div class="box-item type-line treeList">
      <ul class="tree depth1">
        <TreeNode
          v-for="node in treeData"
          :key="node.id"
          :node="node"
          :depth="1"
          :selected-id="selectedId"
          @select="handleSelect"
        />
      </ul>
    </div>
  </section>
</template>

<script setup>
import { defineProps, defineEmits, ref, onMounted, watch, computed, reactive } from 'vue'
import { global } from 'assets/js/publish/global'
import TreeNode from 'components/TreeNode.vue'
const selectedId = ref(null)

const treeData = reactive([
  {
    id: 'cat01',
    name: 'Category 01',
    isOpen: true,
    children: [
      {
        id: 'group01',
        name: 'Group 01',
        isOpen: true,
        children: [
          { id: 'sub01a', name: 'Sub Group 01' },
          { id: 'sub01b', name: 'Sub Group 01' }
        ]
      },
      {
        id: 'group02',
        name: 'Group 02',
        isOpen: true,
        children: [
          { id: 'sub02a', name: 'Sub Group 01' },
          { id: 'sub02b', name: 'Sub Group 01' }
        ]
      },
      {
        id: 'group03',
        name: 'Group 03 - 자식없음'
      }
    ]
  },
  {
    id: 'cat02-1',
    name: 'Category 02',
    children: [
      { id: 'group04', name: 'Group 01' }
    ]
  },
  {
    id: 'cat02-2',
    name: 'Category 02',
    children: [
      { id: 'group05', name: 'Group 01' }
    ]
  },
  {
    id: 'cat02-3',
    name: 'Category 02',
    children: [
      { id: 'group06', name: 'Group 01' }
    ]
  },
  {
    id: 'cat02-4',
    name: 'Category 02',
    children: [
      { id: 'group07', name: 'Group 01' }
    ]
  },
  {
    id: 'cat02-5',
    name: 'Category 02',
    children: [
      { id: 'group08', name: 'Group 01' }
    ]
  }
])

const handleSelect = (id) => {
  selectedId.value = id
  console.log('선택된 ID:', id)
}
</script>
