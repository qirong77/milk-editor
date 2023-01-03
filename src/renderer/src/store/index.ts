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
      searchInfo: {
        index: 0,
        isCase:false,
        isBlank:false,
        path:'',
      },
      globalSearchWord: ''
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
    // 是否显示输入框，当有focus的文件的时候会
    setShowInput(visiable: boolean) {
      this.showInput = visiable
    },
    setSearchInfo(newInfo: { index?: number; isCase?: boolean; isBlank?: boolean,path?:string }) {
      this.searchInfo = {
        ...this.searchInfo,
        ...newInfo
      }
    },
    setGlobalWord(str: string) {
      this.globalSearchWord = str
    }
  }
})
