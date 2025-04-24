<template>
  <li>
    <div
      class="tree-item"
      :class="{
        'child-show': hasChildren && isOpen,
        'active': selectedId === node.id
      }"
      @click.stop="handleClick(), emit('select', node.id)"
    >
      <i></i>
      <a href="javascript:;">{{ node.name }}</a>
    </div>

    <ul v-if="hasChildren" :class="`tree depth${depth + 1}`">
      <TreeNode
        v-for="child in (isOpen ? node.children : [])"
        :key="child.menu_cd"
        :node="child"
        :depth="depth + 1"
        :selected-id="selectedId"
        @select="$emit('select', $event)"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import TreeNode from 'components/TreeNode.vue'

const props = defineProps({
  node: Object,
  depth: Number,
  selectedId: String
})
const emit = defineEmits(['select'])

const isOpen = ref(false)
const hasChildren = computed(() => props.node.children && props.node.children.length > 0)

const handleClick = () => {
  isOpen.value = !isOpen.value
}
</script>
