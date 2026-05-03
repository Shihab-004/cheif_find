"use client";

import { FormEvent, useState } from "react";
import {
  budgetOptions,
  cuisineOptions,
  guestOptions,
  mealTypeOptions,
} from "@/data/form-options";
import { getTopChefMatches } from "@/lib/match-chefs";
import type {
  CustomerFormValues,
  CustomerPreferences,
  MatchedChef,
} from "@/types/chef";
import { ErrorMessage } from "./error-message";
import { MatchResults } from "./match-results";

const initialForm: CustomerFormValues = {
  cuisine: "",
  mealType: "",
  guests: "",
  budget: "",
  specialRequest: "",
};

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100";

export function CustomerForm() {
  const [form, setForm] = useState<CustomerFormValues>(initialForm);
  const [matches, setMatches] = useState<MatchedChef[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [error, setError] = useState("");

  const isFormValid = Boolean(
    form.cuisine && form.mealType && form.guests && form.budget,
  );

  const updateField = (field: keyof CustomerFormValues, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      setError("Please fill in all required fields.");
      return;
    }

    const preferences: CustomerPreferences = {
      cuisine: form.cuisine as CustomerPreferences["cuisine"],
      mealType: form.mealType as CustomerPreferences["mealType"],
      guests: form.guests as CustomerPreferences["guests"],
      budget: form.budget as CustomerPreferences["budget"],
      specialRequest: form.specialRequest,
    };

    const topMatches = getTopChefMatches(preferences);

    setMatches(topMatches);
    setHasSubmitted(true);
    setError("");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm"
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
            Customer Preferences
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">
            Find the best chef
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Select the customer requirements to generate the top chef matches.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label htmlFor="cuisine" className="text-sm font-semibold">
              Cuisine preference
            </label>
            <select
              id="cuisine"
              value={form.cuisine}
              onChange={(event) => updateField("cuisine", event.target.value)}
              className={fieldClassName}
            >
              <option value="">Select cuisine</option>
              {cuisineOptions.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mealType" className="text-sm font-semibold">
              Meal type
            </label>
            <select
              id="mealType"
              value={form.mealType}
              onChange={(event) => updateField("mealType", event.target.value)}
              className={fieldClassName}
            >
              <option value="">Select meal type</option>
              {mealTypeOptions.map((mealType) => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="guests" className="text-sm font-semibold">
              Number of guests
            </label>
            <select
              id="guests"
              value={form.guests}
              onChange={(event) => updateField("guests", event.target.value)}
              className={fieldClassName}
            >
              <option value="">Select guest count</option>
              {guestOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="budget" className="text-sm font-semibold">
              Budget per session
            </label>
            <select
              id="budget"
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              className={fieldClassName}
            >
              <option value="">Select budget</option>
              {budgetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="specialRequest" className="text-sm font-semibold">
              Special request
            </label>
            <textarea
              id="specialRequest"
              value={form.specialRequest}
              onChange={(event) =>
                updateField("specialRequest", event.target.value)
              }
              rows={4}
              placeholder="Example: Birthday dinner, no beef"
              className={fieldClassName}
            />
          </div>

          <ErrorMessage message={error} />

          <button
            type="submit"
            className="w-full rounded-2xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200"
          >
            Find matching chefs
          </button>
        </div>
      </form>

      <MatchResults matches={matches} hasSubmitted={hasSubmitted} />
    </div>
  );
}