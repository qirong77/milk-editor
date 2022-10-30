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
  sendEvents: Function
  onOpenFile: (callback: Listener) => void
  onUpdateFileList: (callback: (e: IpcRendererEvent, ...args: any) => void) => void
  openDefaultDir: () => Promise<IFileList>
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
