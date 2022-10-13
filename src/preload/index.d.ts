import { ElectronAPI } from '@electron-toolkit/preload'
import { IpcRendererEvent } from 'electron'
// 自定义声明API用来传递事件，在全局上定义这个的类型就可以访问到了
// export interface Api {
//   say: () => void
//   minScreen:()=>void
//   maxScreen:()=>void
//   closeScreen:()=>void
// }
interface Listener {
  (event: IpcRendererEvent, ...args: any[]):void
}
export interface Api {
  say: () => void
  minScreen: () => void
  maxScreen: () => void
  closeScreen: () => void
  onUpdateEditor:(callback:Listener)=>void
}
declare global {
  interface Window {
    electron: ElectronAPI
    api:Api
  }
}
