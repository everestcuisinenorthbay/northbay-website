// Force dynamic rendering to ensure fresh content
export const dynamic = 'force-dynamic';

import { sanityPublicClient } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import PortableText from '@/components/ui/PortableText';
import { notFound } from 'next/navigation';

interface Author {
  name: string;
  image?: any;
  role?: string;
  bio?: any[];
  social?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

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
  author: Author;
  body: any[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: any;
  };
}

// Define params as a Promise type to match Next.js 15 expectations
type PageParams = Promise<{ slug: string }>;

// Fetch a single blog post by slug
async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const query = `
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author->{
          name,
          image,
          role,
          bio,
          social
        },
        mainImage,
        categories[]->{
          _id,
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

    return await sanityPublicClient.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Get related blog posts
async function getRelatedBlogPosts(currentPostId: string, categorySlugs: string[], limit = 3) {
  try {
    const query = `
      *[_type == "blogPost" && _id != $currentPostId && count((categories[]->slug.current)[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0..${limit-1}] {
        _id,
        title,
        slug,
        author->{
          name,
          image
        },
        mainImage,
        publishedAt,
        excerpt
      }
    `;

    return await sanityPublicClient.fetch(query, { currentPostId, categorySlugs });
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  // Await the params promise to get the actual slug
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Everest Cuisine',
    };
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      images: post.seo?.ogImage ? [urlFor(post.seo.ogImage).url()] : (post.mainImage ? [urlFor(post.mainImage).url()] : []),
    },
  };
}

export default async function BlogPostPage({ params }: { params: PageParams }) {
  // Await the params promise to get the actual slug
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  let relatedPosts = [];
  try {
    if (post.categories && post.categories.length > 0) {
      relatedPosts = await getRelatedBlogPosts(
        post._id, 
        post.categories.map(cat => cat.slug.current)
      );
    }
  } catch (error) {
    console.error("Error fetching related posts:", error);
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0]">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          {post.mainImage ? (
          <Image 
            src={urlFor(post.mainImage).url()} 
            alt={post.title} 
            fill 
            className="object-cover"
            priority
          />
          ) : (
            <Image 
              src="/spices.jpg" 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e1a]/95 to-everest-green/90"></div>
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          {post.categories && post.categories.length > 0 && (
          <div className="flex gap-2 mb-4">
            {post.categories.map((category) => (
              <span
                  key={category._id}
                className="px-3 py-1 text-sm font-medium rounded-full"
                  style={{ 
                    backgroundColor: category.color ? `${category.color}20` : '#f0f0f0',
                    color: category.color || '#ffffff'
                  }}
              >
                {category.title}
              </span>
            ))}
          </div>
          )}
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 max-w-4xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-white/90">
            {post.author && post.author.image ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-xl font-medium">
                  {post.author?.name?.charAt(0) || 'A'}
                </span>
              </div>
            )}
            <div className="text-left">
              <p className="font-medium">{post.author?.name || 'Author'}</p>
              <p className="text-sm">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <PortableText value={post.body} />
        </div>

        {/* Author Bio */}
        {post.author && post.author.bio && (
          <div className="mt-16 p-8 bg-white rounded-xl">
            <div className="flex items-start gap-6">
              {post.author.image ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={urlFor(post.author.image).url()}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-500 text-2xl font-medium">
                    {post.author.name?.charAt(0) || 'A'}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">
                  About {post.author.name}
                </h3>
                {post.author.role && (
                  <p className="text-everest-green font-medium mb-4">{post.author.role}</p>
                )}
                <div className="prose prose-sm">
                  <PortableText value={post.author.bio} />
                </div>
                {post.author.social && (
                  <div className="flex gap-4 mt-4">
                    {post.author.social.twitter && (
                      <a
                        href={post.author.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-everest-green"
                      >
                        Twitter
                      </a>
                    )}
                    {post.author.social.facebook && (
                      <a
                        href={post.author.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-everest-green"
                      >
                        Facebook
                      </a>
                    )}
                    {post.author.social.instagram && (
                      <a
                        href={post.author.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-everest-green"
                      >
                        Instagram
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-serif text-gray-900 mb-8">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost: BlogPost) => (
                <article
                  key={relatedPost._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/blog/${relatedPost.slug.current}`}>
                    <div className="relative aspect-[16/9]">
                      {relatedPost.mainImage ? (
                      <Image
                        src={urlFor(relatedPost.mainImage).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                      ) : (
                        <Image
                          src="/placeholder-image.svg"
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center gap-3">
                        {relatedPost.author && relatedPost.author.image ? (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden">
                            <Image
                              src={urlFor(relatedPost.author.image).url()}
                              alt={relatedPost.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                              {relatedPost.author?.name?.charAt(0) || 'A'}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {relatedPost.author?.name || 'Author'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(relatedPost.publishedAt).toLocaleDateString('en-US', {
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
          </div>
        )}
      </div>
    </div>
  );
} 