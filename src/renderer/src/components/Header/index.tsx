import React, { useEffect, useState } from 'react'
import { Controlers } from './Controlers'
interface IHeader {
  title:string
}
export const Header:React.FC<IHeader> = ({title}) => {
  useEffect(() => {
    // window.api.onOpenFile((e, { path }) => {
    //   const MARKDOWN_FILE = /([^\/]+)\.md/i
    //   const regexArray = path.match(MARKDOWN_FILE)
    //   if(regexArray) {
    //     setTitle(regexArray[0])
    //   }
    // })
  }, [])
  return (
    <header className="header">
      <Controlers />
      <div>{title}</div>
      <div></div>
    </header>
  )
}
