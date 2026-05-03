import { chefs } from "@/data/chefs";
import type { CustomerPreferences, MatchedChef } from "@/types/chef";

type AiChefMatch = {
  chefId: string;
  matchScore: number;
  matchReason: string;
};

type GeminiResponse = {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
};

const chefMatchResponseSchema = {
  type: "ARRAY",
  minItems: 3,
  maxItems: 3,
  items: {
    type: "OBJECT",
    properties: {
      chefId: {
        type: "STRING",
      },
      matchScore: {
        type: "INTEGER",
      },
      matchReason: {
        type: "STRING",
      },
    },
    required: ["chefId", "matchScore", "matchReason"],
  },
};

function buildChefMatchingPrompt(preferences: CustomerPreferences) {
  return `
You are the AI matching engine for ChefFind.

Select the top 3 most relevant home chefs for the customer.

Match using these priorities:
1. Cuisine preference
2. Meal type
3. Guest count capacity
4. Budget fit
5. Special request
6. Rating and experience

Rules:
- Select only chefs from the provided chef list.
- Return exactly 3 chefs.
- chefId must exactly match one of the chef ids.
- Do not invent chefs.
- Return only a valid JSON array.
- Do not use markdown.
- Do not include any text before or after the JSON.
- Keep matchReason under 20 words.

Expected JSON format:
[
  {
    "chefId": "chef-id-here",
    "matchScore": 95,
    "matchReason": "Short customer-focused reason."
  }
]

Customer preferences:
${JSON.stringify(preferences, null, 2)}

Available chefs:
${JSON.stringify(chefs, null, 2)}
`;
}

function extractJsonArray(text: string) {
  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const startIndex = cleanedText.indexOf("[");
  const endIndex = cleanedText.lastIndexOf("]");

  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    throw new Error(`AI response did not contain a valid JSON array: ${text}`);
  }

  return cleanedText.slice(startIndex, endIndex + 1);
}

function isValidAiChefMatch(value: unknown): value is AiChefMatch {
  if (!value || typeof value !== "object") {
    return false;
  }

  const match = value as Record<string, unknown>;

  return (
    typeof match.chefId === "string" &&
    typeof match.matchScore === "number" &&
    typeof match.matchReason === "string"
  );
}

function parseAiMatches(text: string): AiChefMatch[] {
  let parsedData: unknown;

  try {
    parsedData = JSON.parse(text);
  } catch {
    const jsonText = extractJsonArray(text);
    parsedData = JSON.parse(jsonText);
  }

  if (!Array.isArray(parsedData)) {
    throw new Error("AI response is not an array.");
  }

  const validMatches = parsedData.filter(isValidAiChefMatch);

  if (validMatches.length < 3) {
    throw new Error("AI response does not contain 3 valid matches.");
  }

  return validMatches;
}

function hydrateAiMatches(aiMatches: AiChefMatch[]): MatchedChef[] {
  const chefMap = new Map(chefs.map((chef) => [chef.id, chef]));
  const usedChefIds = new Set<string>();

  return aiMatches
    .filter((match) => {
      if (!match.chefId || usedChefIds.has(match.chefId)) {
        return false;
      }

      const chefExists = chefMap.has(match.chefId);

      if (chefExists) {
        usedChefIds.add(match.chefId);
      }

      return chefExists;
    })
    .slice(0, 3)
    .map((match) => {
      const chef = chefMap.get(match.chefId);

      if (!chef) {
        throw new Error("Selected chef does not exist.");
      }

      return {
        ...chef,
        matchScore: Math.max(0, Math.min(100, Math.round(match.matchScore))),
        matchReason: match.matchReason,
      };
    });
}

export async function getAiChefMatches(
  preferences: CustomerPreferences,
): Promise<MatchedChef[]> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildChefMatchingPrompt(preferences),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
          responseSchema: chefMatchResponseSchema,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      }),
    },
  );

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `Gemini API failed with status ${response.status}: ${errorText}`,
    );
  }

  const data = (await response.json()) as GeminiResponse;
  const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!responseText) {
    throw new Error("Gemini API returned an empty response.");
  }

  const aiMatches = parseAiMatches(responseText);
  const matches = hydrateAiMatches(aiMatches);

  if (matches.length < 3) {
    throw new Error("AI returned fewer than 3 valid chef matches.");
  }

  return matches;
}
