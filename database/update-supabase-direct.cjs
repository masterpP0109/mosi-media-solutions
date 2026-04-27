// Direct Supabase update with Cloudinary image URLs
// This script uses the Supabase client directly to update tables

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://terzrbltzhtwiyronimk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnpyYmx0emh0d2l5cm9uaW1rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI0MjQ2MSwiZXhwIjoyMDkyODE4NDYxfQ.nssT0e0SPyJWvbhQbANQB0cIw-Wyg773gT68HBtMGAQ';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDatabase() {
    try {
        console.log('🚀 Starting direct Supabase update...');
        
        // 1. Create cloudinary_images table
        await createCloudinaryTable();
        
        // 2. Insert all Cloudinary images
        await insertAllCloudinaryImages();
        
        // 3. Update existing tables with image URLs
        await updateExistingTables();
        
        // 4. Verify the update
        await verifyUpdate();
        
        console.log('🎉 Database update completed successfully!');
        
    } catch (error) {
        console.error('❌ Database update failed:', error);
        process.exit(1);
    }
}

async function createCloudinaryTable() {
    console.log('🏗️  Creating cloudinary_images table...');
    
    // Use raw SQL through Supabase's REST API for table creation
    const { error } = await supabase
        .from('cloudinary_images')
        .select('id')
        .limit(1);
    
    // If table doesn't exist, we'll get an error
    if (error && error.code === 'PGRST116') {
        console.log('📋 Table does not exist, creating it...');
        
        // For table creation, we need to use the SQL editor or direct connection
        console.log('⚠️  Please create the table manually using the SQL editor with this query:');
        console.log(`
CREATE TABLE IF NOT EXISTS cloudinary_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    public_id VARCHAR(255) NOT NULL UNIQUE,
    url VARCHAR(1000) NOT NULL,
    category VARCHAR(100),
    file_name VARCHAR(255),
    file_size INTEGER,
    format VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
        `);
        
        // Wait for user to create table
        console.log('⏳ Waiting 10 seconds for table creation...');
        await new Promise(resolve => setTimeout(resolve, 10000));
    } else {
        console.log('✅ cloudinary_images table exists');
    }
}

