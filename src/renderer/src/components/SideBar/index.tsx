import { useEffect, useState } from 'react'
import { DragLine } from './components/DragLine'
import { FileList } from './components/FileList'
import { IFileList } from 'src/preload/index.d'
import { MenuSvg, SearchSvg } from '@renderer/common/svg'
import { useUpdateHeaders } from './hooks/useUpdateHeader'
import { SearchFile } from '../Search/SearchFile'
interface ISideBar {
  fileList: IFileList
}
export const SideBar: React.FC<ISideBar> = ({ fileList }) => {
  console.log('side')
  const [showFileList, setShowFileList] = useState(true)
  const [openSearchFile, setOpenSearchFile] = useState(false)
  useEffect(() => {
    const hanldeHideBar = (e: KeyboardEvent) => {
      if (e.metaKey && e.code === 'KeyB') {
        console.log('command + B')
        useUpdateHeaders()
      }
      if (e.code === 'KeyP' && e.metaKey) {
        console.log('commend + P')
        setOpenSearchFile(!openSearchFile)
      }
    }
    document.addEventListener('keydown', hanldeHideBar)
    return () => document.removeEventListener('keydown', hanldeHideBar)
  }, [])
  const openFile = (filePath: string) => {
    window.api.clickFileList(filePath)
    setShowFileList(false)
  }
  return (
    <div className="side-bar">
      <header>
        <MenuSvg onClick={()=>{setShowFileList(!showFileList)}}/>
        <span>title</span>
        <SearchSvg />
      </header>
      <DragLine />
      {showFileList && <FileList fileList={fileList} openFile={openFile} />}
      {!showFileList && <ul className="header-list" />}
      {openSearchFile && <SearchFile fileList={fileList} openFile={openFile} closeSearchFile={()=>{
        setOpenSearchFile(false)
      }}/>}
    </div>
  )
}
