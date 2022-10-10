import React, { useEffect, useState } from 'react'
import { triangleDown } from '../constant'
import { HeaderTree, useHeaders } from '../hooks/useHeaders'

interface SideBar {
  headers: HTMLElement[]
}
export const SideBar: React.FC<SideBar> = ({ headers }) => {
  const updateHeaders = () => {
    const headers =
      document
        .querySelector('.milkdown .editor')
        ?.querySelectorAll('h1,h2,h3,h4,h5,h6') || []
    const Headers = Array.from(headers)
    const trees = useHeaders(Headers as HTMLElement[])
    const dfs = (
      tree: HeaderTree,
      container: HTMLElement | DocumentFragment
    ) => {
      const id = tree.header.getAttribute('id')
      if (!tree.children.length) {
        const li = document.createElement('li')
        li.innerHTML = `<a href=${'#' + id}>${tree.header.innerText}</a>`
        li.setAttribute('style', `--i: ${Number(tree.tagName[1]) - 0.5}`)
        container.appendChild(li)
      } else {
        const ul = document.createElement('ul')
        ul.innerHTML =
          triangleDown + `<a href=${'#' + id}>${tree.header.innerText}</a>`
        ul.setAttribute('style', `--i: ${tree.tagName[1]}`)
        tree.children.forEach(child => {
          dfs(child, ul)
        })
        container.appendChild(ul)
      }
      return container
    }
    const headerLists = document.createDocumentFragment()
    trees.forEach(tree => {
      const fragment = document.createDocumentFragment()
      const headerList = dfs(tree, fragment)
      headerLists.appendChild(headerList)
    })
    const sideBarContainer = document.querySelector('.side-bar-container')
    sideBarContainer!.innerHTML = ''
    sideBarContainer?.appendChild(headerLists)
  }
  useEffect(() => {
    updateHeaders()
  }, [])
  // 按下鼠标
  const dragLineMove = (e: React.MouseEvent) => {
    // clietX就是距离浏览器视口的位置
    const clientX = e.clientX
    const dragLine = document.querySelector('.drag-line') as HTMLElement
    document.onmousemove = e => {
      const newClientX = e.clientX
      const moveDistance = newClientX - clientX
      const nextPosition = clientX + moveDistance
      dragLine.style.left = nextPosition + 'px'
      return false
    }
    // 释放鼠标的时候解除事件绑定
    document.onmouseup = e => {
      const newPosition = e.clientX
      console.log(newPosition)
      if (newPosition < 600 && newPosition > 100) {
        dragLine.style.left = newPosition + 'px'
        const sideBar = document.querySelector('.side-bar') as HTMLElement
        sideBar.style.width = newPosition + 'px'
        // 如果太宽了就返回原来的位置
      } else {
        dragLine.style.left = clientX + 'px'
      }

      document.onmousemove = null
      document.onmouseup = null
      return false
    }
  }

  return (
    <div className="side-bar">
      <div className="drag-line" onMouseDown={dragLineMove}></div>
      <header>
        {/* <span>大纲</span> */}
        <span onClick={updateHeaders}>overview</span>
      </header>
      <ul className="side-bar-container"></ul>
    </div>
  )
}
