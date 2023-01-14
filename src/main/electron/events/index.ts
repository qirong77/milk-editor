
import { onInterProcess } from './modules/onInterProcess'
import { onRender } from './modules/onRender'

export const onEvents = () => {
  onRender()
  onInterProcess()
}
