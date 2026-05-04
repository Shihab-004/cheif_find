# ChefFind — AI Chef Matching

> Find your perfect home chef in seconds, powered by Google Gemini AI.

ChefFind is a modern AI-powered web application that helps customers discover the most relevant home chefs based on their cuisine preference, meal type, guest count, budget, and special requests.

Built as a developer interview task to demonstrate practical frontend development, AI API integration, clean UI design, structured code organization, and production-ready deployment practices.

---

## 🔗 Links

| | |
|---|---|
| **Live Demo** | https://cheif-find.vercel.app/ |
| **GitHub Repo** | https://github.com/Shihab-004/cheif_find |

---

## ✨ Features

- **Smart AI Matching** — Google Gemini analyzes preferences and recommends the top 3 chefs
- **Match Score** — Each chef gets a 0–100 compatibility score
- **Match Reason** — Short, customer-focused explanation for every recommendation
- **Fallback System** — Rule-based matching kicks in if AI fails, so users always get results
- **Loading State** — Smooth loading indicator during AI processing
- **Error Handling** — Graceful error messages for failed requests
- **Responsive UI** — Clean, mobile-friendly layout
- **Secure API Handling** — API key stays server-side, never exposed to the browser

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI API | Google Gemini |
| Deployment | Vercel / Netlify |

---

## 📁 Project Structure

```
chef_find/
│
├── app/
│   ├── api/
│   │   └── match-chefs/
│   │       └── route.ts          # Server-side AI API route
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── chef-card.tsx             # Individual chef profile card
│   ├── customer-form.tsx         # Preference input form
│   ├── error-message.tsx         # Error display component
│   ├── loading-state.tsx         # Loading animation
│   └── match-results.tsx         # Top 3 results display
│
├── data/
│   ├── chefs.ts                  # Hardcoded chef dataset
│   └── form-options.ts           # Dropdown option values
│
├── lib/
│   ├── ai.ts                     # Gemini API integration
│   └── match-chefs.ts            # Fallback rule-based matching
│
├── types/
│   └── chef.ts                   # TypeScript type definitions
│
├── public/
├── .env.example
├── .env.local                    # ← Never commit this
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone your-repository-url
cd chef_find
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

> Get your free API key at [Google AI Studio](https://aistudio.google.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚙️ Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GEMINI_API_KEY` | Your Google Gemini API key | ✅ Yes |
| `GEMINI_MODEL` | Gemini model name (default: `gemini-2.5-flash`) | Optional |

> ⚠️ **Never push `.env.local` to GitHub.** It is already listed in `.gitignore`.

An example file is included for reference:

```env
# .env.example
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

---

## 🤖 AI Integration

The customer's form input and the full chef dataset are sent to a **server-side Next.js API route** (`/api/match-chefs`). The Gemini model analyzes the following factors to select the top 3 chefs:

- Cuisine preference match
- Meal type support
- Guest count capacity
- Budget compatibility
- Special request relevance
- Chef rating & experience

### Gemini Configuration

```ts
generationConfig: {
  temperature: 0,
  maxOutputTokens: 4096,
  responseMimeType: "application/json",
  responseSchema: chefMatchResponseSchema,
  thinkingConfig: {
    thinkingBudget: 0,
  },
}
```

### AI Response Format

```json
[
  {
    "chefId": "chef-ayesha-rahman",
    "matchScore": 92,
    "matchReason": "Best fit for Bengali dinner with dietary restrictions."
  }
]
```

---

## 🔁 Fallback Matching

If the AI request fails or returns an invalid response, a **local rule-based scoring system** automatically takes over. Users always receive meaningful chef recommendations — no broken or empty results.

The fallback scores chefs based on:

- Cuisine match
- Meal type support
- Budget fit
- Guest capacity
- Chef rating
- Chef experience
- Special request relevance

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create optimized production build |
| `npm run start` | Run production build locally |
| `npm run lint` | Run ESLint for code quality checks |

---

## 🧠 Key Implementation Details

**Server-side API call** — The Gemini API is called from `app/api/match-chefs/route.ts`, keeping the API key secure and out of the browser bundle.

**Structured JSON output** — Using `responseMimeType: "application/json"` and `responseSchema` ensures predictable, parseable AI responses.

**Type-safe codebase** — All chef data, form inputs, and API responses are fully typed with TypeScript.

**Graceful degradation** — The fallback matching system ensures the app never shows a broken state to the user.

---

## ⚡ Challenges & Solutions

**Challenge — Incomplete AI JSON output**
Gemini sometimes returned truncated JSON arrays, causing `JSON.parse()` to fail.

**Solution** — Fixed by increasing `maxOutputTokens` to 4096, setting `temperature` to 0, enforcing structured output with `responseSchema`, disabling thinking tokens with `thinkingConfig`, and adding a fallback rule-based matching system.

---

**Challenge — Securing the API key**
Calling the AI API directly from the frontend would expose the key in the browser.

**Solution** — Moved the API call to a server-side Next.js API route so the key stays protected in environment variables.

---

## 🔮 Future Improvements

- [ ] Add customer and chef authentication
- [ ] Store chef profiles in a database
- [ ] Add admin dashboard for managing chefs
- [ ] Add chef profile image uploads
- [ ] Add customer reviews and ratings
- [ ] Add booking and payment flow
- [ ] Add advanced filtering and sorting options
- [ ] Add unit tests and integration tests
- [ ] Add analytics for user search behavior

---
## 👨‍💻 Author

**Md Shihabul Islam Shihab** 🚀
## 📄 License
🧾 **Interview Task Submission**
