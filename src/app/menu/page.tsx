"use client";
import MenuCard from '@/components/ui/MenuCard';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isGlutenFree?: boolean;
}

interface MenuCategory {
  id: number;
  name: string;
  items: MenuItem[];
}

// For demo purposes only - in a real-world scenario this data would come from Directus CMS
const menuCategories: MenuCategory[] = [
  {
    id: 1,
    name: 'Appetizers',
    items: [
      {
        id: 1,
        name: 'Veg Samosa (2 pcs)',
        description: 'Deep-fried pastry filled with spiced vegetables.',
        price: 5.99,
        isVegetarian: true,
        imageUrl: '/images/Samosa.jpg'
      },
      {
        id: 2,
        name: 'Vegetable Tempura (7 pcs)',
        description: 'Lightly battered and deep-fried assorted vegetables with tempura sauce.',
        price: 6.99,
        isVegetarian: true,
        imageUrl: '/images/Veg-tempura.jpg'
      },
      {
        id: 3,
        name: 'Wai Wai Sadheko',
        description: 'Popular Nepali noodles (Wai Wai) mixed with onion, tomato, and Nepali spices.',
        price: 7.99,
        isVegetarian: true,
        imageUrl: '/images/wai-wai.jpg'
      },
      {
        id: 4,
        name: 'Bhatmas Sadheko',
        description: 'Roasted Nepali soybeans mixed with ginger, green onion, cilantro, and Nepali spices.',
        price: 7.99,
        isVegetarian: true,
        imageUrl: '/images/Aloo ko Achar.jpg'
      },
      {
        id: 5,
        name: 'Potato Wedges Chill',
        description: 'Crispy potatoes coated in chili sauce.',
        price: 9.99,
        isVegetarian: true,
        imageUrl: '/images/wedges.jpg'
      },
      {
        id: 6,
        name: 'Gobi 65',
        description: 'Battered cauliflower florets deep-fried and sautéed with spices and herbs.',
        price: 11.99,
        isVegetarian: true,
        isSpicy: true,
        imageUrl: '/images/gobi-65.jpg'
      },
      {
        id: 7,
        name: 'Shrimp Tempura (7 pcs)',
        description: 'Lightly battered shrimp deep-fried with tempura sauce.',
        price: 12.99,
        imageUrl: '/images/Shrimp-tempure.jpg'
      },
      {
        id: 8,
        name: 'Spicy Tartare (Tuna/Salmon) (5 pcs)',
        description: 'Sashimi-grade tuna or salmon with spicy sauce, togarashi, crispy rice, and green onion.',
        price: 14.99,
        isSpicy: true,
        imageUrl: '/images/spicy-tartare.jpg'
      },
      {
        id: 9,
        name: 'Chicken 65',
        description: 'Battered deep-fried chicken sautéed with spices and herbs.',
        price: 14.99,
        isSpicy: true,
        imageUrl: '/images/chicken-65-(4).jpg'
      },
      {
        id: 10,
        name: 'Buffalo Wings',
        description: 'Deep-fried chicken wings coated in chili sauce.',
        price: 14.99,
        isSpicy: true,
        imageUrl: '/images/Chicken-strips.jpg'
      },
      {
        id: 11,
        name: 'Calamari',
        description: 'Battered squid deep-fried and sautéed with herbs and green chutney.',
        price: 16.99,
        imageUrl: '/images/calamari.jpg'
      },
    ],
  },
  {
    id: 2,
    name: 'Soup & Salad',
    items: [
      {
        id: 12,
        name: 'Mix Lentil Soup (Dal Tadka)',
        description: 'Nepalese-style lentil soup with Himalayan herbs.',
        price: 8.99,
        isVegetarian: true,
        imageUrl: '/images/daal.jpg'
      },
      {
        id: 13,
        name: 'Green Salad',
        description: 'Cucumber, carrots, lettuce, tomato, edamame, sesame, tempura bits, and green onion.',
        price: 8.99,
        isVegetarian: true,
        imageUrl: '/images/green-salad.jpg'
      },
      {
        id: 14,
        name: 'Crab Stick Salad',
        description: 'Crab stick, lettuce, sesame, cucumber, edamame, three sauces, and tempura bits.',
        price: 10.99,
        imageUrl: '/images/crab-stick.jpg'
      },
      {
        id: 15,
        name: 'Vegetable Thukpa',
        description: 'Popular Himalayan noodle soup with mixed vegetables and Nepali spices.',
        price: 13.99,
        isVegetarian: true,
        imageUrl: '/images/veg-thukpa.jpg'
      },
      {
        id: 16,
        name: 'Chicken Thukpa',
        description: 'Popular Himalayan noodle soup with chicken, mixed vegetables, and Nepali spices.',
        price: 15.99,
        imageUrl: '/images/chicken-thukpa.jpg'
      },
    ],
  },
  {
    id: 3,
    name: 'Touch of Nepal',
    items: [
      {
        id: 17,
        name: 'Nepali Veg Thali Set',
        description: 'Basmati rice with vegetable curry, papadum, potato pickle (aloo ko achar), pickled daikon (mula ko achar), broad leaf mustard (rayo saag), carrot, cucumber and lentil soup (dal), and homemade yogurt.',
        price: 21.99,
        isVegetarian: true,
        imageUrl: '/images/veg-thali.jpg'
      },
      {
        id: 18,
        name: 'Nepali Non-Veg Thali Set (Chicken)',
        description: 'Basmati rice with chicken curry, papadum, potato pickle (aloo ko achar), pickled daikon (mula ko achar), broad leaf mustard (rayo saag), carrot, cucumber and lentil soup (dal), and homemade yogurt.',
        price: 24.99,
        imageUrl: '/images/chicken-thali.jpg'
      },
      {
        id: 19,
        name: 'Nepali Non-Veg Thali Set with Goat Curry (Masu Bhat)',
        description: 'Basmati rice with goat curry, papadum, potato pickle (aloo ko achar), pickled daikon (mula ko achar), broad leaf mustard (rayo saag), carrot, cucumber and lentil soup (dal), and homemade yogurt.',
        price: 27.99,
        imageUrl: '/images/mutton-thali.jpg'
      },
      {
        id: 20,
        name: 'Everest Sekuwa Set',
        description: 'Tandoor grilled with Nepalese spices served with a mix of beaten rice (chiura) or puffed rice (bhuja), pickled daikon (mula ko achar), carrot, cucumber, spicy potato salad (aloo ko achar) and chili sauce.',
        price: 25.99,
        imageUrl: '/images/Sekuwa Set.jpg'
      },
      {
        id: 21,
        name: 'Himalayan Choila Set',
        description: 'Marinated chicken roasted in a clay tandoor then coated with Nepalese spices served with a mix of beaten rice (chiura) or puffed rice (bhuja), pickled daikon (mula ko achar), carrot, crispy potato salad (aloo ko achar) and sweet and sour tangy hot plum sauce.',
        price: 25.99,
        imageUrl: '/images/Himalayan Chhoila Set.jpg'
      },
      {
        id: 22,
        name: 'Nepali Mixed Veg Curry',
        description: 'Seasonal mixed vegetables in a rich Nepali gravy.',
        price: 14.99,
        isVegetarian: true,
        imageUrl: '/images/veg-curry.jpg'
      },
      {
        id: 23,
        name: 'Chicken Sekuwa',
        description: 'Popular marinated tandoori chicken with Nepali spices.',
        price: 18.99,
        imageUrl: '/images/chicken-sekuwa.jpg'
      },
      {
        id: 24,
        name: 'Chicken Chhoila',
        description: 'Tandoori marinated chicken roasted in a clay tandoor oven coated with Nepali spices.',
        price: 18.99,
        imageUrl: '/images/chicken-choila.jpg'
      },
      {
        id: 25,
        name: 'Nepali Style Chicken Curry',
        description: 'Marinated chicken cooked in a blend of aromatic spices.',
        price: 19.99,
        imageUrl: '/images/chicken-curry.jpg'
      },
      {
        id: 26,
        name: 'Nepali Style Goat Curry',
        description: 'Marinated goat cooked in a blend of aromatic spices.',
        price: 22.99,
        imageUrl: '/images/Mutton-curry.jpg'
      },
    ],
  },
  {
    id: 4,
    name: 'Touch of India',
    items: [
      {
        id: 46,
        name: 'Vegetable Biryani',
        description: 'Basmati rice with onions, green pepper, paneer, fresh vegetables, and raita.',
        price: 16.99,
        imageUrl: '/images/veg-biryani.jpg'
      },
      {
        id: 47,
        name: 'Butter Paneer',
        description: 'Cubes of paneer simmered in buttered makhani gravy.',
        price: 17.99,
        imageUrl: '/images/butter-paneer.jpg'
      },
      {
        id: 48,
        name: 'Butter Chicken',
        description: 'Creamy chicken curry with fragrant spices.',
        price: 19.99,
        imageUrl: '/images/butter-chicken.jpg'
      },
      {
        id: 49,
        name: 'Chicken Biryani',
        description: 'Basmati rice with marinated chicken and Indian spices, served with raita.',
        price: 22.99,
        imageUrl: '/images/chicken-biryani.jpg'
      },
      {
        id: 50,
        name: 'Goat Biryani',
        description: 'Basmati rice with marinated goat meat and Indian spices, served with raita.',
        price: 24.99,
        imageUrl: '/images/Goat-biryani.jpg'
      },
    ],
  },
  {
    id: 5,
    name: 'Sushi Bar',
    items: [
      {
        id: 23,
        name: 'Avocado Uramaki (8 pcs)',
        description: 'Avocado, mayo, tempura bits, and nori.',
        price: 7.99,
        isVegetarian: true,
        imageUrl: '/images/Veg-tempura.jpg'
      },
      {
        id: 24,
        name: 'Spicy Tuna Roll (8 pcs)',
        description: 'Nori, spicy tuna, avocado, cucumber, tempura bits, tobiko, and sesame.',
        price: 14.99,
        isSpicy: true,
        imageUrl: '/images/spicy-tartare.jpg'
      },
      {
        id: 25,
        name: 'Everest Killer Roll (8 pcs)',
        description: 'Spicy salmon or spicy tuna with cucumber, avocado, shrimp tempura, sesame, teriyaki sauce, and mayo.',
        price: 16.99,
        isSpicy: true,
        imageUrl: '/images/tiger-shrimp.jpg'
      },
      {
        id: 36,
        name: 'Avocado Uramaki (8 Pcs)',
        description: 'Avocado, mayo, tempura bits, and nori.',
        price: 7.99,
        imageUrl: '/images/Veg-tempura.jpg'
      },
      {
        id: 37,
        name: 'Tiger Shrimp Roll (6 Pcs)',
        description: 'Tiger shrimp, cucumber, lettuce, avocado, spicy sauce, tobiko, and tempura bits.',
        price: 13.99,
        imageUrl: '/images/tiger-shrimp.jpg'
      },
      {
        id: 38,
        name: 'Spicy Tuna Roll (8 Pcs)',
        description: 'Nori, spicy tuna, avocado, cucumber, tempura bits, tobiko, and sesame.',
        price: 14.99,
        imageUrl: '/images/spicy-tartare.jpg'
      },
      {
        id: 39,
        name: 'Everest Killer Roll (8 Pcs)',
        description: 'Spicy salmon or spicy tuna with cucumber, avocado, shrimp tempura, sesame, teriyaki sauce, and mayo.',
        price: 16.99,
        imageUrl: '/images/tiger-shrimp.jpg'
      },
      {
        id: 40,
        name: 'Tokyo Sushi Platter',
        description: 'Includes Everest Killer Roll (8 pcs), Spicy Tuna Roll (8 pcs), Tiger Shrimp Roll (6 pcs), and Avocado Roll (8 pcs).',
        price: 44.99,
        imageUrl: '/images/tiger-shrimp.jpg'
      },
    ],
  },
  {
    id: 6,
    name: 'Authentic Nepalese Momo',
    items: [
      {
        id: 27,
        name: 'Kathmandu Steam Momo (Chicken or Veg)',
        description: 'Traditional steamed momo served with dipping sauce.',
        price: 14.99,
        imageUrl: '/images/chicken-steam.jpg'
      },
      {
        id: 28,
        name: 'Pokhara Kothey Momo (Chicken or Veg)',
        description: 'Pan-seared momo served with dipping sauce.',
        price: 14.99,
        imageUrl: '/images/chicken-kothey.jpg'
      },
      {
        id: 29,
        name: 'Makalu Fried Momo (Chicken or Veg)',
        description: 'Deep-fried momo served with dipping sauce.',
        price: 14.99,
        imageUrl: '/images/chicken-fried-momo.jpg'
      },
      {
        id: 30,
        name: 'Everest Jhol Momo (Chicken or Veg)',
        description: 'Steamed momo served in a mixed hot and spicy soup.',
        price: 15.99,
        imageUrl: '/images/chicken-steam.jpg'
      },
      {
        id: 31,
        name: 'Himalayan Choila Momo (Chicken or Veg)',
        description: 'Steamed momo served with choila masala.',
        price: 15.99,
        imageUrl: '/images/chicken-chhoila.jpg'
      },
      {
        id: 32,
        name: 'Gorkha Sizzler Momo (Chicken or Veg)',
        description: 'Sizzling momo served in an iron pot with dipping sauce.',
        price: 16.99,
        imageUrl: '/images/chicken-sizzler.jpg'
      },
      {
        id: 33,
        name: 'Namche Chilli Momo (Chicken or Veg)',
        description: 'Momo tossed in spicy chilli sauce with Green Pepper, Onion & Tomato.',
        price: 16.99,
        imageUrl: '/images/chicken-fried-momo.jpg'
      },
      {
        id: 34,
        name: 'Everest Tandoori Momo (Chicken or Veg)',
        description: 'Steamed momo cooked in a tandoori oven, served with dipping sauce.',
        price: 17.99,
        imageUrl: '/images/chicken-tandoori.jpg'
      },
      {
        id: 35,
        name: 'Everest Combo Momo',
        description: '(20 PCS) (CHICKEN OR VEG) Includes Steam Momo, Chholla Momo, Tandoori Momo, and Fried Momo (5 pcs each).',
        price: 30.99,
        imageUrl: '/images/chicken-platter.jpg'
      },
    ],
  },
  {
    id: 7,
    name: 'Wraps (Momo & Chowmein)',
    items: [
      {
        id: 41,
        name: 'Makalu Fried Momo Wrap (Chicken or Veg)',
        description: 'Makalu fried momo, lettuce, spicy mayo, chili sauce, tortilla wrap, served with fries or salad.',
        price: 13.99,
        imageUrl: '/images/fried-wrap.jpg'
      },
      {
        id: 42,
        name: 'Everest Chow Mein Wrap (Veg)',
        description: 'Chow mein, lettuce, chili sauce, mayo, tortilla wrap, served with fries or salad.',
        price: 13.99,
        imageUrl: '/images/chowmein-wrap.jpg'
      },
      {
        id: 43,
        name: 'Himalayan Chhoila Momo Wrap (Chicken or Veg)',
        description: 'Himalayan chhoila momo, chili sauce, lettuce, tortilla wrap, served with fries or salad.',
        price: 14.99,
        imageUrl: '/images/chhoila-wrap.jpg'
      },
      {
        id: 44,
        name: 'Everest Chow Mein Wrap (Chicken)',
        description: 'Chow mein, lettuce, chicken mayo, chili sauce, tortilla wrap, served with fries or salad.',
        price: 14.99,
        imageUrl: '/images/chowmein-wrap.jpg'
      },
      {
        id: 45,
        name: 'Everest Tandoori Momo Wrap (Chicken or Veg)',
        description: 'Tandoori momo, lettuce, spicy mayo, chili sauce, tortilla wrap, served with fries or salad.',
        price: 15.99,
        imageUrl: '/images/tandoori-wrap.jpg'
      },
    ],
  },
  {
    id: 10,
    name: 'Student Menu',
    items: [
      {
        id: 51,
        name: 'Gobi Manchurian with Rice',
        description: 'Fresh Basmati Rice, with Gobi Manchurian on top.',
        price: 14.99,
        imageUrl: '/images/gobi-manchurian-student.jpg'
      },
      {
        id: 52,
        name: 'Chicken Manchurian with Rice',
        description: 'Fresh Basmati Rice, with Chicken Manchurian on top.',
        price: 16.99,
        imageUrl: '/images/chicken-manchurian-student.jpg'
      },
      {
        id: 53,
        name: 'Gobi 65 with Rice',
        description: 'Fresh Basmati Rice with Gobi 65 on top.',
        price: 14.99,
        imageUrl: '/images/gobi-65-student.jpg'
      },
      {
        id: 54,
        name: 'Chicken 65 with Rice',
        description: 'Fresh Basmati Rice with Chicken 65 on top.',
        price: 16.99,
        imageUrl: '/images/chicken-65-student.jpg'
      },
    ],
  },
  {
    id: 11,
    name: 'Touch of Indo-China (Hearty Hakka)',
    items: [
      {
        id: 55,
        name: 'Vegetable Fried Rice',
        description: 'Basmati rice fried in a wok with mixed vegetables and various spices and herbs.',
        price: 12.99,
        imageUrl: '/images/veg-fried-rice.jpg'
      },
      {
        id: 56,
        name: 'Vegetable Chow Mein',
        description: 'Wok stir-fried noodles and fresh vegetables with aromatic spices.',
        price: 13.99,
        imageUrl: '/images/Veg-chowmein.jpg'
      },
      {
        id: 57,
        name: 'Gobi Manchurian',
        description: 'Crispy tender cauliflower tossed in an aromatic sweet, spicy, and salty sauce.',
        price: 13.99,
        imageUrl: '/images/gobi-manchurian.jpg'
      },
      {
        id: 58,
        name: 'Chicken Fried Rice',
        description: 'Basmati rice wok-fried with chicken.',
        price: 17.99,
        imageUrl: '/images/Chicken-fried-rice.jpg'
      },
      {
        id: 59,
        name: 'Chicken Manchurian',
        description: 'Crispy tender chicken tossed in an aromatic sweet, spicy, and salty sauce.',
        price: 18.99,
        imageUrl: '/images/chicken-manchurian.jpg'
      },
      {
        id: 60,
        name: 'Chicken Chow Mein',
        description: 'Wok stir-fried noodles with chicken and fresh vegetables with aromatic spices.',
        price: 18.99,
        imageUrl: '/images/chicken-chowmein.jpg'
      },
      {
        id: 61,
        name: 'Chicken Chill',
        description: 'Crispy battered fried chicken tossed in a sweet and tangy sauce with a hint of spices.',
        price: 19.99,
        imageUrl: '/images/chips-chilli.jpg'
      },
    ],
  },
  {
    id: 12,
    name: 'Side Orders',
    items: [
      {
        id: 62,
        name: 'Pau Qua (Sweet and Sour Sauce)',
        description: 'Nepali hot plum (Lapsi) and spice sauce.',
        price: 2.99,
        imageUrl: '/images/pau-qua.jpg'
      },
      {
        id: 63,
        name: 'Papadum (2 Pcs)',
        description: 'Plain lentil flatbread.',
        price: 2.99,
        imageUrl: '/images/Aloo ko Achar.jpg'
      },
      {
        id: 64,
        name: 'Plain Naan',
        description: 'Freshly clay oven-baked naan dough (made of flour, yeast, milk, and butter).',
        price: 2.99,
        imageUrl: '/images/plain-naan.jpg'
      },
      {
        id: 65,
        name: 'Mula Ko Achar',
        description: 'Authentic Nepalese style pickled daikon.',
        price: 2.99,
        imageUrl: '/images/mulako-achaar.jpg'
      },
      {
        id: 66,
        name: 'Raita with Chaat Masala',
        description: '',
        price: 3.99,
        imageUrl: '/images/daal.jpg'
      },
      {
        id: 67,
        name: 'Plain Rice',
        description: 'Sticky rice basmati rise.',
        price: 3.99,
        imageUrl: '/images/rice.jpg'
      },
      {
        id: 68,
        name: 'Sushi Rice',
        description: 'Sushi rice seasoned with vinegar.',
        price: 3.99,
        imageUrl: '/images/rice.jpg'
      },
      {
        id: 69,
        name: 'Mix of Beaten Rice (Chiura) & Puffed Rice (Bhuja)',
        description: '',
        price: 3.99,
        imageUrl: '/images/rice.jpg'
      },
      {
        id: 70,
        name: 'Garlic Naan',
        description: 'Freshly tandoor clay oven-baked naan dough with garlic.',
        price: 3.99,
        imageUrl: '/images/garlic-naan.jpg'
      },
      {
        id: 71,
        name: 'Butter Naan',
        description: 'Freshly cooked in a tandoor clay oven with butter.',
        price: 3.99,
        imageUrl: '/images/butter-naan.jpg'
      },
      {
        id: 72,
        name: 'Jeera Pulao Rice',
        description: 'Aromatic basmati rice with butter and cumin.',
        price: 4.99,
        imageUrl: '/images/rice.jpg'
      },
      {
        id: 73,
        name: 'Garlic Butter Naan',
        description: 'Freshly cooked in a tandoor clay oven with butter and garlic.',
        price: 4.99,
        imageUrl: '/images/garlic-butter-naan.jpg'
      },
      {
        id: 74,
        name: 'Aloo Ko Achar',
        description: 'Boiled potatoes with authentic Nepalese spices and dipping sauce.',
        price: 6.99,
        imageUrl: '/images/Aloo ko Achar.jpg'
      },
    ],
  },
  {
    id: 13,
    name: 'Soft Drinks & Tea',
    items: [
      {
        id: 75,
        name: 'Green Tea',
        description: '',
        price: 2.49,
        imageUrl: '/images/green-tea.jpg'
      },
      {
        id: 76,
        name: 'Nepali Aromatic Milk Tea (Chai/Chiya)',
        description: '',
        price: 2.99,
        imageUrl: '/images/milk-tea.jpg'
      },
      {
        id: 77,
        name: 'Pops',
        description: '',
        price: 2.99,
        imageUrl: '/images/pops.jpg'
      },
      {
        id: 78,
        name: 'Bottled Water',
        description: '',
        price: 2.99,
        imageUrl: '/images/water.jpg'
      },
      {
        id: 79,
        name: 'Juice (Apple or Orange)',
        description: '',
        price: 3.99,
        imageUrl: '/images/Apple-juice.jpg'
      },
      {
        id: 80,
        name: 'Yogurt Drink (Mohi)',
        description: '',
        price: 3.99,
        imageUrl: '/images/daal.jpg'
      },
      {
        id: 81,
        name: 'Mango Lassi',
        description: '',
        price: 4.99,
        imageUrl: '/images/daal.jpg'
      },
    ],
  },
  {
    id: 14,
    name: 'Kids Menu',
    items: [
      {
        id: 82,
        name: 'Potato Fries',
        description: '',
        price: 4.99,
        imageUrl: '/images/fries.jpg'
      },
      {
        id: 83,
        name: 'Potato Wedges',
        description: '',
        price: 5.49,
        imageUrl: '/images/wedges.jpg'
      },
      {
        id: 84,
        name: 'Chicken Strips with Potato Wedges or Fries',
        description: '',
        price: 6.99,
        imageUrl: '/images/Chicken-strips.jpg'
      },
      {
        id: 85,
        name: 'Kids Pizza',
        description: 'Mozzarella cheese with pizza sauce.',
        price: 8.99,
        imageUrl: '/images/veg-platter.jpg'
      },
      {
        id: 86,
        name: 'Kids Veg Fried Rice',
        description: 'Basmati rice wok-fried with assorted vegetables.',
        price: 9.99,
        imageUrl: '/images/kids-veg-rice.jpg'
      },
      {
        id: 87,
        name: 'Kids Veg Chow Mein',
        description: 'Wok stir-fried noodles with fresh vegetables and aromatic spices.',
        price: 10.99,
        imageUrl: '/images/Kids-veg-chowmein.jpg'
      },
      {
        id: 88,
        name: 'Kids Chicken Fried Rice',
        description: 'Basmati rice wok-fried with chicken.',
        price: 10.99,
        imageUrl: '/images/kids-chicken-rice.jpg'
      },
      {
        id: 89,
        name: 'Kids Chicken Chow Mein',
        description: 'Wok stir-fried noodles with fresh vegetables and aromatic spices.',
        price: 11.99,
        imageUrl: '/images/Kids-chicken-chowmein.jpg'
      },
    ],
  },
  {
    id: 15,
    name: 'Desserts',
    items: [
      {
        id: 90,
        name: 'Lalmohan with Yogurt',
        description: '',
        price: 4.99,
        imageUrl: '/images/lalmohan.jpg'
      },
      {
        id: 91,
        name: 'Rasmalai with Shredded Coconut',
        description: '',
        price: 4.99,
        imageUrl: '/images/lalmohan.jpg'
      },
      {
        id: 92,
        name: 'Laddu',
        description: 'Spherical sweet from the Indian subcontinent made of various ingredients and sugar syrup.',
        price: 4.99,
        imageUrl: '/images/laddu.jpg'
      },
      {
        id: 93,
        name: 'Ice Cream',
        description: '(Choice of Vanilla or Chocolate) with Caramel syrup & shredded coconut on top.',
        price: 4.99,
        imageUrl: '/images/vanilla.jpg'
      },
    ],
  },
];

