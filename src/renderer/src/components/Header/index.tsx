import { Controlers } from "./Controlers"

interface IHeader {
    title:string
}
export const Header:React.FC<IHeader> = ({ title }) => {
  return (
    <header className="header">
        <Controlers/>
      <div>{title}</div>
      <div></div>
    </header>
  )
}
