import { OPEN_FILE, RENAME_FILE } from '../../../../../common/eventType'
import { FileTree } from '../../../../../common/interface'

const triangleDown = `<div>
<svg class='triangle-down' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
</div>`
const createInput = (fileName: string, li: HTMLLIElement, path: string, isDir: boolean) => {
  const handleChange = () => {
    const newName = input.value
    newName && window.api.sendToMain(RENAME_FILE, path, newName)
    if (isDir) {
      li.innerHTML = triangleDown + `<span>${input.value}</span>`
    } else li.innerHTML = `<span>${input.value}</span>`
  }
  const input = document.createElement('input')
  input.value = fileName

  input.onblur = () => {
    handleChange()
    li.classList.toggle('show-input')
  }
  input.onkeydown = (e) => {
    if (e.code === 'Enter') {
      handleChange()
    }
  }
  return input
}
const createLi = (fileName: string, path: string, level: number, isDir: boolean) => {
  const li = document.createElement('li')
  li.setAttribute('style', `--i: ${level}`)
  li.innerHTML = `<span>${fileName}</span>`
  if (isDir) {
    li.classList.add('dir')
  } else {
    li.classList.add('file-item')
  }
  // 不显示根文件夹
  if (level === 0) {
    li.style.display = 'none'
  }
  li.appendChild(createInput(fileName, li, path, isDir))
  li.addEventListener('contextmenu', () => {
    li.classList.toggle('show-input')
  })
  !isDir &&
    li.addEventListener('click', (e) => {
      e.stopPropagation()
      window.api.sendToMain(OPEN_FILE, path)
    })
  return li
}
export const mapFileList = ({ fileName, level, path, isDir, children }: FileTree) => {
  const li = createLi(fileName, path, level, isDir)
  if (!isDir) return li

  const ul = document.createElement('ul')
  ul.addEventListener('click', (e) => {
    e.stopPropagation()
    ul.classList.toggle('close')
  })
  ul.appendChild(li)
  children.forEach((file) => {
    ul.appendChild(mapFileList(file))
  })
  return ul
}
