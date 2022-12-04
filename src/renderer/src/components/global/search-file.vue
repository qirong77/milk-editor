<template>
  <div
    class="search-file"
    :style="{
      display: show ? 'block' : 'none'
    }"
  >
    <div>
      <span></span>
      <input type="text" />
    </div>
    <ul>
      <template v-for="file in store.totalPaths">
        <li>
          <span>{{ file }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useStore } from '../../store'
import MouseTrap from 'mousetrap'
const store = useStore()
const currentPath = ref(store.totalPaths[0])
const show = ref(false)
MouseTrap.bind('command+k', () => {
  console.log('📕','kkk')
  show.value = !show.value
})
MouseTrap.bind('up', () => {
  console.log('📕', 'up')
})
watch(show, () => {})
</script>

<style lang="scss" scoped>
.search-file {
  top: 30px;
  position: fixed;
  z-index: 9999;
  width: 30vw;
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
