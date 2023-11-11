import { useRef, useEffect } from "react"

export const useOutsideClick = (handler, listenPropagation = true) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler()
    }
    document.addEventListener("click", handleClick, listenPropagation)

    return () =>
      document.removeEventListener("click", handleClick, listenPropagation)
  }, [handler, listenPropagation])

  return ref
}
