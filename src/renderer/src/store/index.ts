// 由file-list统一收集更新数据，不要过多的监听

import { defineStore } from 'pinia'

export const useStore = defineStore('global', {
  state: () => {
    return {
      activePath: '',
      openedFolders:[]
    }
  },
  actions: {
    changeActivePath(path: string) {
      this.activePath = path
    }
  }
})
