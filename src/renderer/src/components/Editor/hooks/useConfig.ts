import { defaultValueCtx, Editor, rootCtx, themeManagerCtx } from '@milkdown/core'
import { listenerCtx } from '@milkdown/plugin-listener'
import { nordDark } from '@milkdown/theme-nord'

export const useConfig = (editor: Editor, root: HTMLElement) => {
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
        .updated(() => {
          console.log('when editor state updates')
        })
        // 点击文件列表后会两次调用，导致第一次渲染标题的时候还是旧的
        .markdownUpdated((ctx,Markdown,preMarkdown) => {
          // console.log('when markdown updates')
          // console.log(Markdown)
        })
        .blur(() => {
          console.log('blur editor')
        })
        .focus(() => {
          console.log(' when focus editor')
        })
        .destroy(() => {
          console.log('when editor is being destroyed')
        })
    })
}
