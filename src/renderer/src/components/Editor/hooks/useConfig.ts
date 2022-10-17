import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import { listenerCtx } from '@milkdown/plugin-listener'
import { useUpdateHeaders } from '@renderer/components/SideBar/hooks/useUpdateHeader'

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
        .markdownUpdated(() => {
          console.log('when markdown updates')
          useUpdateHeaders()
        })
        .blur(() => {
        //   window.api.updateFile({ filePath, newFileContent:content })
        })
        .focus(() => {
          console.log(' when focus editor')
        })
        .destroy(() => {
          console.log('when editor is being destroyed')
        })
    })
}
