import { formatCurrency } from "@/lib/match-chefs";
import type { MatchedChef } from "@/types/chef";

type ChefCardProps = {
  chef: MatchedChef;
};

export function ChefCard({ chef }: ChefCardProps) {
  return (
    <article className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-950">{chef.name}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {chef.experienceYears} years experience
          </p>
        </div>

        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-700">
          {chef.matchScore}% Match
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">
        {chef.matchReason}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-slate-500">Cuisine</p>
          <p className="mt-1 font-semibold text-slate-900">
            {chef.cuisineSpecialties.join(", ")}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-slate-500">Rating</p>
          <p className="mt-1 font-semibold text-slate-900">⭐ {chef.rating}</p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-slate-500">Price</p>
          <p className="mt-1 font-semibold text-slate-900">
            {formatCurrency(chef.pricePerSession)}
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-3">
          <p className="text-slate-500">Capacity</p>
          <p className="mt-1 font-semibold text-slate-900">
            Up to {chef.maxGuests} guests
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {chef.specialties.map((specialty) => (
          <span
            key={specialty}
            className="rounded-full border border-orange-100 px-3 py-1 text-xs font-medium text-slate-600"
          >
            {specialty}
          </span>
        ))}
      </div>
    </article>
  );
}