import { useState } from 'react'
import { MilkdownEditor } from './components/Editor'
import { SideBar } from './components/SideBar'

export const App = () => {
  const [headers, setHeaders] = useState([{} as HTMLElement])
  return (
    <div className="container">
      <SideBar headers={headers} />
      <MilkdownEditor onHeadersChange={setHeaders} />
    </div>
  )
}
