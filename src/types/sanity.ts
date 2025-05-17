export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface MenuItem {
  _id: string;
  _type: 'menuItem';
  name: string;
  description: string;
  price: number;
  image: SanityImage;
  isVegetarian: boolean;
  isSpicy: boolean;
  isGlutenFree: boolean;
}

export interface MenuCategory {
  _id: string;
  _type: 'menuCategory';
  name: string;
  order: number;
  menuItems: MenuItem[];
} 