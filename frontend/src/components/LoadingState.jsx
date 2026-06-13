function LoadingState({ title = "Đang chuẩn bị thông tin", cards = 3 }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20">
      <div className="camp-skeleton h-5 w-48 rounded-full"></div>
      <div className="camp-skeleton mt-4 h-10 w-full max-w-xl rounded-2xl"></div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {Array.from({ length: cards }).map((_, index) => (
          <div key={index} className="rounded-[1.7rem] border border-white/10 bg-stone-950/70 p-5">
            <div className="camp-skeleton h-36 rounded-2xl"></div>
            <div className="camp-skeleton mt-5 h-5 w-2/3 rounded-full"></div>
            <div className="camp-skeleton mt-3 h-4 w-full rounded-full"></div>
            <div className="camp-skeleton mt-3 h-4 w-4/5 rounded-full"></div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm font-bold text-stone-500">{title}...</p>
    </div>
  )
}

export default LoadingState
