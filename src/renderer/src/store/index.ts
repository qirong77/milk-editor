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
      // 全局搜索的信息
      searchInfo: {
        index: 0,
        isCase: false,
        isBlank: false,
        path: '',
        word: ''
      },
      // 是否为聚集显示模式，就是在左侧列举只会展开当前打开的文件的文件树
      focusMode: true,
      shortcuts: {
        searchWord: false,
        searchWordGlobal: false,
        searchFile:false,
        sideBar: true,
        toolBar: false
      }
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
    setSearchInfo(newInfo: Partial<typeof this.searchInfo>) {
      console.log('📕', 'setSearchInfo')
      this.searchInfo = {
        ...this.searchInfo,
        ...newInfo
      }
    },
    setShortCuts(newCuts: Partial<typeof this.shortcuts>) {
      this.shortcuts = {
        ...this.shortcuts,
        ...newCuts
      }
    }
  }
})
