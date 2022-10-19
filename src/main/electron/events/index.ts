import { BrowserWindow } from 'electron'
import { onInterProcess } from './onInterProcess'
import { onRender } from './onRender'

export const onEvents = (window: BrowserWindow) => {
  onRender(window)
  onInterProcess(window)
}
