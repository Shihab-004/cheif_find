export type Cuisine = "Bengali" | "Chinese" | "Italian" | "Continental" | "BBQ";
export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Party catering";
export type GuestRange = "1-5" | "6-15" | "16-30" | "30+";
export type BudgetRange = "500-1000" | "1000-2000" | "2000-5000" | "5000+";

export type CustomerPreferences = {
  cuisine: Cuisine;
  mealType: MealType;
  guests: GuestRange;
  budget: BudgetRange;
  specialRequest: string;
};

export type CustomerFormValues = {
  cuisine: Cuisine | "";
  mealType: MealType | "";
  guests: GuestRange | "";
  budget: BudgetRange | "";
  specialRequest: string;
};

export type Chef = {
  id: string;
  name: string;
  cuisineSpecialties: Cuisine[];
  experienceYears: number;
  specialties: string[];
  rating: number;
  pricePerSession: number;
  mealTypes: MealType[];
  maxGuests: number;
  bio: string;
};

export type MatchedChef = Chef & {
  matchScore: number;
  matchReason: string;
};

export type MatchResponseSource = "ai" | "fallback";

export type MatchChefsResponse = {
  matches: MatchedChef[];
  source: MatchResponseSource;
  message?: string;
};