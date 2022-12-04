<template>
  <!-- 为了避免overflow显示异常，这里使用teleport传送 -->
  <Teleport to="body">
    <div
      class="drag-line"
      :style="{ marginLeft: width + moveDistance + 'px' }"
      @mousedown="handleMouseDown"
    ></div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps<{ width: number }>()
const moveDistance = ref(0)
const emits = defineEmits(['drag-done'])
const handleMouseDown = (e: MouseEvent) => {
  // clietX就是距离浏览器视口的位置
  const clientX = e.clientX
  document.onmousemove = (e) => {
    const newClientX = e.clientX
    moveDistance.value = newClientX - clientX
    return false
  }
  // 释放鼠标的时候解除事件绑定
  document.onmouseup = (e) => {
    const newPosition = e.clientX
    if (newPosition < 180 || newPosition > 600) {
    } else emits('drag-done', newPosition)

    moveDistance.value = 0
    document.onmousemove = null
    document.onmouseup = null
    return false
  }
}
</script>

<style lang="scss">
.drag-line {
  width: 3px;
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 99999;
  margin-left: 100px;
  background-color: rgb(172, 203, 228) !important;
  opacity: 0;
  &:hover {
    cursor: ew-resize;
    scale: 1.2;
    opacity: 100%;
  }
}
</style>
