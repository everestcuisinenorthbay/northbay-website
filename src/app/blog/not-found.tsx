import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-gray-900 mb-4">
          Post Not Found
        </h1>
        <div className="w-24 h-1 bg-everest-gold mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          The blog post you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-everest-green hover:bg-everest-green/90 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
} 