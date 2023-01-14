import { DELETE } from '../../../common/eventType'
import eventBus from '../EventBus'
import { useStore } from '../store'

export const useShortCuts = () => {
  const store = useStore()
  document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'p') {
      store.setShortCuts({ searchFile: true })
    }
    if (e.metaKey && e.key === 'Backspace' && store.focusedPath) {
      window.api.sendToMain(DELETE, store.focusedPath)
    }
    if (e.metaKey && e.key === 'f' && !e.shiftKey) {
      store.setShortCuts({
        searchWord: true
      })
      eventBus.emit('INPUT_FOCUS')
    }
    if (e.metaKey && e.key === 'f' && e.shiftKey) {
      store.setShortCuts({
        searchWordGlobal: true
      })
      eventBus.emit('INPUT_FOCUS_G')
    }
    if (e.metaKey && e.key === 't') {
      store.setShortCuts({
        toolBar: !store.shortcuts.toolBar
      })
    }
    // 一个enter只处理一件事情
    if (e.key === 'Enter') {
      if (store.shortcuts.searchWord) {
        store.setShortCuts({ searchWord: false })
      } else if (store.focusedPath) {
        store.setShowInput(true)
      }
    }
    if (e.key === 'Escape') {
      store.setShortCuts({
        searchWord:false,
        searchFile:false,
      })
    }
  })
}
