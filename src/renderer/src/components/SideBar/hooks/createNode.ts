import { NEW_DIR_NAME, NEW_FILE_NAME } from '../../../../../main/electron/config/constant'
import { focusNode } from './focusNode'
import { mapFileList } from './mapFileList'

export const createNode = (path: string, newPath: string, isDir: boolean) => {
  const target = document.getElementById(path)
  target?.parentElement?.classList.remove('close')
  const level = target?.getAttribute('level')
  const node = mapFileList({
    fileName: isDir ? NEW_DIR_NAME : NEW_FILE_NAME,
    level: Number(level) + 1,
    isDir,
    children: [],
    path: newPath,
    showInput: false,
    active: false,
    parentNode: null
  })
  target?.parentElement?.appendChild(node)
  focusNode(newPath)
}
