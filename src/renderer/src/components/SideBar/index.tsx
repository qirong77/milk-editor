import { useState } from 'react'
import { DragLine } from './DragLine'
import { HeaderList } from './HeaderList'
import { SideBarHeader } from './SideBarHeader'
import { FileList } from './FileList'
import { IFileList } from 'src/preload/index.d'
interface ISideBar {
  fileList: IFileList
}
export const SideBar: React.FC<ISideBar> = ({ fileList }) => {
  const [showFileList, setShowFileList] = useState(true)
  return (
    <div className="side-bar">
      <SideBarHeader setShowFileList={setShowFileList} show={showFileList} title={'文件'} />
      <DragLine />
      {!showFileList && <FileList fileList={fileList} />}
      {showFileList && <HeaderList />}
    </div>
  )
}
