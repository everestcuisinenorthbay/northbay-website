export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  is_vegetarian: boolean;
  is_spicy: boolean;
  is_gluten_free: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  sort: number;
}

export interface PromoBanner {
  id: string;
  title: string;
  description: string;
  button_text: string;
  button_link: string;
  background_color: string;
  is_active: boolean;
}

export interface TableBooking {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
  notes?: string;
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_API_TOKEN;

// Base fetch function with headers
async function fetchFromDirectus(endpoint: string, options: RequestInit = {}) {
  const url = `${DIRECTUS_URL}/items/${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DIRECTUS_TOKEN}`,
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      next: { revalidate: 60 }, // Cache for 1 minute
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching from Directus:', error);
    throw error;
  }
}

// Get all menu items optionally filtered by category
export async function getMenuItems(category?: string): Promise<MenuItem[]> {
  let endpoint = 'menu_items';
  
  if (category) {
    endpoint += `?filter[category][_eq]=${category}`;
  }
  
  const data = await fetchFromDirectus(endpoint);
  return data;
}

// Get all menu categories
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const data = await fetchFromDirectus('menu_categories?sort=sort');
  return data;
}

// Get active promo banners
export async function getPromoBanners(): Promise<PromoBanner[]> {
  const data = await fetchFromDirectus('promo_banners?filter[is_active][_eq]=true');
  return data;
}

// Submit a table booking
export async function submitTableBooking(booking: TableBooking): Promise<any> {
  const data = await fetchFromDirectus('table_bookings', {
    method: 'POST',
    body: JSON.stringify(booking),
  });
  return data;
} 