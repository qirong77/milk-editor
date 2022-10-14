import { Ctx, defaultValueCtx } from '@milkdown/core'
import { listenerCtx } from '@milkdown/plugin-listener'
const DEFAULT_MARKDOWN = `# H1
## H2
### H3
#### H4
###### H5`
export const useConfig = (ctx: Ctx) => {
  // ctx.set(defaultValueCtx, DEFAULT_MARKDOWN)
  ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
    // console.log(ctx)
  })
}
