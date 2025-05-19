import { sanityPublicClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Everest Cuisine',
  description: 'Discover the latest news, recipes, and stories from Everest Cuisine.',
};

export const dynamic = 'force-dynamic';

// Simple types for blog content
interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  color: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  excerpt: string;
  publishedAt: string;
  categories: Category[];
  author: {
    name: string;
    image?: any;
  };
}

// Simplified fetch functions
async function getBlogPosts(page = 1, pageSize = 6) {
  try {
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
            image
          },
          mainImage,
          categories[]->{
            _id,
            title,
            slug,
            color
          },
          publishedAt,
          excerpt
        },
        "total": count(*[_type == "blogPost"])
      }
    `;

    return await sanityPublicClient.fetch(query, { start, end });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return { posts: [], total: 0 };
  }
}

async function getBlogCategories() {
  try {
    const query = `
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        slug,
        color
      }
    `;

    return await sanityPublicClient.fetch(query);
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    return [];
  }
}

// Type definition for searchParams as a Promise in Next.js 15
type PageSearchParams = Promise<{ page?: string; category?: string }>;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  // Await the searchParams promise to get the actual values
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams.page;
  const page = Number(pageParam) || 1;
  
  // Wrap data fetching in try/catch to handle errors gracefully
  let posts: BlogPost[] = [];
  let categories: Category[] = [];
  let total = 0;
  
  try {
    // Fetch posts and categories
    const blogData = await getBlogPosts(page);
    posts = blogData.posts || [];
    total = blogData.total || 0;
    categories = await getBlogCategories();
  } catch (error) {
    console.error("Error in blog page:", error);
    // Continue with empty data rather than crashing
  }

  const totalPages = Math.ceil(total / 6);

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/spices.jpg" 
            alt="Blog Hero" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/90"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
            Our Blog
          </h1>
          <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
          <p className="text-lg text-white/90 max-w-2xl mx-auto font-sans">
            Discover the latest news, recipes, and stories from Everest Cuisine
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/blog"
            className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-everest-green text-white"
          >
            All Posts
          </Link>
          {categories.map((cat: Category) => (
            <Link
              key={cat._id}
              href={`/blog?category=${cat.slug.current}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors bg-white/50 text-gray-700 hover:bg-white/70"
              style={{
                backgroundColor: cat.color ? `${cat.color}20` : undefined,
                color: cat.color || '#333',
              }}
            >
              {cat.title}
            </Link>
          ))}
        </div>

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: BlogPost) => (
              <article
                key={post._id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="relative aspect-[16/9]">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/placeholder-image.svg"
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.categories && post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="px-2 py-1 text-xs font-medium rounded-full"
                          style={{ 
                            backgroundColor: category.color ? `${category.color}20` : '#f0f0f0', 
                            color: category.color || '#333' 
                          }}
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-serif text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      {post.author && post.author.image ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={urlFor(post.author.image).url()}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">
                            {post.author?.name?.charAt(0) || 'A'}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {post.author?.name || 'Author'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-serif text-gray-800 mb-4">No blog posts found</h2>
            <p className="text-gray-600">
              There might be an issue connecting to our content management system.
              <br />
              Please check back later or contact us if the problem persists.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/blog?page=${pageNum}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pageNum === page
                    ? 'bg-everest-green text-white'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                {pageNum}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 