import type { BudgetRange, Cuisine, GuestRange, MealType } from "@/types/chef";

export const cuisineOptions: Cuisine[] = [
  "Bengali",
  "Chinese",
  "Italian",
  "Continental",
  "BBQ",
];

export const mealTypeOptions: MealType[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Party catering",
];

export const guestOptions: { label: string; value: GuestRange }[] = [
  { label: "1-5 guests", value: "1-5" },
  { label: "6-15 guests", value: "6-15" },
  { label: "16-30 guests", value: "16-30" },
  { label: "30+ guests", value: "30+" },
];

export const budgetOptions: { label: string; value: BudgetRange }[] = [
  { label: "৳500-৳1,000", value: "500-1000" },
  { label: "৳1,000-৳2,000", value: "1000-2000" },
  { label: "৳2,000-৳5,000", value: "2000-5000" },
  { label: "৳5,000+", value: "5000+" },
];