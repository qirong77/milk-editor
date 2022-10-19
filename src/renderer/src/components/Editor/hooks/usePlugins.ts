import { Editor } from '@milkdown/core'
import { nord } from '@milkdown/theme-nord'
import { listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { history } from '@milkdown/plugin-history'
import { clipboard } from '@milkdown/plugin-clipboard'
// 官方引用的图标库，如菜单栏需要使用到
import '@material-design-icons/font'
// 数学公式渲染
import 'katex/dist/katex.min.css'
// 代码高亮
import 'prism-themes/themes/prism-material-oceanic.min.css'
import { blockquote, codeFence, gfm, SupportedKeys, taskListItem } from '@milkdown/preset-gfm'
const gitHubCommonMark = gfm
  .configure(blockquote, {
    keymap: {
      [SupportedKeys.Blockquote]: 'Mod-Shift-q'
    }
  })
  .configure(taskListItem, {})
  .configure(codeFence, {
    languageList: ['scss', 'javascript', 'css', 'html', 'typescript']
  })
export const usePlugins = (Editor: Editor) => {
  Editor.use(nord)
    .use(history)
    .use(listener)
    .use(prism)
    .use(menu)
    .use(clipboard)
    .use(gitHubCommonMark)
}
