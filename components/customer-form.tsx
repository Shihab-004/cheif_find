"use client";

import { FormEvent, useState } from "react";
import {
  budgetOptions,
  cuisineOptions,
  guestOptions,
  mealTypeOptions,
} from "@/data/form-options";
import type {
  BudgetRange,
  Cuisine,
  CustomerFormValues,
  CustomerPreferences,
  GuestRange,
  MatchedChef,
  MatchChefsResponse,
  MatchResponseSource,
  MealType,
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

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

type SelectFieldProps<T extends string> = {
  label: string;
  placeholder: string;
  value: T | "";
  options: SelectOption<T>[];
  isOpen: boolean;
  onOpen: () => void;
  onChange: (value: T) => void;
};

function SelectField<T extends string>({
  label,
  placeholder,
  value,
  options,
  isOpen,
  onOpen,
  onChange,
}: SelectFieldProps<T>) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className="relative">
      <label className="text-sm font-bold text-slate-950">{label}</label>

      <button
        type="button"
        onClick={onOpen}
        className="mt-2 flex w-full items-center justify-between rounded-2xl border border-orange-100 bg-white px-4 py-3.5 text-left text-sm font-medium text-slate-950 shadow-sm transition hover:border-orange-300 hover:bg-orange-50/40 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100"
      >
        <span className={selectedOption ? "text-slate-950" : "text-slate-400"}>
          {selectedOption?.label ?? placeholder}
        </span>

        <svg
          className={`h-4 w-4 text-slate-500 transition duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-19 z-30 overflow-hidden rounded-2xl border border-orange-100 bg-white p-2 shadow-2xl">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onChange(option.value)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                    isSelected
                      ? "bg-orange-600 text-white"
                      : "text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                  }`}
                >
                  <span>{option.label}</span>

                  {isSelected && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const cuisineSelectOptions: SelectOption<Cuisine>[] = cuisineOptions.map(
  (cuisine) => ({
    label: cuisine,
    value: cuisine,
  }),
);

const mealTypeSelectOptions: SelectOption<MealType>[] = mealTypeOptions.map(
  (mealType) => ({
    label: mealType,
    value: mealType,
  }),
);

const guestSelectOptions: SelectOption<GuestRange>[] = guestOptions;

const budgetSelectOptions: SelectOption<BudgetRange>[] = budgetOptions;

export function CustomerForm() {
  const [form, setForm] = useState<CustomerFormValues>(initialForm);
  const [matches, setMatches] = useState<MatchedChef[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState<MatchResponseSource>();
  const [infoMessage, setInfoMessage] = useState("");
  const [error, setError] = useState("");
  const [openSelect, setOpenSelect] = useState<keyof CustomerFormValues | null>(
    null,
  );

  const isFormValid = Boolean(
    form.cuisine && form.mealType && form.guests && form.budget,
  );

  const updateField = (field: keyof CustomerFormValues, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const closeDropdown = () => {
    setOpenSelect(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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

    setIsLoading(true);
    setHasSubmitted(true);
    setMatches([]);
    setSource(undefined);
    setInfoMessage("");
    setError("");
    closeDropdown();

    try {
      const response = await fetch("/api/match-chefs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      const data = (await response.json()) as
        | MatchChefsResponse
        | { error: string };

      if (!response.ok || "error" in data) {
        throw new Error("error" in data ? data.error : "Something went wrong.");
      }

      setMatches(data.matches);
      setSource(data.source);
      setInfoMessage(data.message ?? "");
    } catch (requestError) {
      const message =
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong while matching chefs.";

      setError(message);
      setMatches([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="rounded-4xl border border-orange-100 bg-white/95 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-600">
            Customer Preferences
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Find the best chef
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            Select the customer requirements to generate the top chef matches.
          </p>
        </div>

        <div className="mt-7 space-y-5">
          <SelectField<Cuisine>
            label="Cuisine preference"
            placeholder="Select cuisine"
            value={form.cuisine}
            options={cuisineSelectOptions}
            isOpen={openSelect === "cuisine"}
            onOpen={() =>
              setOpenSelect(openSelect === "cuisine" ? null : "cuisine")
            }
            onChange={(value) => {
              updateField("cuisine", value);
              closeDropdown();
            }}
          />

          <SelectField<MealType>
            label="Meal type"
            placeholder="Select meal type"
            value={form.mealType}
            options={mealTypeSelectOptions}
            isOpen={openSelect === "mealType"}
            onOpen={() =>
              setOpenSelect(openSelect === "mealType" ? null : "mealType")
            }
            onChange={(value) => {
              updateField("mealType", value);
              closeDropdown();
            }}
          />

          <SelectField<GuestRange>
            label="Number of guests"
            placeholder="Select guest count"
            value={form.guests}
            options={guestSelectOptions}
            isOpen={openSelect === "guests"}
            onOpen={() =>
              setOpenSelect(openSelect === "guests" ? null : "guests")
            }
            onChange={(value) => {
              updateField("guests", value);
              closeDropdown();
            }}
          />

          <SelectField<BudgetRange>
            label="Budget per session"
            placeholder="Select budget"
            value={form.budget}
            options={budgetSelectOptions}
            isOpen={openSelect === "budget"}
            onOpen={() =>
              setOpenSelect(openSelect === "budget" ? null : "budget")
            }
            onChange={(value) => {
              updateField("budget", value);
              closeDropdown();
            }}
          />

          <div>
            <label
              htmlFor="specialRequest"
              className="text-sm font-bold text-slate-950"
            >
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
              className="mt-2 w-full resize-none rounded-2xl border border-orange-100 bg-white px-4 py-3.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 hover:border-orange-300 hover:bg-orange-50/40 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <ErrorMessage message={error} />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-2xl bg-orange-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700 hover:shadow-orange-600/30 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:bg-orange-300 disabled:shadow-none"
          >
            {isLoading ? "Matching chefs..." : "Find matching chefs"}
          </button>
        </div>
      </form>

      <MatchResults
        matches={matches}
        hasSubmitted={hasSubmitted}
        isLoading={isLoading}
        source={source}
        message={infoMessage}
      />
    </div>
  );
}