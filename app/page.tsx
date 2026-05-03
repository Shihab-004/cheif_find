export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10 text-slate-950">
      <section className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            ChefFind
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            AI Chef Matching
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Help customers find the most relevant home chefs based on cuisine,
            meal type, guest count, budget, and special requests.
          </p>
        </div>
      </section>
    </main>
  );
}