const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dkdvqimxe',
  api_key: '862795549195125',
  api_secret: 'N-tO_-Gm24Q_GdZBgojSfj0w8r8'
});

// Create mosi folder if it doesn't exist
const mosiFolder = path.join(__dirname, '..', 'mosi');
if (!fs.existsSync(mosiFolder)) {
  fs.mkdirSync(mosiFolder, { recursive: true });
  console.log('📁 Created mosi folder');
}

async function extractMosiMetadata() {
  let allResources = [];
  let nextCursor = null;
  let totalFetched = 0;

  console.log("🚀 Starting Mosi Cloudinary metadata extraction...");
  console.log("📊 Cloud Name:", cloudinary.config().cloud_name);

  try {
    do {
      // Fetch all resources
      const result = await cloudinary.api.resources({
        type: 'upload',
        max_results: 500,
        next_cursor: nextCursor
      });

      // Process each resource
      const resources = result.resources.map(resource => ({
        public_id: resource.public_id,
        url: resource.secure_url,
        created_at: resource.created_at,
        format: resource.format,
        width: resource.width,
        height: resource.height,
        bytes: resource.bytes,
        folder: resource.folder || 'root',
        size_kb: Math.round(resource.bytes / 1024),
        size_mb: Math.round(resource.bytes / (1024 * 1024) * 100) / 100
      }));

      allResources.push(...resources);
      totalFetched += resources.length;
      
      console.log(`📦 Fetched ${totalFetched} images so far...`);
      
      // Check if there are more pages
      nextCursor = result.next_cursor;
      
      // Add delay to avoid rate limiting
      if (nextCursor) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } while (nextCursor);

    console.log("\n✅ Metadata Extraction Complete!");
    console.log(`📈 Total images found: ${allResources.length}`);
    
    // Calculate total size
    const totalBytes = allResources.reduce((sum, img) => sum + img.bytes, 0);
    const totalMB = Math.round(totalBytes / (1024 * 1024) * 100) / 100;
    console.log(`💾 Total size: ${totalMB} MB`);
    
    return allResources;

  } catch (error) {
    console.error("❌ Error during extraction:", error);
    throw error;
  }
}

function categorizeImages(resources) {
  const categories = {
    services: [],
    portfolio: [],
    team: [],
    gallery: [],
    products: [],
    events: [],
    other: []
  };
  
  resources.forEach(img => {
    const publicId = img.public_id.toLowerCase();
    
    if (publicId.includes('service') || publicId.includes('serv')) {
      categories.services.push(img);
    } else if (publicId.includes('portfolio') || publicId.includes('project') || publicId.includes('work')) {
      categories.portfolio.push(img);
    } else if (publicId.includes('team') || publicId.includes('member') || publicId.includes('staff')) {
      categories.team.push(img);
    } else if (publicId.includes('gallery') || publicId.includes('photo') || publicId.includes('image')) {
      categories.gallery.push(img);
    } else if (publicId.includes('product') || publicId.includes('item') || publicId.includes('carving') || publicId.includes('sculpture')) {
      categories.products.push(img);
    } else if (publicId.includes('event') || publicId.includes('conference') || publicId.includes('wedding')) {
      categories.events.push(img);
    } else {
      categories.other.push(img);
    }
  });
  
  console.log('\n📂 Image Categories:');
  Object.entries(categories).forEach(([category, images]) => {
    const totalSize = images.reduce((sum, img) => sum + img.bytes, 0);
    const totalMB = Math.round(totalSize / (1024 * 1024) * 100) / 100;
    console.log(`  ${category}: ${images.length} images (${totalMB} MB)`);
  });
  
  return categories;
}

function generateDownloadScript(categories) {
  console.log('\n📝 Generating selective download script...');
  
  const script = `// Selective download script for Mosi images
// Run this script to download specific categories
// Usage: node download-selected.js [category] [limit]

const https = require('https');
const fs = require('fs');
const path = require('path');

const categories = ${JSON.stringify(categories, null, 2)};

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(\`✅ Downloaded: \${filename}\`);
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
    console.error(\`❌ Category '\${categoryName}' not found\`);
    console.log('Available categories:', Object.keys(categories));
    return;
  }
  
  const images = limit ? category.slice(0, limit) : category;
  console.log(\`📦 Downloading \${images.length} images from '\${categoryName}' category...\`);
  
  const downloadDir = path.join(__dirname, 'mosi', categoryName);
  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir, { recursive: true });
  }
  
  for (const image of images) {
    try {
      const filename = path.join(downloadDir, \`\${image.public_id.replace(/\//g, '_')}.\${image.format}\`);
      await downloadImage(image.url, filename);
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(\`❌ Failed to download \${image.public_id}:\`, error.message);
    }
  }
  
  console.log(\`✅ Completed downloading \${categoryName} category\`);
}

// Command line usage
const [category, limit] = process.argv.slice(2);
const downloadLimit = limit ? parseInt(limit) : null;

if (category) {
  downloadCategory(category, downloadLimit);
} else {
  console.log('Usage: node download-selected.js [category] [limit]');
  console.log('Available categories:', Object.keys(categories));
}
`;
  
  fs.writeFileSync(path.join(mosiFolder, 'download-selected.js'), script);
  console.log(`💾 Download script saved to: ${path.join(mosiFolder, 'download-selected.js')}`);
}

function exportToJSON(data, filename) {
  const filePath = path.join(mosiFolder, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`💾 Data exported to ${filePath}`);
}

async function main() {
  try {
    // Step 1: Extract metadata
    const allResources = await extractMosiMetadata();
    
    // Step 2: Export complete metadata
    exportToJSON(allResources, 'mosi-images-metadata.json');
    
    // Step 3: Categorize images
    const categories = categorizeImages(allResources);
    
    // Step 4: Export categories
    exportToJSON(categories, 'mosi-images-categories.json');
    
    // Step 5: Generate download script
    generateDownloadScript(categories);
    
    console.log('\n🎉 Metadata extraction completed successfully!');
    console.log(`📁 All files saved to: ${mosiFolder}`);
    console.log('\n📋 Next steps:');
    console.log('1. Review the metadata in mosi-images-metadata.json');
    console.log('2. Check categorization in mosi-images-categories.json');
    console.log('3. Use download-selected.js to download specific categories');
    console.log('\n💡 Example usage:');
    console.log('   node mosi/download-selected.js products 10');
    console.log('   node mosi/download-selected.js services');
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  extractMosiMetadata,
  categorizeImages,
  generateDownloadScript
};
