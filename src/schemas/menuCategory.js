export default {
  name: 'menuCategory',
  title: 'Menu Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Category Name',
      type: 'string',
      description: 'Name of the menu category',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order to display category in menu (lower numbers first)',
      validation: Rule => Rule.required().integer()
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'menuItem' }] }],
      description: 'Menu items in this category'
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'order'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Display order: ${subtitle}`
      };
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
} 