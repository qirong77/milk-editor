export const DragLine = () => {
  const dragLineMove = (e: React.MouseEvent) => {
    // clietX就是距离浏览器视口的位置
    const clientX = e.clientX
    const dragLine = document.querySelector('.drag-line') as HTMLElement
    document.onmousemove = (e) => {
      const newClientX = e.clientX
      const moveDistance = newClientX - clientX
      const nextPosition = clientX + moveDistance
      dragLine.style.left = nextPosition + 'px'
      return false
    }
    
    // 释放鼠标的时候解除事件绑定
    document.onmouseup = (e) => {
      const newPosition = e.clientX
      // 如果太宽了就返回原来的位置
      // 小于等于100是侧边栏的最少宽度
      if (newPosition <= 100 || newPosition > 600) {
        dragLine.style.left = clientX + 'px'
      } else {
        dragLine.style.left = newPosition + 'px'
        const sideBar = document.querySelector('.side-bar') as HTMLElement
        sideBar.style.width = newPosition + 'px'
      }

      document.onmousemove = null
      document.onmouseup = null
      return false
    }
  }
  return <div className="drag-line" onMouseDown={dragLineMove}></div>
}
