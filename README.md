# CollegePilot 🎓

A full-stack college discovery and decision-making platform built for Indian students. Search, compare, and shortlist colleges using real data — with rank-based predictions, multi-language support, and personalized saved lists.

**Live Demo:** [college-pilot-kappa.vercel.app](https://college-pilot-kappa.vercel.app/)  
**GitHub:** [Aadya-Jha/CollegePilot](https://github.com/Aadya-Jha/CollegePilot)

---

## Features

- **College Discovery** — Search and filter colleges by location, type, and fees with 300ms debounced DB-level queries
- **College Detail Pages** — In-depth pages with courses, placements, top recruiters, and reviews
- **Side-by-Side Comparison** — Compare up to 3 colleges across fees, ratings, NIRF rank, and placement data
- **Rank Predictor** — Input your JEE AIR rank and stream to get admission probability across matching colleges
- **Authentication** — Secure signup/signin with bcrypt-hashed passwords and JWT sessions via NextAuth.js
- **Saved Colleges** — Bookmark colleges to a personal list, scoped to authenticated users
- **Multi-Language Support** — UI translation across Hindi, Tamil, Telugu, Bengali, and Marathi via Google Translate
- **PWA Support** — Installable as a Progressive Web App with manifest and theme configuration
- **Toast Notifications** — Real-time feedback on all user actions via Sonner

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | NextAuth.js + bcryptjs |
| Fonts | Plus Jakarta Sans + Source Serif 4 |
| Notifications | Sonner |
| Deployment | Vercel + Neon |

---

## Architecture Decisions

**DB-level filtering over JS filtering** — All search and filter logic runs as Prisma `where` clauses with `contains` and `mode: insensitive`, reducing server memory usage and keeping response times low.

**Debounced search** — A 300ms debounce on the search input prevents DB hammering during fast typing.

**JWT session strategy** — NextAuth is configured with JWT sessions instead of database sessions to avoid an extra DB round-trip on every request.

**Composite unique key on SavedCollege** — The `@@unique([userId, collegeId])` constraint prevents duplicate bookmarks at the database level, not just application level.

**Component separation for session state** — The Navbar is split into a server component (`Navbar.tsx`) and a client component (`NavbarClient.tsx`) to avoid making the entire navbar a client component just for session access.

**Admin-scoped CSV import** — Bulk college data ingestion is handled via a separate `/api/import` route with duplicate detection and graceful row-level error handling.

---

## Database Schema

```prisma
model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  password      String
  savedColleges SavedCollege[]
}

model College {
  id             String         @id @default(cuid())
  name           String
  location       String
  type           String
  fees           Int
  overallRating  Float
  nirfRank       Int?
  description    String
  highestPackage String
  averagePackage String
  topRecruiters  String[]
  courses        Course[]
  savedByUsers   SavedCollege[]
}

model Course {
  id         String  @id @default(cuid())
  name       String
  duration   String
  fees       Int
  cutoffRank Int
  collegeId  String
  college    College @relation(fields: [collegeId], references: [id], onDelete: Cascade)
}

model SavedCollege {
  userId    String
  collegeId String
  college   College @relation(fields: [collegeId], references: [id])
  user      User    @relation(fields: [userId], references: [id])
  @@unique([userId, collegeId])
}
```

---

## Local Setup

```bash
# Clone and install
git clone <your-repo-url>
cd CollegePilot
npm install

# Set up environment
cp .env.example .env
# Add your DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL

# Push schema and seed data
npx prisma db push
npx prisma db seed

# Run locally
npm run dev
```

---

## Environment Variables

```env
DATABASE_URL="your-neon-postgresql-url"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

---

## Deployment

Deployed on **Vercel** with **Neon PostgreSQL** as the cloud database.

- Push to `main` triggers automatic Vercel deployment
- Neon handles serverless PostgreSQL with connection pooling
- Environment variables configured in Vercel dashboard

---

## Folder Structure

```text
app/

├── api/
│   ├── auth/[...nextauth]/   # NextAuth handler
│   ├── auth/signup/          # User registration
│   ├── colleges/             # College listing + filtering
│   └── saved/                # Save/unsave colleges
├── auth/
│   ├── signin/               # Login page
│   └── signup/               # Registration page
├── colleges/[id]/            # College detail page
├── compare/                  # Side-by-side comparison
├── predictor/                # Rank-based predictor
└── saved/                    # User's saved colleges
components/
├── CollegeCard.tsx
├── FilterSidebar.tsx
├── Navbar.tsx
├── NavbarClient.tsx
├── LanguageToggle.tsx
└── SessionWrapper.tsx
prisma/
├── schema.prisma
└── seed.ts
```

---

Built by Aadya — AI Software Engineer Internship Assignment