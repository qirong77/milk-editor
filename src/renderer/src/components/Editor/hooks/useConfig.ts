import { listenerCtx } from '@milkdown/plugin-listener'

import { Ctx } from '@milkdown/core'
import { useUpdateHeaders } from '@renderer/components/SideBar/hooks/useUpdateHeader'
import { useDebounce } from '@renderer/common/useDebouce'
const nofifyUpdateFile = (filePath,newFileContent) => {
  window.api.updateFile({filePath,newFileContent})
}

export const useConfig = (ctx: Ctx) => {
  ctx
    .get(listenerCtx)
    .beforeMount((ctx) => {
      console.log('before the editor mounts')
    })
    .mounted((ctx) => {
      console.log('after the editor mounts')
    })
    .updated((ctx, doc, prevDoc) => {
      console.log('when editor state updates')
    })
    .markdownUpdated((ctx, markdown, prevMarkdown) => {
      console.log('when markdown updates')
      useUpdateHeaders()
      // useDebounce(nofifyUpdateFile('',markdown),1000)
    })
    .blur((ctx) => {
      // console.log('when editor loses focus')
    })
    .focus((ctx) => {
      // console.log(' when focus editor')
    })
    .destroy((ctx) => {
      console.log('when editor is being destroyed')
    })
}
