const events = {
  NEW_FILE: '新建文件或者新建文件夹的时候通知更新'
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
