import { useState } from 'react'
import { DragLine } from './components/DragLine'
import { HeaderList } from './components/HeaderList'
import { SideBarHeader } from './components/SideBarHeader'
import { FileList } from './components/FileList'
import { IFileList } from 'src/preload/index.d'
import { SideBarBottom } from './components/SideBarBottom'
interface ISideBar {
  fileList: IFileList
}
export const SideBar: React.FC<ISideBar> = ({ fileList }) => {
  const [showFileList, setShowFileList] = useState(false)
  return (
    <div className="side-bar">
      <SideBarHeader setShowFileList={setShowFileList} show={showFileList} title={'文件'} />
      <DragLine />
      {!showFileList && <FileList fileList={fileList} setShowFileList={setShowFileList} show={showFileList}/>}
      {showFileList && <HeaderList />}
      <SideBarBottom show={showFileList}/>
    </div>
  )
}
