export function LoadingState() {
  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-100 border-t-orange-600" />

      <h2 className="mt-5 text-2xl font-bold text-slate-950">
        Finding the best chefs
      </h2>

      <p className="mt-3 text-slate-600">
        AI is reviewing the customer preferences and chef profiles.
      </p>
    </section>
  );
}