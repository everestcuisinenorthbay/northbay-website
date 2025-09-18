import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isVegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isSpicy',
      title: 'Spicy',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isGlutenFree',
      title: 'Gluten Free',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'availableInNorthBay',
      title: '📍 North Bay Location', 
      type: 'boolean',
      initialValue: true,
      description: 'Check = Available at North Bay location. Uncheck = Not available at North Bay.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'image',
    },
    prepare(selection: { title: string; subtitle?: string; media?: any }) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
        media: selection.media,
      }
    },
  },
}) 