async function insertAllCloudinaryImages() {
    console.log('📦 Inserting Cloudinary images...');
    
    // Read all image URL files
    const urlsFile = path.join(__dirname, '..', 'mosi', 'all-206-other-images-urls.md');
    const categorizedFile = path.join(__dirname, '..', 'mosi', 'image-urls.md');
    
    let allUrls = [];
    
    // Extract URLs from the main file
    if (fs.existsSync(urlsFile)) {
        const urlsContent = fs.readFileSync(urlsFile, 'utf8');
        const urlRegex = /https:\/\/res\.cloudinary\.com\/dkdvqimxe\/image\/upload\/v\d+\/[^)\s]+/g;
        const urls = urlsContent.match(urlRegex) || [];
        allUrls = allUrls.concat(urls.map(url => ({ url, category: 'other' })));
    }
    
    // Extract URLs from categorized file
    if (fs.existsSync(categorizedFile)) {
        const categorizedContent = fs.readFileSync(categorizedFile, 'utf8');
        const urlRegex = /https:\/\/res\.cloudinary\.com\/dkdvqimxe\/image\/upload\/v\d+\/[^)\s]+/g;
        const urls = categorizedContent.match(urlRegex) || [];
        
        // Categorize based on context
        urls.forEach(url => {
            const context = categorizedContent.substring(
                Math.max(0, categorizedContent.indexOf(url) - 100),
                categorizedContent.indexOf(url) + 100
            );
            
            let category = 'other';
            if (context.includes('Services')) category = 'services';
            else if (context.includes('Portfolio')) category = 'portfolio';
            else if (context.includes('Gallery')) category = 'gallery';
            else if (context.includes('Events')) category = 'events';
            
            allUrls.push({ url, category });
        });
    }
    
    console.log(`🔗 Found ${allUrls.length} total image URLs to insert`);
    
    // Insert images in batches
    const batchSize = 20;
    for (let i = 0; i < allUrls.length; i += batchSize) {
        const batch = allUrls.slice(i, i + batchSize);
        const imageData = batch.map(item => {
            const urlParts = item.url.split('/');
            const fileName = urlParts[urlParts.length - 1];
            const publicId = fileName.replace(/\.[^/.]+$/, '');
            
            return {
                public_id: publicId,
                url: item.url,
                category: item.category,
                file_name: fileName,
                format: fileName.split('.').pop() || 'jpg'
            };
        });
        
        try {
            const { error } = await supabase
                .from('cloudinary_images')
                .upsert(imageData, { onConflict: 'public_id' });
            
            if (error) {
                console.warn(`⚠️  Batch ${Math.floor(i/batchSize) + 1} insert error:`, error.message);
            } else {
                console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} inserted successfully (${imageData.length} images)`);
            }
        } catch (batchError) {
            console.warn(`⚠️  Batch ${Math.floor(i/batchSize) + 1} failed:`, batchError.message);
        }
    }
}

async function updateExistingTables() {
    console.log('🔄 Updating existing tables with image URLs...');
    
    // Get some sample images from cloudinary_images to update other tables
    const { data: cloudinaryImages, error } = await supabase
        .from('cloudinary_images')
        .select('url, category')
        .limit(20);
    
    if (error) {
        console.warn('⚠️  Could not fetch cloudinary images:', error.message);
        return;
    }
    
    if (!cloudinaryImages || cloudinaryImages.length === 0) {
        console.log('📝 No cloudinary images found, skipping table updates');
        return;
    }
    
    // Update services table
    await updateServicesTable(cloudinaryImages);
    
    // Update portfolio_projects table
    await updatePortfolioTable(cloudinaryImages);
    
    // Update blog_posts table
    await updateBlogTable(cloudinaryImages);
    
    // Update team_members table
    await updateTeamTable(cloudinaryImages);
}

async function updateServicesTable(images) {
    console.log('🔧 Updating services table...');
    
    const serviceImages = images.filter(img => img.category === 'services');
    if (serviceImages.length === 0) return;
    
    const services = [
        { slug: 'web-development', title: 'Web Development' },
        { slug: 'graphic-design', title: 'Graphic Design' },
        { slug: 'digital-marketing', title: 'Digital Marketing' },
        { slug: 'video-production', title: 'Video Production' }
    ];
    
    for (let i = 0; i < services.length && i < serviceImages.length; i++) {
        const { error } = await supabase
            .from('services')
            .update({ image_url: serviceImages[i].url })
            .eq('slug', services[i].slug)
            .is('image_url', null);
        
        if (error) {
            console.warn(`⚠️  Failed to update service ${services[i].slug}:`, error.message);
        } else {
            console.log(`✅ Updated service: ${services[i].title}`);
        }
    }
}

async function updatePortfolioTable(images) {
    console.log('🔧 Updating portfolio table...');
    
    const portfolioImages = images.filter(img => img.category === 'portfolio');
    if (portfolioImages.length === 0) return;
    
    const projects = [
        { slug: 'corporate-website-redesign', title: 'Corporate Website Redesign' },
        { slug: 'brand-identity-design', title: 'Brand Identity Design' },
        { slug: 'social-media-campaign', title: 'Social Media Campaign' },
        { slug: 'product-photography', title: 'Product Photography' }
    ];
    
    for (let i = 0; i < projects.length && i < portfolioImages.length; i++) {
        const { error } = await supabase
            .from('portfolio_projects')
            .update({ image_url: portfolioImages[i].url })
            .eq('slug', projects[i].slug)
            .is('image_url', null);
        
        if (error) {
            console.warn(`⚠️  Failed to update project ${projects[i].slug}:`, error.message);
        } else {
            console.log(`✅ Updated project: ${projects[i].title}`);
        }
    }
}

async function updateBlogTable(images) {
    console.log('🔧 Updating blog table...');
    
    const blogImages = images.filter(img => img.category === 'blog' || img.category === 'gallery');
    if (blogImages.length === 0) return;
    
    const posts = [
        { slug: 'web-design-trends-2024', title: 'Web Design Trends 2024' },
        { slug: 'digital-marketing-tips', title: 'Digital Marketing Tips' },
        { slug: 'branding-guide-startups', title: 'Branding Guide for Startups' }
    ];
    
    for (let i = 0; i < posts.length && i < blogImages.length; i++) {
        const { error } = await supabase
            .from('blog_posts')
            .update({ featured_image_url: blogImages[i].url })
            .eq('slug', posts[i].slug)
            .is('featured_image_url', null);
        
        if (error) {
            console.warn(`⚠️  Failed to update blog post ${posts[i].slug}:`, error.message);
        } else {
            console.log(`✅ Updated blog post: ${posts[i].title}`);
        }
    }
}

async function updateTeamTable(images) {
    console.log('🔧 Updating team table...');
    
    const teamImages = images.filter(img => img.category === 'events' || img.category === 'other');
    if (teamImages.length === 0) return;
    
    const teamMembers = [
        { name: 'John Smith' },
        { name: 'Sarah Johnson' },
        { name: 'Mike Wilson' },
        { name: 'Emily Brown' }
    ];
    
    for (let i = 0; i < teamMembers.length && i < teamImages.length; i++) {
        const { error } = await supabase
            .from('team_members')
            .update({ photo_url: teamImages[i].url })
            .eq('name', teamMembers[i].name)
            .is('photo_url', null);
        
        if (error) {
            console.warn(`⚠️  Failed to update team member ${teamMembers[i].name}:`, error.message);
        } else {
            console.log(`✅ Updated team member: ${teamMembers[i].name}`);
        }
    }
}

async function verifyUpdate() {
    console.log('🔍 Verifying database update...');
    
    try {
        // Check cloudinary_images table
        const { count: imageCount, error: imageError } = await supabase
            .from('cloudinary_images')
            .select('*', { count: 'exact', head: true });
        
        if (imageError) {
            console.warn('⚠️  Could not verify cloudinary_images:', imageError.message);
        } else {
            console.log(`✅ Cloudinary images: ${imageCount} total`);
            
            // Show breakdown by category
            const { data: categories } = await supabase
                .from('cloudinary_images')
                .select('category')
                .then(({ data }) => {
                    const counts = {};
                    data?.forEach(item => {
                        counts[item.category] = (counts[item.category] || 0) + 1;
                    });
                    return Object.entries(counts);
                });
            
            if (categories) {
                categories.forEach(([category, count]) => {
                    console.log(`   📁 ${category}: ${count} images`);
                });
            }
        }
        
        // Check other tables
        const tables = [
            { name: 'services', column: 'image_url' },
            { name: 'portfolio_projects', column: 'image_url' },
            { name: 'blog_posts', column: 'featured_image_url' },
            { name: 'team_members', column: 'photo_url' }
        ];
        
        for (const table of tables) {
            const { count, error } = await supabase
                .from(table.name)
                .select('*', { count: 'exact', head: true })
                .not(table.column, 'is', null);
            
            if (!error && count > 0) {
                console.log(`✅ ${table.name}: ${count} records with ${table.column}`);
            }
        }
        
    } catch (error) {
        console.warn('⚠️  Verification error:', error.message);
    }
}

// Run the update
updateDatabase();
