import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { GET_FILE_LIST } from '../common/eventType'
import { FileTree } from '../common/interface'

// Custom APIs for renderer
const sendToMain = (e: string, ...args: any[]) => {
  ipcRenderer.send(e, ...args)
}
const onMain = (e: string, callback) => {
  ipcRenderer.on(e, callback)
}
const api = {
  sendToMain,
  onMain,
  onGetFileList: async () => {
    const fileList = (await ipcRenderer.invoke(GET_FILE_LIST)) as FileTree
    return fileList
  }
}
export type API = typeof api
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
