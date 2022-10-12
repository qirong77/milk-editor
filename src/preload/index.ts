import { contextBridge, ipcRenderer } from 'electron'
// 渲染进程中可以使用的API
import { electronAPI } from '@electron-toolkit/preload'
import { CLOSE_SCREEN, MAX_SCREEN, MIN_SCREEN } from '../main/constant'
// 导入.d.ts类型文件的时候不能有扩展名！
import { Api } from './index.d'
// Custom APIs for renderer
const api: Api = {
  say: () => {
    console.log('hello')
  },
  maxScreen: () => {
    ipcRenderer.send(MAX_SCREEN)
  },
  minScreen: () => {
    ipcRenderer.send(MIN_SCREEN)
  },
  closeScreen: () => {
    ipcRenderer.send(CLOSE_SCREEN)
  }
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// 默认情况下electron是隔离的，就是在preload中定义的window属性在render中是访问不到的
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  console.log('not isolate')
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
