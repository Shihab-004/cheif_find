import { CustomerForm } from "@/components/customer-form";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fff7ed] text-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-15%] h-105 w-105 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute right-[-8%] top-[10%] h-95 w-95 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[25%] h-90 w-90 rounded-full bg-rose-200/30 blur-3xl" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(251,146,60,0.18)_1px,transparent_0)] bg-size-[28px_28px]" />

      <section className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-white/80 bg-white/80 px-4 py-2.5 shadow-[0_14px_40px_rgba(234,88,12,0.14)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[0_18px_50px_rgba(234,88,12,0.18)]">
  <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-orange-500 via-red-500 to-amber-500 shadow-md shadow-orange-500/25">
    <span className="absolute inset-0 rounded-full bg-white/20" />
    <span className="relative text-xs font-black text-white">CF</span>
  </span>

  <span className="flex flex-col leading-none">
    <span className="text-sm font-black tracking-tight text-slate-950">
      ChefFind
    </span>

  </span>
</div>

            <h1 className="max-w-3xl text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              AI Chef
              <span className="block bg-linear-to-r from-orange-600 via-red-500 to-amber-500 bg-clip-text text-transparent pb-2.5">
                Matching
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Match customers with the most relevant home chefs based on
              cuisine, meal type, guest count, budget, and special requests.
            </p>
          </div>

          <div className="hidden rounded-4xl border border-orange-100 bg-white/65 p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur lg:block">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-3xl bg-orange-600 p-5 text-white">
                <p className="text-3xl font-black">AI</p>
                <p className="mt-2 text-xs font-semibold text-orange-50">
                  Smart chef matching
                </p>
              </div>

              <div className="rounded-3xl bg-white p-5 shadow-sm">
                <p className="text-3xl font-black text-slate-950">Top 3</p>
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Best recommendations
                </p>
              </div>

              <div className="rounded-3xl bg-slate-950 p-5 text-white">
                <p className="text-3xl font-black">24/7</p>
                <p className="mt-2 text-xs font-semibold text-slate-300">
                  Reliable fallback
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="rounded-[2.5rem] border border-white/70 bg-white/35 p-3 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl">
          <CustomerForm />
        </div>
      </section>
    </main>
  );
}