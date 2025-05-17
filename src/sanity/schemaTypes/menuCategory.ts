import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'menuCategory',
  title: 'Menu Category',
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
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Order for sorting categories',
      validation: Rule => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare(selection: { title: string; subtitle?: string }) {
      return {
        title: selection.title,
        subtitle: selection.subtitle,
      }
    },
  },
}) 