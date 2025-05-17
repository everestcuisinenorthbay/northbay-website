# Everest Cuisine Website

A responsive, SEO-friendly website for Everest Cuisine, a Nepali-Indian restaurant, built with Next.js, Tailwind CSS, and Sanity.io CMS.

## Features

- Home page with hero section, featured menu items, and promotional content
- Menu page displaying categorized food items from Sanity.io CMS
- Table booking system powered by Sanity.io
- Contact page with Google Maps integration, hours, and contact info
- Mobile-first responsive design
- Performance optimized with Next.js App Router

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **CMS**: Sanity.io (headless)
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Sanity.io project (see below)

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
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Sanity.io Setup

1. Create a project at [sanity.io](https://www.sanity.io/).
2. Set up your schemas for menu items, categories, blog posts, and table bookings (see `src/sanity/schemaTypes`).
3. Use the embedded Studio at `/studio` to manage your content.

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
│   └── sanity/
│       ├── schemaTypes/
│       └── ...
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
