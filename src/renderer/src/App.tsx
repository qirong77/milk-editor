
import { MilkdownEditor } from './components/Editor'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'

export const App = () => {

  return (
    <div className="container">
      <Header />
      <main>
        <SideBar />
        <MilkdownEditor></MilkdownEditor>
      </main>

    </div>
  )
}
