import { type SchemaTypeDefinition } from 'sanity'

import author from './author'
import blogPost from './blogPost'
import category from './category'
import menuCategory from './menuCategory'
import menuItem from './menuItem'
import siteSettings from './siteSettings'
import tableBooking from './tableBooking'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, blogPost, category, menuCategory, menuItem, siteSettings, tableBooking],
}
