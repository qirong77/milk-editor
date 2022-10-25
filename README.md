# milk-editor

An typora like application with Electron,React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### 已完成功能

1. 拖拽侧边栏改变大小
2. 集成 milkdown
3. milkdown 通用工具栏
4. 生成类似于 typora 的 header 侧边栏
5. 点击 header 跳转
6. 主题切换
7. git 管理
8. 原生功能菜单结合（关闭，缩小，全屏）
9. 进程通信
10. 文件切换
11. 侧边栏显示隐藏切换
12. 文件编辑保存

### 待完成功能

1. slash 斜杠命令
2. 关键词搜索（并且定位）
3. 实时修改加粗样式 -> toolbar
4. 快速展开/收缩标题
5. 文件重命名
6. 源代码和现在的切换
7. 控制使用箭头在代码块里面选择语言
### 学习笔记

1. 导入.d.ts 文件的类型时，不能输入.d.ts 的后缀

### 参考学习文档

1. electron
   https://www.electronjs.org/zh/docs/latest
2. milkdown
   https://milkdown.dev/zh-hans/getting-started
3. 别人的项目
   https://github.com/CatsAndMice/milkdown
4. 官方 example
   https://github.com/Saul-Mirone/milkdown
5. blog:electron + vite
   https://dev.to/brojenuel/vite-vue-3-electron-5h4o
6. npm:electron-vite
   官方 quick-start 依赖有点多，安装比较久需要耐心
   https://cn-evite.netlify.app/
7. ant-design react 项目组织
8. electron life cycle
   https://vastiny.com/post/tech/electron-lifecycle
