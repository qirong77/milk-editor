import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { listenerCtx } from '@milkdown/plugin-listener'

export const useConfig = (editor: Editor, root: HTMLElement,setMarkdown:Function) => {
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
        .beforeMount(() => {
          console.log('before the editor mounts')
        })
        .mounted(() => {
          console.log('after the editor mounts')
        })
        .markdownUpdated((ctx,markdown)=>{
          console.log('markdownUpdated')
          setMarkdown(markdown)
        })
        .updated(() => {
          console.log('when editor state updates')
        })
        .blur(() => {})
        .focus(() => {
          console.log(' when focus editor')
        })
        .destroy(() => {
          console.log('when editor is being destroyed')
        })
    })
}
