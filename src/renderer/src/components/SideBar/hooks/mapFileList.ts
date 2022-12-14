import { POP_DIR_MENU, POP_FILE_ITEM_MENU, RENAME_FILE } from '../../../../../common/eventType'
import { FileTree } from '../../../../../common/interface'
import { openFile } from '../../../common/openFile'
import { resolve, dirname } from 'path-browserify'

export const SHOW_INPUT = 'show-input'
const triangleDown = `<div>
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
const createInput = (fileName: string, li: HTMLLIElement, isDir: boolean) => {
  const input = document.createElement('input')
  const handleChange = () => {
    const newName = input.value
    const oldPath = li.getAttribute('id') || ''
    const newPath = resolve(dirname(oldPath), newName)
    newName && window.api.sendToMain(RENAME_FILE, oldPath, newPath)
    if (isDir) {
      li.innerHTML = triangleDown + `<span>${newName}</span>`
    } else li.innerHTML = `<span>${newName}</span>`
    li.appendChild(createInput(newName, li, isDir))
    li.setAttribute('id', newPath)
  }
  input.value = fileName
  input.onblur = () => {
    handleChange()
    console.log('blur')
    li.classList.remove(SHOW_INPUT)
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
  // ????????????????????????????????????
  input.onclick = (e) =>{
    e.stopPropagation()
  }
  return input
}
const createLi = (fileName: string, path: string, level: number, isDir: boolean) => {
  const li = document.createElement('li')
  li.setAttribute('id', path)
  li.setAttribute('level', level.toString())
  li.setAttribute('style', `--i: ${level}`)
  if (isDir) li.innerHTML = triangleDown + `<span>${fileName}</span>`
  else li.innerHTML = `<span>${fileName}</span>`
  if (isDir) {
    li.classList.add('dir')
  } else {
    li.classList.add('file-item')
  }
  // ?????????????????????
  if (level === 0) {
    li.style.display = 'none'
  }
  li.appendChild(createInput(fileName, li, isDir))
  li.addEventListener('contextmenu', (e) => {
    e.stopPropagation()
    if (!isDir) window.api.sendToMain(POP_FILE_ITEM_MENU, li.getAttribute('id'))
    else {
      window.api.sendToMain(POP_DIR_MENU, li.getAttribute('id'))
    }
  })
  li.addEventListener('click', (e) => {
    if (!isDir) {
      const newPath = li.getAttribute('id')
      newPath && openFile(newPath)
    }
    if (isDir) {
      e.stopPropagation()
      const ul = li.parentElement
      ul?.classList.toggle('close')
    }
  })
  return li
}
export const mapFileList = ({ fileName, level, path, isDir, children }: FileTree) => {
  const li = createLi(fileName, path, level, isDir)
  if (!isDir) return li
  const ul = document.createElement('ul')
  ul.appendChild(li)
  children.forEach((file) => {
    ul.appendChild(mapFileList(file))
  })
  return ul
}
