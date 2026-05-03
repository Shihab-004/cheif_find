import { chefs } from "@/data/chefs";
import type {
  BudgetRange,
  Chef,
  CustomerPreferences,
  GuestRange,
  MatchedChef,
} from "@/types/chef";

const budgetLimits: Record<BudgetRange, number> = {
  "500-1000": 1000,
  "1000-2000": 2000,
  "2000-5000": 5000,
  "5000+": Number.POSITIVE_INFINITY,
};

const guestLimits: Record<GuestRange, number> = {
  "1-5": 5,
  "6-15": 15,
  "16-30": 30,
  "30+": 60,
};

const currencyFormatter = new Intl.NumberFormat("en-BD", {
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return `৳${currencyFormatter.format(amount)}`;
}

function getBudgetLimit(budget: BudgetRange) {
  return budgetLimits[budget];
}

function getGuestLimit(guests: GuestRange) {
  return guestLimits[guests];
}

function getSpecialRequestScore(chef: Chef, specialRequest: string) {
  const request = specialRequest.toLowerCase().trim();

  if (!request) {
    return 0;
  }

  const chefText = `${chef.specialties.join(" ")} ${chef.bio}`.toLowerCase();

  const rules = [
    {
      requestKeywords: ["no beef", "without beef", "beef", "dietary", "allergy"],
      chefKeywords: ["dietary", "custom", "without beef", "healthy"],
    },
    {
      requestKeywords: ["birthday", "anniversary", "celebration", "party"],
      chefKeywords: ["birthday", "party", "event", "fine dining", "custom"],
    },
    {
      requestKeywords: ["large", "corporate", "office", "event"],
      chefKeywords: ["large", "corporate", "event", "catering"],
    },
    {
      requestKeywords: ["bbq", "grill", "outdoor"],
      chefKeywords: ["bbq", "grill", "outdoor"],
    },
  ];

  let score = 0;

  for (const rule of rules) {
    const requestMatches = rule.requestKeywords.some((keyword) =>
      request.includes(keyword),
    );

    const chefMatches = rule.chefKeywords.some((keyword) =>
      chefText.includes(keyword),
    );

    if (requestMatches && chefMatches) {
      score += 5;
    }
  }

  return Math.min(score, 15);
}

function buildMatchReason(
  chef: Chef,
  preferences: CustomerPreferences,
  specialRequestScore: number,
) {
  const reasons: string[] = [];
  const budgetLimit = getBudgetLimit(preferences.budget);
  const guestLimit = getGuestLimit(preferences.guests);

  if (chef.cuisineSpecialties.includes(preferences.cuisine)) {
    reasons.push(`matches ${preferences.cuisine} cuisine`);
  }

  if (chef.mealTypes.includes(preferences.mealType)) {
    reasons.push(`supports ${preferences.mealType.toLowerCase()}`);
  }

  if (
    budgetLimit === Number.POSITIVE_INFINITY ||
    chef.pricePerSession <= budgetLimit
  ) {
    reasons.push("fits the selected budget");
  }

  if (chef.maxGuests >= guestLimit) {
    reasons.push(`can serve ${preferences.guests} guests`);
  }

  if (specialRequestScore > 0) {
    reasons.push("handles the special request");
  }

  if (!reasons.length) {
    return "Recommended based on overall rating, experience, and service profile.";
  }

  return `Best fit because the chef ${reasons.slice(0, 3).join(", ")}.`;
}

export function getTopChefMatches(
  preferences: CustomerPreferences,
): MatchedChef[] {
  const budgetLimit = getBudgetLimit(preferences.budget);
  const guestLimit = getGuestLimit(preferences.guests);

  return chefs
    .map((chef) => {
      const specialRequestScore = getSpecialRequestScore(
        chef,
        preferences.specialRequest,
      );

      let score = 0;

      if (chef.cuisineSpecialties.includes(preferences.cuisine)) {
        score += 35;
      }

      if (chef.mealTypes.includes(preferences.mealType)) {
        score += 15;
      }

      if (
        budgetLimit === Number.POSITIVE_INFINITY ||
        chef.pricePerSession <= budgetLimit
      ) {
        score += 20;
      } else if (chef.pricePerSession <= budgetLimit * 1.2) {
        score += 8;
      } else {
        score -= 10;
      }

      if (chef.maxGuests >= guestLimit) {
        score += 15;
      } else if (chef.maxGuests >= guestLimit * 0.7) {
        score += 6;
      } else {
        score -= 8;
      }

      score += Math.min(chef.experienceYears, 10);
      score += Math.round((chef.rating - 4) * 10);
      score += specialRequestScore;

      return {
        ...chef,
        matchScore: Math.max(0, Math.min(100, Math.round(score))),
        matchReason: buildMatchReason(chef, preferences, specialRequestScore),
      };
    })
    .sort((firstChef, secondChef) => {
      return (
        secondChef.matchScore - firstChef.matchScore ||
        secondChef.rating - firstChef.rating ||
        firstChef.pricePerSession - secondChef.pricePerSession
      );
    })
    .slice(0, 3);
}