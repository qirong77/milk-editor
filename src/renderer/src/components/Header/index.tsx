import React from 'react'
import { Controlers } from './Controlers'
interface IHeader {
  opendFilePath: string
}
export const Header: React.FC<IHeader> = ({ opendFilePath }) => {
  const setTitle = (filePath: string) => {
    const MARKDOWN_FILE = /([^\/]+)\.md/i
    const regexArray = filePath.match(MARKDOWN_FILE)
    if (regexArray) {
      return regexArray[0]
    } else return 'title'
  }
  const title = setTitle(opendFilePath)
  return (
    <header className="header">
      <Controlers />
      <div>{title}</div>
      <div></div>
    </header>
  )
}
