export const useToggleSideBar = () =>{
    // 临时解决方案，后面看看有没有什么更好的办法
    const fileList = document.querySelector('.file-list') as HTMLElement
    fileList.classList.toggle('file-list-close')
    const headerList = document.querySelector('.header-list') as HTMLElement
    headerList.classList.toggle('header-list-close')
}