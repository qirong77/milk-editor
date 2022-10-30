import { contextBridge, ipcRenderer } from 'electron'
// 渲染进程中可以使用的API
import { electronAPI } from '@electron-toolkit/preload'
import { OPEN_DEFAULT_DIR, OPEN_NEW_FILE, UPDATE_FILE_LIST } from '../main/electron/events/constant'
// 导入.d.ts类型文件的时候不能有扩展名！
import { Api } from './index.d'
// Custom APIs for renderer
const sendEvents = (event: string, ...args: any) => {
  ipcRenderer.send(event, ...args)
}
const api: Api = {
  sendEvents,
  onOpenFile: (callback) => {
    ipcRenderer.on(OPEN_NEW_FILE, callback)
  },
  onUpdateFileList: (callback) => {
    ipcRenderer.on(UPDATE_FILE_LIST, callback)
  },
  openDefaultDir: async () => {
    const defaultDirContents = await ipcRenderer.invoke(OPEN_DEFAULT_DIR)
    return defaultDirContents
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
// 默认情况下electron是隔离的，就是在preload中定义的window属性在render中是访问不到的
// 仔细看下面两个，反正不管你是怎么设置的，最终window上都会挂载到electronAPI和自己定义的
if (process.contextIsolated) {
  // 如果需要再renderer使用nodejs，需要关闭isolate
  console.log('contextIsolated')
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
