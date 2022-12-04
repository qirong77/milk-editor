// 由file-list统一收集更新数据，不要过多的监听

import { defineStore } from 'pinia'

export const useStore = defineStore('global', {
  state: () => {
    return {
      // 激活的路径，可能是多个
      activePath: '',
      openedFolders: [],
      // 打开的文件，只有一个
      openedFile: '',
      totalPaths: ['']
    }
  },
  actions: {
    changeActivePath(path: string) {
      this.activePath = path
    },
    changeOpenedPath(path: string) {
      this.openedFile = path
    },
    setTotalPaths(paths: string[]) {
      this.totalPaths = paths
    }
  }
})
