# Setting Up Sanity.io for Everest Cuisine

This guide will help you set up Sanity.io to manage your menu content.

## Initial Setup

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Install the Sanity CLI globally:
   ```
   npm install -g @sanity/cli
   ```
3. Initialize a new Sanity project in a separate directory:
   ```
   mkdir everest-sanity
   cd everest-sanity
   sanity init
   ```
   - Choose "Create new project"
   - Enter a project name (e.g., "Everest Cuisine")
   - Use the default dataset configuration
   - Select "Clean project with no predefined schemas"

## Configure Your Project

1. Copy the schema files from `src/schemas` in your Next.js project to the `schemas` folder in your Sanity project.
2. Update your `schema.js` file in the Sanity project to import these schema types:
   ```javascript
   import { schemaTypes } from './schemas'
   
   export default createSchema({
     name: 'default',
     types: schemaTypes,
   })
   ```
3. Start the Sanity Studio:
   ```
   npm run dev
   ```

## Deploy Sanity Studio

1. Deploy your Sanity Studio to make it accessible online:
   ```
   sanity deploy
   ```
2. Choose a hostname for your studio (e.g., everest-cuisine)

## Create Content

1. Go to your deployed Sanity Studio
2. Create menu categories first
3. Create menu items and assign them to the appropriate categories

## Connect to Your Next.js Application

1. Find your Project ID in the Sanity management console under "API"
2. Update the `.env.local` file in your Next.js project with the Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
   ```

## Migrating Your Existing Menu Data

To migrate your existing menu data to Sanity, you can:

1. Create a script that transforms your current menu data structure to match the Sanity schema
2. Use the Sanity CLI to import the data:
   ```
   sanity dataset import ./your-data-file.ndjson production
   ```

## Data Migration Example

Here's an example script to transform your existing menu data to a Sanity-compatible format:

```javascript
// Create this as a script in your Sanity project
// Run it with Node.js to generate the import file

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Load your existing menu data (adjust the path as needed)
const menuData = require('./existing-menu-data.json');

// Arrays to store the transformed data
const menuItems = [];
const menuCategories = [];

// Process each category
menuData.forEach((category, categoryIndex) => {
  const categoryId = `category-${uuidv4()}`;
  
  // Create category document
  menuCategories.push({
    _id: categoryId,
    _type: 'menuCategory',
    name: category.name,
    order: categoryIndex + 1,
    menuItems: []
  });
  
  // Process items in this category
  category.items.forEach(item => {
    const itemId = `menuItem-${uuidv4()}`;
    
    // Create menu item document
    menuItems.push({
      _id: itemId,
      _type: 'menuItem',
      name: item.name,
      description: item.description || '',
      price: item.price,
      isVegetarian: !!item.isVegetarian,
      isSpicy: !!item.isSpicy,
      isGlutenFree: !!item.isGlutenFree
    });
    
    // Add reference to the category's menuItems array
    menuCategories[menuCategories.length - 1].menuItems.push({
      _key: uuidv4(),
      _ref: itemId,
      _type: 'reference'
    });
  });
});

// Combine all documents
const allDocuments = [...menuItems, ...menuCategories];

// Convert to NDJSON (one JSON object per line)
const ndjson = allDocuments.map(doc => JSON.stringify(doc)).join('\n');

// Write to file
fs.writeFileSync('sanity-import.ndjson', ndjson);
console.log('Import file created: sanity-import.ndjson');
```

After generating the import file, use the Sanity CLI to import it:

```
sanity dataset import sanity-import.ndjson production
```

## Image Migration

For images, you'll need to:

1. Upload your images to Sanity's asset store
2. Update the references in your menu items

You may want to use the Sanity Management API for this process, or manually upload images through the Sanity Studio interface. 