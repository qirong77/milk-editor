import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { listenerCtx } from '@milkdown/plugin-listener'
import { debounce } from 'debounce'
export const useConfig = (editor: Editor, root: HTMLElement,setMarkdown) => {
  const debounceSet = debounce(setMarkdown, 500, false)
  editor
    .config((ctx) => {
      ctx.set(rootCtx, root)
    })
    // 默认值
    .config((ctx) => {
      ctx.set(defaultValueCtx, '')
    })
    // 生命周期
    .config((ctx) => {
      ctx
        .get(listenerCtx)
        .beforeMount(() => {})
        .mounted(() => {})
        .markdownUpdated((_ctx, markdown) => {
          debounceSet(markdown)
        })
        .updated(() => {})
        .blur(() => {})
        .focus(() => {})
        .destroy(() => {})
    })
}
