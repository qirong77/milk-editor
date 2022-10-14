import { useEffect, useState } from 'react'
import { Controlers } from './Controlers'

export const Header = () => {
  const [title, setTitle] = useState('title')
  useEffect(() => {
    window.api.onUpdateEditor((e, { path }) => {
      const MARKDOWN_FILE = /([^\/]+)\.md/i
      const regexArray = path.match(MARKDOWN_FILE)
      if(regexArray) {
        setTitle(regexArray[0])
      }
    })
  }, [])
  return (
    <header className="header">
      <Controlers />
      <div>{title}</div>
      <div></div>
    </header>
  )
}
