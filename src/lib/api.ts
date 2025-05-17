import { sanityClient } from './sanity';
import { MenuCategory, MenuItem } from '@/types/sanity';
import { sendBookingNotificationToAdmin, sendBookingConfirmationEmail } from './notifications';

// Fetch all menu categories with their items
export async function getMenuCategories(): Promise<MenuCategory[]> {
  const query = `
    *[_type == "menuCategory"] | order(order asc) {
      _id,
      _type,
      name,
      order,
      "menuItems": *[_type == "menuItem" && references(^._id)] | order(name asc) {
        _id,
        _type,
        name,
        description,
        price,
        image,
        isVegetarian,
        isSpicy,
        isGlutenFree
      }
    }
  `;

  console.log('Executing query:', query);
  const result = await sanityClient.fetch(query);
  console.log('Query result:', result);
  return result;
}

// Fetch a flattened list of all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const query = `
    *[_type == "menuItem"] | order(name asc) {
      _id,
      _type,
      name,
      description,
      price,
      image,
      isVegetarian,
      isSpicy,
      isGlutenFree,
      "category": category->name
    }
  `;

  console.log('Executing query:', query);
  const result = await sanityClient.fetch(query);
  console.log('Query result:', result);
  return result;
}

// Submit a table booking
export async function submitTableBooking(booking: {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  partySize: number;
  occasion?: string;
  notes?: string;
}) {
  try {
    console.log("Starting booking submission process...");
    
    const doc = {
      _type: 'tableBooking',
      ...booking,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log("Booking document prepared:", doc);
    
    // Create the booking in Sanity
    console.log("Attempting to create booking in Sanity...");
    const createdBooking = await sanityClient.create(doc);
    console.log("Booking created successfully:", createdBooking);
    
    // Send notifications
    try {
      console.log("Sending booking notifications...");
      await sendBookingNotificationToAdmin({
        _id: createdBooking._id,
        ...booking
      });
      console.log("Notifications sent successfully");
    } catch (error) {
      // Don't fail the booking if notifications fail
      console.error('Failed to send notifications:', error);
    }
    
    return createdBooking;
  } catch (error) {
    console.error('Error in submitTableBooking:', error);
    throw error; // Re-throw to handle in UI
  }
}

// Get all bookings for a specific date
export async function getBookingsByDate(date: string) {
  const query = `
    *[_type == "tableBooking" && date == $date] | order(time asc) {
      _id,
      name,
      email,
      phone,
      date,
      time,
      partySize,
      occasion,
      notes,
      status,
      createdAt,
      updatedAt
    }
  `;

  return await sanityClient.fetch(query, { date });
}

// Update booking status
export async function updateBookingStatus(bookingId: string, status: 'pending' | 'confirmed' | 'cancelled' | 'completed') {
  // Update booking in Sanity
  const updatedBooking = await sanityClient
    .patch(bookingId)
    .set({ 
      status,
      updatedAt: new Date().toISOString()
    })
    .commit();
  
  // If booking is confirmed, send confirmation email to customer
  if (status === 'confirmed' && updatedBooking) {
    try {
      // Get the complete booking details
      const booking = await sanityClient.fetch(`*[_type == "tableBooking" && _id == $id][0]`, {
        id: bookingId
      });
      
      if (booking) {
        await sendBookingConfirmationEmail(booking.email, {
          name: booking.name,
          date: booking.date,
          time: booking.time,
          partySize: booking.partySize,
          occasion: booking.occasion
        });
      }
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Continue even if email sending fails
    }
  }
  
  return updatedBooking;
}

// Blog API Functions
export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    image?: {
      asset: {
        _ref: string;
      };
    };
    role?: string;
    bio?: any[];
    social?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
    };
  };
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  categories: Array<{
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    color: string;
  }>;
  publishedAt: string;
  excerpt: string;
  body: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: {
      asset: {
        _ref: string;
      };
    };
  };
}

// Get all blog posts with pagination
export async function getBlogPosts(page = 1, pageSize = 6): Promise<{
  posts: BlogPost[];
  total: number;
}> {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const query = `
    {
      "posts": *[_type == "blogPost"] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        author->{
          name,
          image,
          role
        },
        mainImage,
        categories[]->{
          title,
          slug,
          color
        },
        publishedAt,
        excerpt,
        body,
        seo
      },
      "total": count(*[_type == "blogPost"])
    }
  `;

  return await sanityClient.fetch(query, { start, end });
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  const query = `
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author->{
        name,
        image,
        role,
        bio
      },
      mainImage,
      categories[]->{
        title,
        slug,
        color
      },
      publishedAt,
      excerpt,
      body,
      seo
    }
  `;

  return await sanityClient.fetch(query, { slug });
}

// Get all blog categories
export async function getBlogCategories() {
  const query = `
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color
    }
  `;

  return await sanityClient.fetch(query);
}

// Get blog posts by category
export async function getBlogPostsByCategory(categorySlug: string, page = 1, pageSize = 6) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const query = `
    {
      "posts": *[_type == "blogPost" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        author->{
          name,
          image,
          role
        },
        mainImage,
        categories[]->{
          title,
          slug,
          color
        },
        publishedAt,
        excerpt,
        body,
        seo
      },
      "total": count(*[_type == "blogPost" && $categorySlug in categories[]->slug.current])
    }
  `;

  return await sanityClient.fetch(query, { categorySlug, start, end });
}

// Get related blog posts
export async function getRelatedBlogPosts(currentPostId: string, categorySlugs: string[], limit = 3) {
  const query = `
    *[_type == "blogPost" && _id != $currentPostId && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0...$limit] {
      _id,
      title,
      slug,
      author->{
        name,
        image,
        role
      },
      mainImage,
      categories[]->{
        title,
        slug,
        color
      },
      publishedAt,
      excerpt
    }
  `;

  return await sanityClient.fetch(query, { currentPostId, categorySlugs, limit });
} 