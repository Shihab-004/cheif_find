export function LoadingState() {
  return (
    <section className="relative min-h-115 overflow-hidden rounded-4xl border border-white/80 bg-white/90 p-8 text-center shadow-[0_24px_70px_rgba(15,23,42,0.10)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-14 h-44 w-44 -translate-x-1/2 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute bottom-8 right-10 h-32 w-32 rounded-full bg-amber-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-95 max-w-md flex-col items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-orange-100 bg-orange-50/70 shadow-inner" />

          <div className="absolute h-28 w-28 animate-spin rounded-full border-4 border-transparent border-t-orange-500 border-r-amber-400" />

          <div className="absolute h-20 w-20 animate-[reverseSpin_2.4s_linear_infinite] rounded-full border-4 border-transparent border-b-orange-300 border-l-red-300" />

          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-orange-500 via-red-500 to-amber-500 text-4xl shadow-xl shadow-orange-500/25">
            👨‍🍳
          </div>

          <span className="absolute -right-1 top-4 animate-[floatSteam_1.8s_ease-in-out_infinite] text-xl">
            ♨️
          </span>
          <span className="absolute left-1 top-7 animate-[floatSteam_2.2s_ease-in-out_infinite] text-sm">
            ✨
          </span>
          <span className="absolute bottom-5 right-5 animate-[floatSteam_2.6s_ease-in-out_infinite] text-sm">
            🍽️
          </span>
        </div>

        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-700 shadow-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-orange-500" />
          AI Kitchen Active
        </div>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
          Finding the best chefs
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
          ChefFind AI is tasting preferences, checking budgets, and ranking the
          most relevant chef profiles.
        </p>

        <div className="mt-7 flex w-full max-w-xs flex-col gap-3">
          <div className="h-2 overflow-hidden rounded-full bg-orange-100">
            <div className="h-full w-2/3 animate-[loadingBar_1.6s_ease-in-out_infinite] rounded-full bg-linear-to-r from-orange-500 via-red-500 to-amber-400" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-500">
            <span className="rounded-full bg-orange-50 px-2 py-1">
              Cuisine
            </span>
            <span className="rounded-full bg-orange-50 px-2 py-1">Budget</span>
            <span className="rounded-full bg-orange-50 px-2 py-1">Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}