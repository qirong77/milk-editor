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
  }
})
