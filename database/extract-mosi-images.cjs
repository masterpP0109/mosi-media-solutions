const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Cloudinary Configuration with provided credentials
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

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const filePath = path.join(mosiFolder, filename);
    
    const file = fs.createWriteStream(filePath);
    
    protocol.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve(filePath);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete the partial file
      reject(err);
    });
  });
}

async function extractAndDownloadAllImages() {
  let allResources = [];
  let nextCursor = null;
  let totalFetched = 0;
  let downloadedCount = 0;

  console.log("🚀 Starting Cloudinary image extraction and download...");
  console.log("📊 Cloud Name:", cloudinary.config().cloud_name);
  console.log("📁 Download folder:", mosiFolder);

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
        folder: resource.folder || 'root'
      }));

      allResources.push(...resources);
      totalFetched += resources.length;
      
      console.log(`📦 Fetched ${totalFetched} images so far...`);
      
      // Download images
      for (const resource of resources) {
        try {
          // Create filename from public_id
          const filename = `${resource.public_id.replace(/\//g, '_')}.${resource.format}`;
          
          // Download the image
          await downloadImage(resource.url, filename);
          downloadedCount++;
          
          // Add small delay to avoid overwhelming the server
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`❌ Failed to download ${resource.public_id}:`, error.message);
        }
      }
      
      // Check if there are more pages
      nextCursor = result.next_cursor;
      
      // Add delay between API calls
      if (nextCursor) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } while (nextCursor);

    console.log("\n✅ Extraction and Download Complete!");
    console.log(`📈 Total images found: ${allResources.length}`);
    console.log(`💾 Successfully downloaded: ${downloadedCount} images`);
    console.log(`📁 Images saved to: ${mosiFolder}`);
    
    // Export metadata
    const metadataPath = path.join(mosiFolder, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(allResources, null, 2));
    console.log(`📄 Metadata saved to: ${metadataPath}`);
    
    return { total: allResources.length, downloaded: downloadedCount };

  } catch (error) {
    console.error("❌ Error during extraction:", error);
    throw error;
  }
}

// Function to categorize downloaded images
function organizeDownloadedImages() {
  console.log("\n📂 Organizing downloaded images...");
  
  try {
    const files = fs.readdirSync(mosiFolder);
    const imageFiles = files.filter(file => 
      !file.endsWith('.json') && 
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file)
    );
    
    console.log(`📋 Found ${imageFiles.length} image files to organize`);
    
    // Create subfolders
    const categories = ['services', 'portfolio', 'team', 'gallery', 'products', 'other'];
    categories.forEach(category => {
      const categoryPath = path.join(mosiFolder, category);
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath);
      }
    });
    
    let organizedCount = 0;
    
    imageFiles.forEach(file => {
      const filename = file.toLowerCase();
      let targetCategory = 'other';
      
      if (filename.includes('service') || filename.includes('serv')) {
        targetCategory = 'services';
      } else if (filename.includes('portfolio') || filename.includes('project')) {
        targetCategory = 'portfolio';
      } else if (filename.includes('team') || filename.includes('member')) {
        targetCategory = 'team';
      } else if (filename.includes('gallery') || filename.includes('photo')) {
        targetCategory = 'gallery';
      } else if (filename.includes('product') || filename.includes('item')) {
        targetCategory = 'products';
      }
      
      if (targetCategory !== 'other') {
        const oldPath = path.join(mosiFolder, file);
        const newPath = path.join(mosiFolder, targetCategory, file);
        
        try {
          fs.renameSync(oldPath, newPath);
          organizedCount++;
        } catch (error) {
          console.error(`❌ Failed to move ${file}:`, error.message);
        }
      }
    });
    
    console.log(`📁 Organized ${organizedCount} images into categories`);
    
  } catch (error) {
    console.error("❌ Error organizing images:", error);
  }
}

// Main execution function
async function main() {
  try {
    console.log("🎯 Starting Mosi Media Solutions image extraction...");
    
    // Step 1: Extract and download all images
    const result = await extractAndDownloadAllImages();
    
    // Step 2: Organize images into categories
    organizeDownloadedImages();
    
    console.log('\n🎉 All tasks completed successfully!');
    console.log(`📊 Final Summary:`);
    console.log(`   Total images found: ${result.total}`);
    console.log(`   Images downloaded: ${result.downloaded}`);
    console.log(`   Saved to: ${mosiFolder}`);
    
  } catch (error) {
    console.error('❌ Script failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  extractAndDownloadAllImages,
  organizeDownloadedImages
};
