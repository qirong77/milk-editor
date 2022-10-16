export const useDebounce = (fn: Function, delay: number) => {
  let timer
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('debouce timer done')
      fn()
    }, delay)
  }
}
