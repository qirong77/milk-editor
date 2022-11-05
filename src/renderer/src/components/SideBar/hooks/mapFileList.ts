import { OPEN_FILE, RENAME_FILE } from '../../../../../common/eventType'
import { FileTree } from '../../../../../common/interface'

const triangleDown = `<div>
<svg class='triangle-down' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
<path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
</div>`
const newFileItemLi = (fileName: string, level: number, path: string) => {
  const li = document.createElement('li')
  if (level === 0) li.style.display = 'none'
  li.setAttribute('style', `--i: ${level}`)
  li.innerHTML = `<span>${fileName}</span>`
  li.classList.add('file-item')
  const input = document.createElement('input')
  input.value = fileName
  const handleChange = () => {
    input.value && window.api.sendToMain(RENAME_FILE, path, input.value)
  }
  li.addEventListener('contextmenu', () => {
    li.classList.toggle('show-input')
  })
  li.addEventListener('click', (e) => {
    e.stopPropagation()
    window.api.sendToMain(OPEN_FILE, path)
    input.focus()
    input.onblur = () => {
      handleChange()
      li.classList.toggle('show-input')
    }
    input.onkeydown = (e) => {
      if (e.code === 'Enter') {
        handleChange()
      }
    }
  })
  return li
}
export const mapFileList = (fileTree: FileTree) => {
  if (!fileTree.isDir) return newFileItemLi(fileTree.fileName, fileTree.level, fileTree.path)
  const li = document.createElement('li')

  li.setAttribute('style', `--i: ${fileTree.level}`)
  li.innerHTML = `<span>${fileTree.fileName}</span>`
  li.innerHTML = triangleDown + fileTree.fileName
  li.classList.add('dir')
    // 不显示根文件夹
    if (fileTree.level === 0) {
      li.style.display = 'none'
    }
  const ul = document.createElement('ul')
  ul.addEventListener('click', (e) => {
    e.stopPropagation()
    ul.classList.toggle('close')
  })
  ul.appendChild(li)
  fileTree.children.forEach((file) => {
    ul.appendChild(mapFileList(file))
  })
  return ul
}
