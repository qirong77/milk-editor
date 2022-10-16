import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRendererEvent } from 'electron'
interface Listener {
  (
    event: IpcRendererEvent,
    paylod: {
      filePath: string
      fileContent: string
    }
  ): void
}
export type IFileList = Array<{
  fileName: string
  filePath: string
}>
export interface Api {
  say: () => void
  minScreen: () => void
  maxScreen: () => void
  closeScreen: () => void
  onOpenFile: (callback: Listener) => void
  openDefaultDir: () => Promise<IFileList>
  clickFileList:(filePath:string)=>void
  updateFile:({filePath:string,newFileContent:string})=>void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
