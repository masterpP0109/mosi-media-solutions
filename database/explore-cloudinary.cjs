const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: 'dost3tvtf',
  api_key: '773687172868283',
  api_secret: 'zzkx-ob1Mmcu0z5LeymAWa9-OGY'
});

async function exploreAllFolders() {
  let allResources = [];
  let nextCursor = null;
  let totalFetched = 0;

  console.log("🔍 Exploring all Cloudinary resources...");
  console.log("📊 Cloud Name:", cloudinary.config().cloud_name);

  try {
    do {
      // Fetch all resources without folder filter
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
      
      nextCursor = result.next_cursor;
      console.log(`📦 Fetched ${totalFetched} total resources so far...`);

      if (nextCursor) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

    } while (nextCursor);

    console.log("✅ Exploration Complete!");
    console.log(`📈 Total resources found: ${allResources.length}`);
    
    return allResources;

  } catch (error) {
    console.error("❌ Error during exploration:", error);
    throw error;
  }
}

function analyzeFolders(resources) {
  const folderStats = {};
  const rootFiles = [];
  
  resources.forEach(resource => {
    const parts = resource.public_id.split('/');
    
    if (parts.length > 1) {
      const folder = parts[0];
      if (!folderStats[folder]) {
        folderStats[folder] = [];
      }
      folderStats[folder].push(resource);
    } else {
      rootFiles.push(resource);
    }
  });
  
  console.log('\n📂 Folder Analysis:');
  console.log(`📁 Root files: ${rootFiles.length}`);
  
  Object.entries(folderStats).forEach(([folder, files]) => {
    console.log(`📁 ${folder}/: ${files.length} files`);
    
    // Show first few files in each folder
    files.slice(0, 3).forEach((file, index) => {
      console.log(`   ${index + 1}. ${file.public_id}`);
    });
    
    if (files.length > 3) {
      console.log(`   ... and ${files.length - 3} more files`);
    }
    console.log('');
  });
  
  return { folderStats, rootFiles };
}

function searchForMmsRelated(resources) {
  console.log('🔍 Searching for MMS-related resources...');
  
  const mmsRelated = resources.filter(resource => 
    resource.public_id.toLowerCase().includes('mms') ||
    resource.folder?.toLowerCase().includes('mms') ||
    resource.public_id.toLowerCase().includes('mosi') ||
    resource.public_id.toLowerCase().includes('media')
  );
  
  console.log(`📋 Found ${mmsRelated.length} MMS-related resources:`);
  mmsRelated.forEach((resource, index) => {
    console.log(`  ${index + 1}. ${resource.public_id}`);
    console.log(`     URL: ${resource.url}`);
    console.log(`     Folder: ${resource.folder}`);
    console.log('');
  });
  
  return mmsRelated;
}

function exportToJSON(data, filename) {
  const fs = require('fs');
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`💾 Data exported to ${filename}`);
}

async function main() {
  try {
    // Step 1: Explore all resources
    const allResources = await exploreAllFolders();
    
    // Step 2: Export all resources
    exportToJSON(allResources, 'all-cloudinary-resources.json');
    
    // Step 3: Analyze folders
    const { folderStats, rootFiles } = analyzeFolders(allResources);
    
    // Step 4: Search for MMS-related content
    const mmsRelated = searchForMmsRelated(allResources);
    
    // Step 5: Export MMS-related if found
    if (mmsRelated.length > 0) {
      exportToJSON(mmsRelated, 'mms-related-images.json');
    }
    
    console.log('\n🎉 Exploration completed successfully!');
    console.log(`📊 Summary: ${allResources.length} total resources, ${Object.keys(folderStats).length} folders, ${rootFiles.length} root files`);
    
  } catch (error) {
    console.error('❌ Exploration failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  exploreAllFolders,
  analyzeFolders,
  searchForMmsRelated
};
