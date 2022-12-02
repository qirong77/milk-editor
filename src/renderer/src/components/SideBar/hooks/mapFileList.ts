import {
  DELETE_FILE_R,
  DRAG_FILE,
  POP_DIR_MENU,
  POP_FILE_ITEM_MENU,
  RENAME_FILE
} from '../../../../../common/eventType'
import { FileTree } from '../../../../../common/interface'
import { openFile } from '../../../common/openFile'
import { resolve, dirname } from 'path-browserify'
export let activeNode: HTMLElement
let isFocusOnFile = false
let dragPath = ''
const ACTIVE_CLASS = 'file-item-active'
export const SHOW_INPUT = 'show-input'
const dirIcon = `<div>
<svg class='triangle-down' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
<svg class='folder-open' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2-open" viewBox="0 0 16 16">
  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zM2 6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5a.5.5 0 0 0-.5.5V6zm-.367 1a.5.5 0 0 0-.496.562l.64 5.124A1.5 1.5 0 0 0 3.266 14h9.468a1.5 1.5 0 0 0 1.489-1.314l.64-5.124A.5.5 0 0 0 14.367 7H1.633z"/>
</svg>
<svg class='folder-close' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder2" viewBox="0 0 16 16">
  <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 12.5v-9zM2.5 3a.5.5 0 0 0-.5.5V6h12v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.71-.629-2.174-1.154C6.374 3.334 5.82 3 5.264 3H2.5zM14 7H2v5.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7z"/>
</svg>
</div>`
// 选择一个文件
export const setActiveFile = (path: string, isDir = false) => {
  const activedNodes = document.getElementsByClassName(ACTIVE_CLASS)
  Array.from(activedNodes).forEach((node) => {
    node.classList.remove(ACTIVE_CLASS)
  })
  let target = document.getElementById(path)
  if (target && !isDir) {
    target.classList.add(ACTIVE_CLASS)
    activeNode = target
    while (target?.parentElement instanceof HTMLUListElement) {
      target.parentElement.classList.remove('close')
      target = target.parentElement
    }
  }
}
const createInput = (fileName: string, li: HTMLLIElement, isDir: boolean) => {
  const input = document.createElement('input')
  const handleChange = () => {
    const newName = input.value
    const oldPath = li.getAttribute('id') || ''
    const newPath = resolve(dirname(oldPath), newName)
    newName && window.api.sendToMain(RENAME_FILE, oldPath, newPath)
    li.innerHTML = (isDir ? dirIcon : '') + `<span>${newName}</span>`
    li.appendChild(createInput(newName, li, isDir))
    li.setAttribute('id', newPath)
    li.classList.remove(SHOW_INPUT)
  }
  input.value = fileName
  input.onblur = () => {
    handleChange()
  }
  input.onfocus = () => {
    li.classList.add(SHOW_INPUT)
  }
  input.onkeydown = (e) => {
    e.stopPropagation()
    if (e.code === 'Enter') {
      handleChange()
    }
  }
  // 防止改名字的时候打开文件
  input.onclick = (e) => {
    e.stopPropagation()
  }
  return input
}
const createLi = (fileName: string, path: string, level: number, isDir: boolean) => {
  const li = document.createElement('li')
  li.setAttribute('id', path)
  li.setAttribute('level', level.toString())
  li.setAttribute('draggable', 'true')
  li.setAttribute('style', `--i: ${level}`)
  // 注意执行顺序
  li.innerHTML = (isDir ? dirIcon : '') + `<span>${fileName}</span>`
  if (isDir) {
    li.classList.add('dir')
  } else {
    li.classList.add('file-item')
  }
  // 不显示根文件夹
  if (level === 0) {
    li.style.display = 'none'
  }
  li.appendChild(createInput(fileName, li, isDir))
  li.addEventListener('contextmenu', (e) => {
    console.log('contextmenu')
    e.stopPropagation()
    setActiveFile(path)
    if (!isDir) window.api.sendToMain(POP_FILE_ITEM_MENU, li.getAttribute('id'))
    else {
      window.api.sendToMain(POP_DIR_MENU, li.getAttribute('id'))
    }
  })
  li.addEventListener('click', (e) => {
    console.log('click')
    e.stopPropagation()
    isFocusOnFile = true
    activeNode?.classList.remove(ACTIVE_CLASS)
    activeNode = li
    activeNode.classList.add(ACTIVE_CLASS)
    // 不知道为什么这里使用setActive不行
    // setActiveFile(path)
    if (!isDir) {
      const newPath = li.getAttribute('id')
      newPath && openFile(newPath)
    }
    if (isDir) {
      const ul = li.parentElement
      ul?.classList.toggle('close')
    }
  })
  li.ondragstart = () => {
    dragPath = path
  }
  return li
}
document.addEventListener('keydown', (e) => {
  if (e.code === 'Enter' && isFocusOnFile && activeNode) {
    activeNode.classList.add(SHOW_INPUT)
    activeNode.querySelector('input')?.focus()
  }
  if (e.code === 'Backspace' && e.metaKey && isFocusOnFile && activeNode) {
    window.api.sendToMain(DELETE_FILE_R, activeNode.getAttribute('id'))
  }
})
document.addEventListener('click', (_e) => {
  // li里面又阻止冒泡了，所以这里监听不到
  isFocusOnFile = false
})
export const mapFileList = ({ fileName, level, path, isDir, children }: FileTree) => {
  const li = createLi(fileName, path, level, isDir)
  if (!isDir) return li
  const ul = document.createElement('ul')
  ul.ondragover = (e) => {
    console.log('📕','dragover')
    ul.classList.add('drag-over')
    e.preventDefault()
    e.stopPropagation()
  }
  ul.ondrop = () => {
    // window.api.sendToMain(DRAG_FILE, dragPath, path)
    console.log('📕',dragPath,path)
    ul.classList.remove('drag-over')
    
  }
  ul.ondragleave = () => {
    ul.classList.remove('drag-over')
    console.log('📕','dragleave')
  }
  if (level > 0) ul.classList.add('close')
  ul.appendChild(li)
  children.forEach((file) => {
    ul.appendChild(mapFileList(file))
  })
  return ul
}
