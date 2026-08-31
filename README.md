# BookDeal BD 📚🇧🇩

Bangladesh's #1 used book marketplace built for students. Buy and sell used textbooks, guides, and academic books at the best prices. Covering all classes from Nursery to Masters.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom Glassmorphism UI
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Backend/DB:** Firebase (Auth, Firestore, Storage) *[Currently using mocked data for prototype phase]*

## 📂 Project Structure

To help developers easily navigate the codebase, here is the directory structure:

```text
src/
├── app/                  # Next.js 14 App Router (Pages & Layouts)
│   ├── admin/            # Admin portal routes
│   ├── auth/             # Login & Registration routes
│   ├── books/            # Marketplace search & individual book pages
│   ├── cart/             # Shopping cart and checkout
│   ├── dashboard/        # User dashboard (Profile, Orders, Sell, Wishlist)
│   ├── (static pages)/   # /about, /contact, /faq, /terms, /privacy, etc.
│   ├── globals.css       # Core CSS, Tailwind setup, Glassmorphism variables
│   └── layout.tsx        # Root HTML layout and global providers
│
├── components/           # Reusable React Components
│   ├── home/             # Sections specific to the landing page (Hero, Featured, etc.)
│   ├── layout/           # Global wrappers (Navbar, Footer)
│   └── ui/               # Reusable atomic UI components (BookCard, CustomSelect)
│
├── context/              # React Context API providers
│   ├── AuthContext.tsx   # User authentication state (currently mocked)
│   ├── CartContext.tsx   # Shopping cart logic (add/remove items, totals)
│   └── SiteContext.tsx   # Global site settings (Theme, Taglines)
│
├── data/                 # Static & Mock Data
│   └── mockBooks.ts      # Prototype database of books (replace with Firestore)
│
└── lib/                  # Utilities and Hooks
    ├── constants.ts      # Bangladesh education mappings (NCTB, HSC, etc.)
    ├── firebase.ts       # Firebase initialization
    └── hooks/            # Custom React hooks (e.g., useBooks)
```

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 UI/UX Guidelines

The project uses a custom **Glassmorphism** design system.
- **Global CSS:** Refer to `src/app/globals.css` for custom utility classes like `.glass`, `.glass-card`, `.bg-mesh`, and `.btn-primary`.
- **Responsive Design:** Native Tailwind breakpoints (`md:`, `lg:`, `sm:`) are used for all responsive behaviors.

## 👨‍💻 Developer Notes
- **Mock Data Phase:** The app is currently running in a prototype state. Books are loaded from `src/data/mockBooks.ts`. The next major development phase requires hooking up `src/lib/firebase.ts` to replace the mock data with live Firestore collections.
- **Reusable Components:** When rendering book grids, always use the `<BookCard />` component from `src/components/ui/BookCard.tsx` to maintain UI consistency.
