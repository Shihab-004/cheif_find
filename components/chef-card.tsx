"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/match-chefs";
import type { MatchedChef } from "@/types/chef";

type ChefCardProps = {
  chef: MatchedChef;
};

function getShortReason(reason: string) {
  return reason
    .replace(/^Perfect match for\s+/i, "")
    .replace(/^Great for\s+/i, "")
    .replace(/^Offers\s+/i, "")
    .replace(/^Provides\s+/i, "")
    .replace(/^Best fit because\s+/i, "")
    .trim();
}

export function ChefCard({ chef }: ChefCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shortReason = getShortReason(chef.matchReason);

  return (
    <>
      <article className="group flex h-full min-h-120 flex-col overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
        <div className="relative h-48 shrink-0 overflow-hidden">
          <img
            src={chef.image}
            alt={chef.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-transparent" />

          <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-xs font-bold text-orange-700 shadow-sm">
            {chef.matchScore}% Match
          </span>

          <div className="absolute bottom-5 left-5 right-5">
            <h3 className="line-clamp-2 text-xl font-bold leading-tight text-white">
              {chef.name}
            </h3>

            <p className="mt-1 text-sm font-medium text-orange-50">
              {chef.experienceYears} years experience
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="h-18">
            <div className="flex flex-wrap items-start gap-2">
              {chef.cuisineSpecialties.slice(0, 2).map((cuisine) => (
                <span
                  key={cuisine}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700"
                >
                  {cuisine}
                </span>
              ))}

              <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700">
                ⭐ {chef.rating}
              </span>
            </div>
          </div>

          <div className="h-18">
            <p className="line-clamp-3 text-sm leading-6 text-slate-600">
              {shortReason}
            </p>
          </div>

          <div className="mt-4 border-t border-orange-100 pt-4">
            <div className="rounded-2xl bg-slate-50 px-4 py-3">
              <p className="truncate text-sm font-semibold text-slate-800">
                {formatCurrency(chef.pricePerSession)} / session
              </p>

              <p className="mt-1 text-xs font-medium text-slate-500">
                Up to {chef.maxGuests} guests
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-auto w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-100"
          >
            View Details
          </button>
        </div>
      </article>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-md transition hover:bg-orange-50 hover:text-orange-700"
              aria-label="Close chef details"
            >
              ✕
            </button>

            <div className="relative h-64 overflow-hidden rounded-t-3xl">
              <img
                src={chef.image}
                alt={chef.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-16">
                <span className="mb-3 inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  {chef.matchScore}% AI Match
                </span>

                <h2 className="text-3xl font-bold text-white">{chef.name}</h2>

                <p className="mt-2 text-sm font-medium text-orange-50">
                  {chef.experienceYears} years experience • ⭐ {chef.rating}
                </p>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Match Reason
                </h3>

                <p className="mt-3 rounded-2xl bg-orange-50 p-4 text-sm leading-6 text-slate-700">
                  {chef.matchReason}
                </p>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  About Chef
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {chef.bio}
                </p>

                <h3 className="mt-6 text-lg font-bold text-slate-950">
                  Specialties
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {chef.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="rounded-full border border-orange-100 bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-3xl border border-orange-100 bg-orange-50 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Chef Details
                </h3>

                <dl className="mt-5 space-y-4 text-sm">
                  <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-3">
                    <dt className="font-semibold text-slate-500">Cuisine</dt>
                    <dd className="text-right font-bold text-slate-950">
                      {chef.cuisineSpecialties.join(", ")}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-3">
                    <dt className="font-semibold text-slate-500">Meal Type</dt>
                    <dd className="text-right font-bold text-slate-950">
                      {chef.mealTypes.join(", ")}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-3">
                    <dt className="font-semibold text-slate-500">Price</dt>
                    <dd className="text-right font-bold text-slate-950">
                      {formatCurrency(chef.pricePerSession)}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-3">
                    <dt className="font-semibold text-slate-500">Capacity</dt>
                    <dd className="text-right font-bold text-slate-950">
                      Up to {chef.maxGuests} guests
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-3">
                    <dt className="font-semibold text-slate-500">Rating</dt>
                    <dd className="text-right font-bold text-slate-950">
                      ⭐ {chef.rating}
                    </dd>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <dt className="font-semibold text-slate-500">
                      Availability
                    </dt>
                    <dd className="text-right font-bold text-slate-950">
                      On request
                    </dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </div>
      )}
    </>
  );
}