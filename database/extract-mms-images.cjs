const cloudinary = require('cloudinary').v2;
const { createClient } = require('@supabase/supabase-js');

// 1. Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dost3tvtf',
  api_key: '773687172868283',
  api_secret: 'zzkx-ob1Mmcu0z5LeymAWa9-OGY'
});

// 2. Supabase Configuration
const supabase = createClient(
  'https://qcdlsodvptkbpuwjqnqd.supabase.co',
  'sb_publishable_DGa7JGTI1p6V_N37p3MhAA_8Cx9mDfT'
);

async function extractMmsImages() {
  let allUrls = [];
  let nextCursor = null;
  let totalFetched = 0;

  console.log("🚀 Starting Cloudinary image extraction from 'mms' folder...");
  console.log("📊 Cloud Name:", cloudinary.config().cloud_name);

  try {
    do {
      // Fetch resources with pagination, filtering for 'mms' folder
      const result = await cloudinary.api.resources({
        type: 'upload',
        prefix: 'mms/',          // Only fetch from 'mms' folder
        max_results: 500,        // Max allowed per request
        next_cursor: nextCursor
      });

      // Process each resource
      const urls = result.resources.map(resource => ({
        public_id: resource.public_id,
        url: resource.secure_url,
        created_at: resource.created_at,
        format: resource.format,
        width: resource.width,
        height: resource.height,
        bytes: resource.bytes,
        folder: resource.folder || 'root'
      }));

      allUrls.push(...urls);
      totalFetched += urls.length;
      
      // Check if there are more pages
      nextCursor = result.next_cursor;
      console.log(`📦 Fetched ${totalFetched} images from 'mms' folder so far...`);

      // Add delay to avoid rate limiting
      if (nextCursor) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } while (nextCursor);

    console.log("✅ Extraction Complete!");
    console.log(`📈 Total images extracted from 'mms' folder: ${allUrls.length}`);
    
    return allUrls;

  } catch (error) {
    console.error("❌ Error during extraction:", error);
    throw error;
  }
}

// Function to search for specific image IDs within mms folder
function searchByImageId(imageUrls, searchTerm) {
  const matches = imageUrls.filter(img => 
    img.public_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    img.url.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log(`🔍 Searching for "${searchTerm}" in mms folder:`);
  console.log(`📋 Found ${matches.length} matches:`);
  
  matches.forEach((match, index) => {
    console.log(`  ${index + 1}. ${match.public_id}`);
    console.log(`     URL: ${match.url}`);
    console.log(`     Created: ${match.created_at}`);
    console.log(`     Size: ${match.width}x${match.height}`);
    console.log('');
  });
  
  return matches;
}

// Function to update products in Supabase with mms images
async function updateProductsWithMmsImages(imageUrls) {
  console.log("🔄 Starting product image mapping with mms images...");
  
  try {
    // Get all products from Supabase
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, slug, images, seller_id');
    
    if (error) {
      console.error('❌ Error fetching products:', error);
      throw error;
    }
    
    console.log(`📦 Found ${products.length} products in database`);
    
    let updatedCount = 0;
    let notFoundCount = 0;
    
    for (const product of products) {
      // Try to find matching mms images for this product
      const productSlug = product.slug.toLowerCase();
      const productName = product.name.toLowerCase();
      
      // Search strategies for mms folder
      let matchedImages = [];
      
      // 1. Try matching by slug with mms prefix
      matchedImages = imageUrls.filter(img => 
        img.public_id.toLowerCase().includes(`mms/${productSlug}`) ||
        img.public_id.toLowerCase().includes(`mms/${productSlug.replace(/-/g, '_')}`)
      );
      
      // 2. Try matching by name if no slug matches
      if (matchedImages.length === 0) {
        matchedImages = imageUrls.filter(img => 
          img.public_id.toLowerCase().includes(`mms/${productName}`) ||
          img.public_id.toLowerCase().includes(`mms/${productName.replace(/\s+/g, '_')}`)
        );
      }
      
      // 3. Try matching by product ID
      if (matchedImages.length === 0) {
        const productId = product.id.split('-')[0]; // Get UUID prefix
        matchedImages = imageUrls.filter(img => 
          img.public_id.toLowerCase().includes(`mms/${productId}`)
        );
      }
      
      // 4. Try fuzzy matching without mms prefix (in case images are directly in mms folder)
      if (matchedImages.length === 0) {
        matchedImages = imageUrls.filter(img => 
          img.public_id.toLowerCase().includes(productSlug) ||
          img.public_id.toLowerCase().includes(productName) ||
          img.public_id.toLowerCase().includes(productId)
        );
      }
      
      if (matchedImages.length > 0) {
        // Take first 5 images max
        const imageUrls = matchedImages.slice(0, 5).map(img => img.url);
        
        // Update product with new images
        const { error: updateError } = await supabase
          .from('products')
          .update({ images: imageUrls })
          .eq('id', product.id);
        
        if (updateError) {
          console.error(`❌ Error updating product ${product.name}:`, updateError);
        } else {
          console.log(`✅ Updated product: ${product.name} with ${imageUrls.length} mms images`);
          updatedCount++;
        }
      } else {
        console.log(`⚠️  No mms images found for product: ${product.name}`);
        notFoundCount++;
      }
    }
    
    console.log(`\n📊 Update Summary:`);
    console.log(`✅ Successfully updated: ${updatedCount} products`);
    console.log(`⚠️  No mms images found: ${notFoundCount} products`);
    console.log(`📈 Total processed: ${products.length} products`);
    
  } catch (error) {
    console.error('❌ Error updating products:', error);
    throw error;
  }
}

// Function to export data to JSON file
function exportToJSON(data, filename) {
  const fs = require('fs');
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`💾 Data exported to ${filename}`);
}

// Function to categorize images by type
function categorizeImages(imageUrls) {
  const categories = {
    services: [],
    portfolio: [],
    team: [],
    gallery: [],
    other: []
  };
  
  imageUrls.forEach(img => {
    const publicId = img.public_id.toLowerCase();
    
    if (publicId.includes('service') || publicId.includes('serv')) {
      categories.services.push(img);
    } else if (publicId.includes('portfolio') || publicId.includes('project')) {
      categories.portfolio.push(img);
    } else if (publicId.includes('team') || publicId.includes('member')) {
      categories.team.push(img);
    } else if (publicId.includes('gallery') || publicId.includes('photo')) {
      categories.gallery.push(img);
    } else {
      categories.other.push(img);
    }
  });
  
  console.log('\n📂 Image Categories:');
  Object.entries(categories).forEach(([category, images]) => {
    console.log(`  ${category}: ${images.length} images`);
  });
  
  return categories;
}

// Main execution function
async function main() {
  try {
    // Step 1: Extract only mms folder images
    const imageUrls = await extractMmsImages();
    
    // Step 2: Export raw data
    exportToJSON(imageUrls, 'mms-images.json');
    
    // Step 3: Categorize images
    const categories = categorizeImages(imageUrls);
    
    // Step 4: Search examples (you can modify these)
    console.log('\n🔍 Example Searches in mms folder:');
    searchByImageId(imageUrls, 'service');
    searchByImageId(imageUrls, 'portfolio');
    searchByImageId(imageUrls, 'team');
    
    // Step 5: Update products in database with mms images
    await updateProductsWithMmsImages(imageUrls);
    
    console.log('\n🎉 All mms image tasks completed successfully!');
    
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
  extractMmsImages,
  searchByImageId,
  updateProductsWithMmsImages,
  categorizeImages
};