const reorderedCategories: MenuCategory[] = [
  menuCategories.find(c => c.name === 'Appetizers'),
  menuCategories.find(c => c.name === 'Soup & Salad'),
  menuCategories.find(c => c.name === 'Touch of Nepal'),
  menuCategories.find(c => c.name === 'Authentic Nepalese Momo'),
  menuCategories.find(c => c.name === 'Sushi Bar'),
  menuCategories.find(c => c.name === 'Wraps (Momo & Chowmein)'),
  menuCategories.find(c => c.name === 'Touch of India'),
  menuCategories.find(c => c.name === 'Student Menu'),
  menuCategories.find(c => c.name === 'Touch of Indo-China (Hearty Hakka)'),
  menuCategories.find(c => c.name === 'Kids Menu'),
  menuCategories.find(c => c.name === 'Side Orders'),
  menuCategories.find(c => c.name === 'Desserts'),
  menuCategories.find(c => c.name === 'Soft Drinks & Tea'),
].filter((c): c is MenuCategory => Boolean(c));

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [dietaryFilters, setDietaryFilters] = useState({
    vegetarian: false,
    spicy: false,
    glutenFree: false,
  });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc'>('name-asc');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

  // Flatten all menu items for filtering
  const allMenuItems = useMemo(() => {
    return reorderedCategories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.name
      }))
    );
  }, []);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    return allMenuItems
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
        
        const matchesDietary = (!dietaryFilters.vegetarian || item.isVegetarian) &&
                             (!dietaryFilters.spicy || item.isSpicy) &&
                             (!dietaryFilters.glutenFree || item.isGlutenFree);

        return matchesSearch && matchesPrice && matchesDietary;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [allMenuItems, searchQuery, priceRange, dietaryFilters, sortBy]);

  // Group filtered items by category, preserving the order in reorderedCategories
  const filteredCategories = useMemo(() => {
    return reorderedCategories
      .map((category) => ({
        id: category.id,
        name: category.name,
        items: filteredItems.filter(item => item.category === category.name)
      }))
      .filter(category => category.items.length > 0);
  }, [filteredItems, reorderedCategories]);

  // useEffect block here
  useEffect(() => {
    const isDefault =
      !searchQuery &&
      priceRange[0] === 0 && priceRange[1] === 50 &&
      !dietaryFilters.vegetarian &&
      !dietaryFilters.spicy &&
      !dietaryFilters.glutenFree &&
      sortBy === 'name-asc';
    if (isDefault) {
      setExpandedCategories([1]);
    } else {
      setExpandedCategories(filteredCategories.map(category => category.id));
    }
  }, [searchQuery, priceRange, dietaryFilters, sortBy, filteredCategories]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-screen-xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-normal mb-6 text-[#2C1810] font-baskerville">Our Menu</h1>
          <div className="w-24 h-1 bg-[#D4A373] mx-auto mb-8"></div>
          <p className="text-lg text-[#5C4033] max-w-2xl mx-auto font-geist">
            Experience the authentic flavors of Nepal and India, alongside our fresh Sushi selections. 
            Each dish is crafted with care using traditional recipes and locally-sourced ingredients.
          </p>
        </div>
        
        {/* Filters Section */}
        <div className="mb-12 w-full">
          <div className="flex flex-col md:flex-row gap-4 md:gap-3 bg-white/30 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg w-full" style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            {/* Row 1 on Mobile / Left section on Desktop */}
            <div className="flex flex-col sm:flex-row gap-3 md:flex-1">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white/70 text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all duration-300 shadow-none border-none text-sm"
                />
                <svg
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C4033]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Dietary Filters - Only on Mobile Row 1 */}
              <div className="flex gap-2 sm:hidden">
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.vegetarian ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                  }`}
                >
                  Veg
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, spicy: !prev.spicy }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.spicy ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                  }`}
                >
                  Spicy
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, glutenFree: !prev.glutenFree }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none flex-1 ${
                    dietaryFilters.glutenFree ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  GF
                </button>
              </div>
            </div>
            
            {/* Row 2 on Mobile / Right section on Desktop */}
            <div className="flex gap-3 md:flex-1 md:justify-end items-center">
              {/* Dietary Filters - Only on Desktop */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, vegetarian: !prev.vegetarian }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.vegetarian ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
                  }`}
                >
              Vegetarian
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, spicy: !prev.spicy }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.spicy ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700'
                  }`}
                >
              Spicy
                </button>
                <button
                  onClick={() => setDietaryFilters(prev => ({ ...prev, glutenFree: !prev.glutenFree }))}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 shadow-none border-none ${
                    dietaryFilters.glutenFree ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'
                  }`}
                >
              Gluten Free
                </button>
              </div>
              
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 rounded-lg text-xs font-medium bg-white/70 text-[#2C1810] focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all duration-300 shadow-none border-none"
                style={{ minWidth: 130 }}
              >
                <option value="name-asc">Sort: A-Z</option>
                <option value="price-asc">Price: Low-High</option>
                <option value="price-desc">Price: High-Low</option>
              </select>

              {/* Price Range Slider */}
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-medium text-[#2C1810]">
                  ${priceRange[0]}-${priceRange[1]}
            </span>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-[#D4A373]/30 rounded-lg appearance-none cursor-pointer border-none"
                />
              </div>
            </div>
          </div>
        </div>
      
        {/* Menu Categories */}
        {filteredCategories.map((category) => (
          <section key={category.id} className="mb-4">
            <div 
              className="flex items-center justify-between py-6 px-4 bg-white/40 backdrop-blur-sm rounded-xl cursor-pointer border border-[#D4A373]/10 transition-all duration-300 hover:bg-white/50"
              onClick={() => toggleCategory(category.id)}
            >
              <h2 className="text-2xl font-normal text-[#2C1810] font-baskerville">
                {category.name}
                <span className="text-[#D4A373] ml-2 text-base">
                  ({category.items.length} items)
                </span>
              </h2>
              <div className="flex items-center gap-3">
                <svg 
                  className={`w-6 h-6 text-[#D4A373] transition-transform duration-300 ${expandedCategories.includes(category.id) ? 'transform rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <div 
              className={`grid grid-cols-1 md:grid-cols-4 gap-8 mt-6 transition-all duration-500 overflow-hidden ${
                expandedCategories.includes(category.id) 
                  ? 'max-h-[5000px] opacity-100' 
                  : 'max-h-0 opacity-0 hidden'
              }`}
            >
              {category.items.map((item) => (
                <MenuCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={`$${item.price.toFixed(2)}`}
                  isVegetarian={item.isVegetarian}
                  isSpicy={item.isSpicy}
                  isGlutenFree={item.isGlutenFree}
                  image={item.imageUrl}
                  className="text-sm"
                />
              ))}
            </div>
          </section>
        ))}
        
        {/* Allergy Information */}
        <div className="mt-16 p-8 bg-white rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-normal mb-4 text-amber-900 font-baskerville">Allergy Information</h2>
            <p className="text-gray-700 font-geist">
            We take food allergies seriously. Our menu items may contain or come into contact with wheat, eggs, nuts, and milk. 
            Please inform our staff about any allergies or dietary restrictions before ordering.
          </p>
          <div className="mt-4">
              <a href="#" className="text-amber-700 font-normal hover:text-amber-500 transition-colors font-geist">
              Contact us for special dietary requests →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Order Now Button */}
      <div className="text-center py-12 pb-24">
        <motion.a
          href="https://app.kash4meexpress.com/everestcuisine/ec/book"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 bg-everest-green text-white rounded-full text-lg font-medium hover:bg-everest-gold hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Order Now
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.a>
        </div>
        
      {/* Remember Us Banner */}
      <div className="relative">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/rem-bg.jpg"
            alt="Remember Us For Background"
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/95 backdrop-blur-sm"></div>
          </div>
          
        <div className="relative z-10 py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Remember Us For</h2>
              <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
              <p className="text-white/95 font-sans max-w-2xl mx-auto text-lg">
                We offer more than just dining - explore our additional services
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Catering</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Event Services</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Frozen Mo:Mo</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Nepali Spices</span>
            </div>
            
            <div className="flex flex-col items-center text-center group">
                <div className="bg-white/10 rounded-full p-4 mb-4 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/20">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
                </div>
                <span className="font-sans text-white font-medium text-lg">Nepali Souvenirs</span>
            </div>
          </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 text-center"
            >
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call us at 613-963-4406 for catering or event inquiries
              </span>
            </motion.div>
              </div>
        </div>
      </div>
    </div>
  );
} 