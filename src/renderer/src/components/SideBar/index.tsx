
import { DragLine } from './DragLine'
import { HeaderList } from './HeaderList'
import { SideBarHeader } from './SideBarHeader'
interface ISideBar {

}
export const SideBar:React.FC<ISideBar> = () => {
  return (
    <div className="side-bar">
      <SideBarHeader/>
      <DragLine />
      <HeaderList/>
    </div>
  )
}
