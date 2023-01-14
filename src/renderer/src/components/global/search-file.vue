<template>
  <div class="search-file"> 
      <div>
        <span>{{ currentIndex }}</span>
        <input v-model="searchContent" type="text" @keydown="handleKeyDown" />
      </div>
      <ul>
        <template v-for="(path, index) in paths" :key="path">
          <li
            @click="handleClick"
            :class="{
              active: currentIndex === index
            }"
          >
            <span>{{ basename(path) }}</span>
          </li>
        </template>
      </ul>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useStore } from '../../store'
import { basename } from 'path-browserify'
const searchContent = ref('')
const store = useStore()
const paths = computed(() => {
  const regex = new RegExp(searchContent.value, 'i')
  return store.totalPaths.filter((path) => regex.test(basename(path)))
})
const currentIndex = ref(0)
const key = ref<'down' | 'up'>('down')
const handleClick = () => {
  store.setShortCuts({
    searchFile: false
  })
}
watch(currentIndex, () => {
  const currentPath = paths.value[currentIndex.value]
  console.log('📕', currentPath)
  nextTick(() => {
    const target = document.querySelector('.active')
    if (!target) throw new Error('not-active-file-item')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entrie) => {
        //如果不可见,就需要向上滚动或者向下滚动
        if (entrie.intersectionRatio < 0.9) {
          // 表示向下滚动
          if ((key.value = 'down')) target?.scrollIntoView(false)
          else target?.scrollIntoView(true)
        }
        // 不管是否可见，操作完就移除观察
        io.unobserve(target)
      })
    })
    io.observe(target)
  })
})
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    if (currentIndex.value === 0) currentIndex.value = paths.value.length - 1
    else currentIndex.value -= 1
    key.value = 'up'
  }
  if (e.key === 'ArrowDown') {
    if (currentIndex.value === paths.value.length - 1) currentIndex.value = 0
    else currentIndex.value += 1
    key.value = 'down'
  }
  if (e.key === 'Enter') {
    // 打开一个文件
    store.changeOpenedPath(paths.value[currentIndex.value])
    store.setShortCuts({
      searchFile: false
    })
  }
}
onMounted(() => {
  document.querySelector('.search-file')?.querySelector('input')?.focus()
})
</script>

<style lang="scss" scoped>
.search-file {
  top: 30px;
  position: fixed;
  z-index: 9999;
  width: 300px;
  overflow: scroll;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  border-radius: 4px;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    margin: 6px;
    input {
      height: 100%;
      width: 80%;
      border-width: 1.6px;
    }
  }
  ul {
    height: 300px;
    overflow: scroll;
  }
  li {
    height: 25px;
    display: flex;
    align-items: center;
    font-size: 15px;
    span {
      margin-left: 20px;
    }
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
