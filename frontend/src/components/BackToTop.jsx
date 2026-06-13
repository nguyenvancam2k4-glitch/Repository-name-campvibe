import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

function BackToTop() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 600)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setVisible(false)
  }, [location.pathname])

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="camp-back-to-top fixed bottom-6 right-6 left-auto z-[140] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-emerald-400 text-xl font-black text-stone-950 shadow-2xl shadow-emerald-400/20 transition hover:-translate-y-1 hover:bg-emerald-300"
      aria-label="Lên đầu trang"
    >
      ↑
    </button>
  )
}

export default BackToTop
