# Everest Cuisine Website

A responsive, SEO-friendly website for Everest Cuisine, a Nepali-Indian restaurant, built with Next.js, Tailwind CSS, and Directus CMS.

## Features

- Home page with hero section, featured menu items, and promotional content
- Menu page displaying categorized food items from Directus CMS
- Table booking system that posts to Directus collection
- Contact page with Google Maps integration, hours, and contact info
- Mobile-first responsive design
- Performance optimized with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **CMS**: Directus (headless)
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Directus instance (self-hosted or cloud)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/everest-website.git
cd everest-website
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_DIRECTUS_URL=https://your-directus-instance.com
NEXT_PUBLIC_DIRECTUS_API_TOKEN=your_public_token_here
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Directus Setup

### Collections

Create the following collections in your Directus instance:

1. **menu_categories**
   - `id` (primary key)
   - `name` (string)
   - `sort` (integer)

2. **menu_items**
   - `id` (primary key)
   - `name` (string)
   - `description` (text)
   - `price` (decimal)
   - `category` (M2O relation to menu_categories)
   - `image` (file)
   - `is_vegetarian` (boolean)
   - `is_spicy` (boolean)
   - `is_gluten_free` (boolean)

3. **promo_banners**
   - `id` (primary key)
   - `title` (string)
   - `description` (text)
   - `button_text` (string)
   - `button_link` (string)
   - `background_color` (string)
   - `is_active` (boolean)

4. **table_bookings**
   - `id` (primary key)
   - `name` (string)
   - `email` (string)
   - `phone` (string)
   - `date` (date)
   - `time` (string)
   - `party_size` (integer)
   - `notes` (text)
   - `status` (string - pending/confirmed/cancelled)

## Project Structure

```
everest-website/
├── public/
│   └── images/
├── src/
│   ├── app/
│   │   ├── book-table/
│   │   ├── contact/
│   │   ├── menu/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       └── MenuCard.tsx
│   └── lib/
│       └── directus.ts
├── .env.local
├── package.json
├── tailwind.config.js
└── README.md
```

## Deployment

This website is ready to deploy on Vercel, Netlify, or any other Next.js-compatible platform.

For Vercel deployment:

1. Push your repository to GitHub/GitLab/BitBucket
2. Import the project in Vercel
3. Set the environment variables
4. Deploy

## License

[MIT](LICENSE)
