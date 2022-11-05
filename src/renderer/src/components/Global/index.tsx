import { useEffect } from "react"

export const GlobalComponents = () => {
    const handleKeydown = (e:KeyboardEvent) => {

    }
    useEffect(()=>{
        document.addEventListener('keydown',handleKeydown)
    },[])
    return <>
    
    </>
}