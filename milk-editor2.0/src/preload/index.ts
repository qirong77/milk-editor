import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { GET_DIR_TREE, GET_FILE_LIST, GET_SEARCH_RESUlT } from '../common/eventType'
import { IFileList, FileTree } from '../common/interface'

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

  onGetDirTree: async () => {
    const tree = (await ipcRenderer.invoke(GET_DIR_TREE)) as FileTree
    return tree
  },
  onGetFileList: async () => {
    const fileList = (await ipcRenderer.invoke(GET_FILE_LIST)) as IFileList[]
    return fileList
  },
  searchDirWord: async (target:string) => {
    const results = await ipcRenderer.invoke(GET_SEARCH_RESUlT,target)
    return results
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
