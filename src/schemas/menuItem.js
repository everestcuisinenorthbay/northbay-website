export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the menu item',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the menu item'
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the menu item',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Image of the menu item'
    },
    {
      name: 'isVegetarian',
      title: 'Is Vegetarian',
      type: 'boolean',
      description: 'Mark as vegetarian dish',
      initialValue: false
    },
    {
      name: 'isSpicy',
      title: 'Is Spicy',
      type: 'boolean',
      description: 'Mark as spicy dish',
      initialValue: false
    },
    {
      name: 'isGlutenFree',
      title: 'Is Gluten Free',
      type: 'boolean',
      description: 'Mark as gluten free dish',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      description: 'The category this menu item belongs to',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `$${subtitle.toFixed(2)}`,
        media
      };
    }
  }
} 