import { DragLine } from './DragLine'
import { HeaderList } from './HeaderList'

export const SideBar = () => {
  return (
    <div className="side-bar">
      <header>
        <span>文件</span>
      </header>
      <DragLine />
      <HeaderList />
    </div>
  )
}
