const events = {
  NEW_FILE: '新建文件或者新建文件夹的时候通知更新',
  CLEAN_MARKDOWN:'关闭当前文件搜索或者全局搜索的时候清空标记',
  INPUT_FOCUS:'当前文件搜索的时候再次聚焦',
  INPUT_FOCUS_G:'全局搜索的时候聚集'
}
type Event = keyof typeof events
class EventBus {
  eventsMap: Map<Event, Function[]>
  constructor() {
    this.eventsMap = new Map()
  }
  on(e: Event, callback: Function) {
    if (!this.eventsMap.has(e)) this.eventsMap.set(e, [callback])
    else this.eventsMap.get(e)?.push(callback)
  }
  emit(e: Event, ...args: any[]) {
    this.eventsMap.get(e)?.forEach((callback) => {
      callback(...args)
    })
  }
}
const eventBus = new EventBus()
export default eventBus
