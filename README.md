# milk-editor

An Electron application with React and TypeScript

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
### 待完成功能

1. slash 斜杠命令
2. 侧边栏显示隐藏切换

### 遇到的坑

1. tsc 无法输出到指定路径（将和 electron 相关的都放到一个文件夹
2. 一键启动 vite 和 electron
   "electron": "tsc ./main.ts && vite & electron .",会有问题
3. 何时渲染菜单，无法监听每一次的输入来判断是否渲染菜单，如果输入较快，性能消耗太大
### 学习笔记
1. 导入.d.ts文件的类型时，不能输入.d.ts的后缀
### 参考学习文档

1. electron
2. milkdown
3. 别人的学习成果
https://github.com/CatsAndMice/milkdown
4. 官方 milkdown-example
5. blog:electron + vite
   https://dev.to/brojenuel/vite-vue-3-electron-5h4o
6. npm:electron-vite
   官方 quick-start 依赖有点多，安装比较久需要耐心
   https://cn-evite.netlify.app/
7. ant-design 大型react项目组织
- 每个组件都是一个单独的文件夹
里面固定有一个index作为组合输出
其他的辅助组件都是在文件夹根目录里面
- 里面有三个文件夹
hooks，styles（也有index作为组合输出），text，readme，demo，text
