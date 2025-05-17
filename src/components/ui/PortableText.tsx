import { PortableText as BasePortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative my-8 aspect-video">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Blog post image'}
            fill
            className="object-cover rounded-lg"
          />
          {value.alt && (
            <figcaption className="text-sm text-gray-500 mt-2 text-center">
              {value.alt}
            </figcaption>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-everest-green hover:text-everest-gold underline transition-colors"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-serif text-gray-900 mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-serif text-gray-900 mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-serif text-gray-900 mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-serif text-gray-900 mt-6 mb-3">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-everest-green pl-4 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">{children}</ol>
    ),
  },
};

export default function PortableText({ value }: { value: any[] }) {
  return <BasePortableText value={value} components={components} />;
} 