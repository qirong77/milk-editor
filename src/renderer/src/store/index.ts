// 由file-list统一收集更新数据，不要过多的监听

import { defineStore } from 'pinia'

export const useStore = defineStore('global', {
  state: () => {
    return {
      // 打开的文件夹，用来存储重新获取文件树
      openedFolders: [],
      // 打开的文件，只有一个
      openedFile: '',
      totalPaths: [''],
      focusedPath: '',
      showInput: false,
      tab: 'file-list'
    }
  },
  actions: {
    changeOpenedPath(path: string) {
      this.openedFile = path
    },
    setTotalPaths(paths: string[]) {
      this.totalPaths = paths
    },
    setFocusedPath(path: string) {
      this.focusedPath = path
    },
    setShowInput(visiable: boolean) {
      this.showInput = visiable
    },
    setTab(tab: 'file-list' | 'search-word-global' | 'header-list') {
      this.tab = tab
    }
  }
})
