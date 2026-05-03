import { CustomerForm } from "@/components/customer-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10 text-slate-950">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-600">
            ChefFind
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            AI Chef Matching
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Match customers with the most relevant home chefs based on cuisine,
            meal type, guest count, budget, and special requests.
          </p>
        </div>

        <CustomerForm />
      </section>
    </main>
  );
}