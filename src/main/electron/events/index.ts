import { BrowserWindow } from 'electron'
import { onInterProcess } from './modules/onInterProcess'
import { onRender } from './modules/onRender'

export const onEvents = (window: BrowserWindow, opedDir: string) => {
  onRender(window)
  onInterProcess(opedDir)
}
