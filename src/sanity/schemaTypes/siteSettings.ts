import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewCount',
      title: 'Review Count',
      type: 'string',
      description: 'Number of Google reviews (e.g., "900+")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating',
      type: 'number',
      description: 'Average star rating (0-5)',
      validation: Rule => Rule.required().min(0).max(5),
    }),
    defineField({
      name: 'ratingSource',
      title: 'Rating Source',
      type: 'string',
      description: 'Where the rating comes from (e.g., "Google Reviews")',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Main title on homepage hero section',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      description: 'Subtitle text under hero title',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'reviewCount',
      subtitle: 'rating',
    },
    prepare(selection: { title: string; subtitle?: number }) {
      return {
        title: `${selection.title} Reviews`,
        subtitle: selection.subtitle ? `${selection.subtitle} stars` : undefined,
      }
    },
  },
}) 