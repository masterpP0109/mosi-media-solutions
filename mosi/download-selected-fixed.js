// Selective download script for Mosi images
// Run this script to download specific categories
// Usage: node download-selected-fixed.js [category] [limit]

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load categories from metadata file
const categories = JSON.parse(fs.readFileSync(path.join(__dirname, 'mosi-images-categories.json'), 'utf8'));

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(filename)}`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

async function downloadCategory(categoryName, limit = null) {
  const category = categories[categoryName];
  if (!category) {
    console.error(`❌ Category '${categoryName}' not found`);
    console.log('Available categories:', Object.keys(categories));
    return;
  }
  
  const images = limit ? category.slice(0, limit) : category;
  console.log(`📦 Downloading ${images.length} images from '${categoryName}' category...`);
  
  const downloadDir = path.join(__dirname, categoryName);
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  
  for (const image of images) {
    try {
      const filename = path.join(downloadDir, `${image.public_id.replace(/\//g, '_')}.${image.format}`);
      await downloadImage(image.url, filename);
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ Failed to download ${image.public_id}:`, error.message);
    }
  }
  
  console.log(`✅ Completed downloading ${categoryName} category`);
}

// Command line usage
const [category, limit] = process.argv.slice(2);
const downloadLimit = limit ? parseInt(limit) : null;

if (category) {
  downloadCategory(category, downloadLimit);
} else {
  console.log('Usage: node download-selected-fixed.js [category] [limit]');
  console.log('Available categories:', Object.keys(categories));
}
