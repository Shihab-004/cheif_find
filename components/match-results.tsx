import type { MatchedChef, MatchResponseSource } from "@/types/chef";
import { ChefCard } from "./chef-card";
import { LoadingState } from "./loading-state";

type MatchResultsProps = {
  matches: MatchedChef[];
  hasSubmitted: boolean;
  isLoading: boolean;
  source?: MatchResponseSource;
  message?: string;
};

export function MatchResults({
  matches,
  hasSubmitted,
  isLoading,
  source,
  message,
}: MatchResultsProps) {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasSubmitted) {
    return (
      <section className="flex min-h-105 items-center justify-center rounded-3xl border border-dashed border-orange-200 bg-white/70 p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
            👨‍🍳
          </div>

          <h2 className="text-2xl font-bold text-slate-950">
            Ready to find your chef?
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Fill out the customer preferences and submit the form to see the
            best chef recommendations.
          </p>
        </div>
      </section>
    );
  }

  if (!matches.length) {
    return (
      <section className="flex min-h-105 items-center justify-center rounded-3xl border border-orange-100 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-2xl">
            🔍
          </div>

          <h2 className="text-2xl font-bold text-slate-950">
            No matches found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Try changing the cuisine, guest count, budget, or special request.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="rounded-3xl border border-orange-100 bg-white px-5 py-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">
              Top Matches
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              Recommended chefs
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Showing the top {matches.length} best matches based on customer
              preferences.
            </p>
          </div>

          {source && (
            <span className="w-fit rounded-full border border-orange-100 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-orange-700">
              {source === "ai" ? "AI matched" : "Fallback matched"}
            </span>
          )}
        </div>

        {message && (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {message}
          </div>
        )}
      </div>

      <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {matches.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </section>
  );
}
