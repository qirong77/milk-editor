import { DragLine } from "./DragLine"
import { Headers } from "./Headers"

export const SideBar = () => {
  return (
    <div className="side-bar">
      <DragLine/>
      <div>text</div>
      <Headers/>
    </div>
  )
 }