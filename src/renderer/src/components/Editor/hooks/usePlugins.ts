import { Editor } from '@milkdown/core'
import { nordDark } from '@milkdown/theme-nord'
import { listener } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { menu } from '@milkdown/plugin-menu'
import { history } from '@milkdown/plugin-history'
import { clipboard } from '@milkdown/plugin-clipboard'
// 官方引用的图标库，如菜单栏需要使用到
import '@material-design-icons/font'
// 数学公式渲染
// import 'katex/dist/katex.min.css'
// 代码高亮
import 'prism-themes/themes/prism-atom-dark.min.css'
import {
  blockquote,
  codeFence,
  gfm,
  SupportedKeys,
  taskListItem,
  heading
} from '@milkdown/preset-gfm'
const gitHubCommonMark = gfm
  .configure(blockquote, {
    keymap: {
      [SupportedKeys.Blockquote]: 'Mod-Alt-q'
    }
  })
  .configure(heading, {
    keymap: {
      [SupportedKeys.H1]: 'Mod-1',
      [SupportedKeys.H2]: 'Mod-2',
      [SupportedKeys.H3]: 'Mod-3',
      [SupportedKeys.H4]: 'Mod-4',
      [SupportedKeys.H5]: 'Mod-5',
      [SupportedKeys.H6]: 'Mod-6'
    }
  })
  .configure(taskListItem, {})
  .configure(codeFence, {
    languageList: ['scss', 'javascript', 'css', 'html', 'typescript', 'text', 'vue', 'react']
  })
export const usePlugins = (Editor: Editor) => {
  Editor.use(nordDark)
    .use(history)
    .use(listener)
    .use(menu)
    .use(prism)
    .use(clipboard)
    .use(gitHubCommonMark)
}
