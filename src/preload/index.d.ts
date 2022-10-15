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
export interface Api {
  say: () => void
  minScreen: () => void
  maxScreen: () => void
  closeScreen: () => void
  onOpenFile: (callback: Listener) => void
  openDefaultDir: () => Promise<
    Array<{
      fileName: string
      fileContent: string
    }>
  >
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: Api
  }
}
