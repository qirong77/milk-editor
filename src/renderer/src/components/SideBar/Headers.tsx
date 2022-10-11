import { useEffect, useRef } from 'react'
import { HeaderTree, useHeaders } from './hooks/useHeaders'
const triangleDown = `<svg class='triangle-down' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>`
export const Headers = () => {
  const headerListRef = useRef(null)
  const CLASS_NAME = 'header-list'
  const dfs = (tree: HeaderTree, container: HTMLElement | DocumentFragment) => {
    const id = tree.header.getAttribute('id')
    if (!tree.children.length) {
      const li = document.createElement('li')
      li.innerHTML = `<a href=${'#' + id}>${tree.header.innerText}</a>`
      li.setAttribute('style', `--i: ${Number(tree.tagName[1]) - 0.5}`)
      container.appendChild(li)
    } else {
      const ul = document.createElement('ul')
      ul.innerHTML = triangleDown + `<a href=${'#' + id}>${tree.header.innerText}</a>`
      ul.setAttribute('style', `--i: ${tree.tagName[1]}`)
      tree.children.forEach((child) => {
        dfs(child, ul)
      })
      ul.addEventListener('click', () => {
        ul.classList.toggle(CLASS_NAME)
      })
      container.appendChild(ul)
    }
    return container
  }
  const updateHeaders = (container: HTMLElement | null) => {
    if (!container) return
    container!.innerHTML = ''
    const headers =
      document.querySelector('.milkdown .editor')?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
    const Headers = Array.from(headers)
    const trees = useHeaders(Headers as HTMLElement[])
    trees.forEach((tree) => {
      const fragment = document.createDocumentFragment()
      const headerList = dfs(tree, fragment)
      container.appendChild(headerList)
    })
  }
  useEffect(() => {
    updateHeaders(headerListRef.current)
  }, [])
  return (
    <ul className={CLASS_NAME} ref={headerListRef}>
      <button onClick={() => updateHeaders(headerListRef.current)}>update</button>
    </ul>
  )
}
