import { MenuSvg, SearchSvg } from '../../../assets/svg'

export const SideBarHeader = ({ title, clickMenu }) => {
  return (
    <header>
      <MenuSvg onClick={clickMenu} />
      <span>{title}</span>
      <SearchSvg onClick={() => {}} />
    </header>
  )
}
