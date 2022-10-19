export const useDebounce = (fn: Function, delay: number, ...args: any[]) => {
  let timer
  return () => {
    if (!timer) fn(...args)
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      console.log('debouce timer done')
      fn(...args)
      timer = null
    }, delay)
  }
}
