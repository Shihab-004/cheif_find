import type { MatchedChef } from "@/types/chef";
import { ChefCard } from "./chef-card";

type MatchResultsProps = {
  matches: MatchedChef[];
  hasSubmitted: boolean;
};

export function MatchResults({ matches, hasSubmitted }: MatchResultsProps) {
  if (!hasSubmitted) {
    return (
      <section className="rounded-3xl border border-dashed border-orange-200 bg-white/70 p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-950">
          Ready to find your chef?
        </h2>
        <p className="mt-3 text-slate-600">
          Fill out the customer preferences and submit the form to see the top 3
          chef matches.
        </p>
      </section>
    );
  }

  if (!matches.length) {
    return (
      <section className="rounded-3xl border border-orange-100 bg-white p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-950">No matches found</h2>
        <p className="mt-3 text-slate-600">
          Try changing the cuisine, guest count, or budget.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Top Matches
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">
          Recommended chefs
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {matches.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </section>
  );
}