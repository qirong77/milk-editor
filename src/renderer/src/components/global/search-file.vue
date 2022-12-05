<template>
  <div
    class="search-file"
  >
    <div>
      <span></span>
      <input v-model="search_content" type="text" />
    </div>
    <ul>
      <template v-for="(path, index) in paths" :key="path">
        <li
        @click="handleClick"
          :class="{
            'active': currentIndex === index
          }"
        >
          <span>{{ basename(path) }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from '../../store'
import { basename } from 'path-browserify'

const search_content = ref('')
const store = useStore()
const paths = computed(() =>
  store.totalPaths.filter((path) => basename(path).includes(search_content.value))
)
const currentIndex = ref(0)
const emits = defineEmits(['update-path','open-file'])
const handleClick = () => {emits('open-file')}
watch(currentIndex, () => {
  const target = document.querySelector('.active')
  if (!target) return
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entrie) => {
      //如果不可见,就需要向上滚动或者向下滚动
      if (entrie.intersectionRatio < 0.5) {
        // 显示十个，如果大于8，大于9都可以，表示向下滚动
        if (currentIndex.value > 1) target?.scrollIntoView(false)
        else target?.scrollIntoView(true)
      }
      // 不管是否可见，操作完就移除观察
      io.unobserve(target)
    })
  })
  io.observe(target)
  emits('update-path',paths[currentIndex.value])
})
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    if (currentIndex.value === 0) currentIndex.value = paths.value.length-1
    else currentIndex.value -= 1
    console.log('📕',currentIndex.value)
  }
  if(e.key ==='ArrowDown') {
    if(currentIndex.value===paths.value.length-1) currentIndex.value = 0
    else currentIndex.value +=1
  }
})

</script>

<style lang="scss" scoped>
.search-file {
  top: 30px;
  position: fixed;
  z-index: 9999;
  width: auto;
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
