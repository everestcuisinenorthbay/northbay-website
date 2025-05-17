const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Path to your current menu data (from page.tsx)
const menuDataPath = path.join(__dirname, '..', 'src', 'app', 'menu', 'page.tsx');

// Read the existing menu data file
let fileContent = fs.readFileSync(menuDataPath, 'utf8');

// Extract the menu data from the file
// This is a very simple approach; you might want to use a TypeScript parser for more complex scenarios
const menuDataString = fileContent.match(/const menuCategories: MenuCategory\[] = \[([\s\S]*?)\];/)[1];
const reorderedCategoriesString = fileContent.match(/const reorderedCategories: MenuCategory\[] = \[([\s\S]*?)\].filter/)[1];

// Temporary JavaScript file to evaluate the extracted code
const tempJsFile = path.join(__dirname, 'temp-menu-data.js');

// Create a JavaScript module that we can require
fs.writeFileSync(tempJsFile, `
// Mock interfaces
class MenuItem {
  constructor(id, name, description, price, imageUrl, isVegetarian, isSpicy, isGlutenFree) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imageUrl = imageUrl;
    this.isVegetarian = isVegetarian;
    this.isSpicy = isSpicy;
    this.isGlutenFree = isGlutenFree;
  }
}

class MenuCategory {
  constructor(id, name, items) {
    this.id = id;
    this.name = name;
    this.items = items;
  }
}

// Original menu data
const menuCategories = [${menuDataString}];

// Reordered categories
const reorderedCategories = [${reorderedCategoriesString}].filter((c) => Boolean(c));

module.exports = { menuCategories, reorderedCategories };
`);

// Import the data
const { menuCategories, reorderedCategories } = require('./temp-menu-data.js');

// Arrays to store the transformed data
const menuItems = [];
const menuCategories_sanity = [];

// Process each category in the reordered list to maintain correct order
reorderedCategories.forEach((category, categoryIndex) => {
  const categoryId = `category-${uuidv4()}`;
  
  // Create category document
  menuCategories_sanity.push({
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
    const menuItem = {
      _id: itemId,
      _type: 'menuItem',
      name: item.name,
      description: item.description || '',
      price: item.price,
      isVegetarian: !!item.isVegetarian,
      isSpicy: !!item.isSpicy,
      isGlutenFree: !!item.isGlutenFree
    };
    
    // Add image reference if available
    if (item.imageUrl) {
      // Note: In Sanity, you'll need to manually upload these images
      // and update references. This just notes the original URL.
      menuItem._originalImageUrl = item.imageUrl;
    }
    
    menuItems.push(menuItem);
    
    // Add reference to the category's menuItems array
    menuCategories_sanity[menuCategories_sanity.length - 1].menuItems.push({
      _key: uuidv4(),
      _ref: itemId,
      _type: 'reference'
    });
  });
});

// Combine all documents
const allDocuments = [...menuItems, ...menuCategories_sanity];

// Convert to NDJSON (one JSON object per line)
const ndjson = allDocuments.map(doc => JSON.stringify(doc)).join('\n');

// Create output directory if it doesn't exist
const outputDir = path.join(__dirname, 'output');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Write to file
const outputFile = path.join(outputDir, 'sanity-import.ndjson');
fs.writeFileSync(outputFile, ndjson);

// Also export a JSON file with image mappings for reference
const imageMap = menuItems
  .filter(item => item._originalImageUrl)
  .map(item => ({
    itemId: item._id,
    itemName: item.name,
    originalImageUrl: item._originalImageUrl
  }));

fs.writeFileSync(
  path.join(outputDir, 'image-mapping.json'),
  JSON.stringify(imageMap, null, 2)
);

// Clean up temp file
fs.unlinkSync(tempJsFile);

console.log(`Migration files created in ${outputDir}:`);
console.log(`1. sanity-import.ndjson - Import this to Sanity`);
console.log(`2. image-mapping.json - Use this to manually upload images`);
console.log('\nTo import into Sanity, run:');
console.log(`sanity dataset import ${outputFile} production`); 