import { NextResponse } from "next/server";
import {
  budgetOptions,
  cuisineOptions,
  guestOptions,
  mealTypeOptions,
} from "@/data/form-options";
import { getAiChefMatches } from "@/lib/ai";
import { getTopChefMatches } from "@/lib/match-chefs";
import type {
  BudgetRange,
  Cuisine,
  CustomerPreferences,
  GuestRange,
  MealType,
} from "@/types/chef";

function isValidOption<T extends string>(
  value: unknown,
  options: readonly T[],
): value is T {
  return typeof value === "string" && options.includes(value as T);
}

function parsePreferences(payload: unknown): CustomerPreferences | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as Record<string, unknown>;
  const budgetValues = budgetOptions.map((option) => option.value);
  const guestValues = guestOptions.map((option) => option.value);

  const cuisine = data.cuisine;
  const mealType = data.mealType;
  const guests = data.guests;
  const budget = data.budget;
  const specialRequest = data.specialRequest;

  if (!isValidOption<Cuisine>(cuisine, cuisineOptions)) {
    return null;
  }

  if (!isValidOption<MealType>(mealType, mealTypeOptions)) {
    return null;
  }

  if (!isValidOption<GuestRange>(guests, guestValues)) {
    return null;
  }

  if (!isValidOption<BudgetRange>(budget, budgetValues)) {
    return null;
  }

  return {
    cuisine,
    mealType,
    guests,
    budget,
    specialRequest: typeof specialRequest === "string" ? specialRequest : "",
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const preferences = parsePreferences(payload);

    if (!preferences) {
      return NextResponse.json(
        { error: "Invalid customer preferences." },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      const fallbackMatches = getTopChefMatches(preferences);

      return NextResponse.json({
        matches: fallbackMatches,
        source: "fallback",
      });
    }

    try {
      const matches = await getAiChefMatches(preferences);

      return NextResponse.json({
        matches,
        source: "ai",
      });
    } catch (error) {
  // এই line টা add করো
  console.error("AI matching error:", error);
  
  const fallbackMatches = getTopChefMatches(preferences);
  return NextResponse.json({
    matches: fallbackMatches,
    source: "fallback",
    message: "AI matching failed. Showing rule-based matches.",
  });
}
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 },
    );
  }
}