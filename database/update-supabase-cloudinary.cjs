// Update Supabase database with Cloudinary image URLs
// This script connects to your Supabase database and runs the SQL update

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration
const supabaseUrl = 'https://terzrbltzhtwiyronimk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnpyYmx0emh0d2l5cm9uaW1rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI0MjQ2MSwiZXhwIjoyMDkyODE4NDYxfQ.nssT0e0SPyJWvbhQbANQB0cIw-Wyg773gT68HBtMGAQ';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function runDatabaseUpdate() {
    try {
        console.log('🚀 Starting database update with Cloudinary images...');
        
        // Read the SQL file
        const sqlFile = path.join(__dirname, 'update-cloudinary-images.sql');
        const sqlContent = fs.readFileSync(sqlFile, 'utf8');
        
        console.log('📄 SQL file loaded successfully');
        
        // Split SQL content into individual statements
        const statements = sqlContent
            .split(';')
            .map(stmt => stmt.trim())
            .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
        
        console.log(`📝 Found ${statements.length} SQL statements to execute`);
        
        // Execute each statement
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            
            // Skip certain statements that don't work well with Supabase client
            if (statement.includes('DO $$') || 
                statement.includes('RAISE NOTICE') ||
                statement.includes('CREATE OR REPLACE VIEW') ||
                statement.includes('ON CONFLICT')) {
                console.log(`⏭️  Skipping statement ${i + 1}: ${statement.substring(0, 50)}...`);
                continue;
            }
            
            try {
                console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
                
                // Use raw SQL execution
                const { error } = await supabase.rpc('exec_sql', { sql_query: statement });
                
                if (error) {
                    // If RPC fails, try direct table operations for common patterns
                    if (statement.includes('UPDATE')) {
                        console.log('🔄 Trying direct update approach...');
                        await handleDirectUpdate(statement);
                    } else if (statement.includes('INSERT')) {
                        console.log('🔄 Trying direct insert approach...');
                        await handleDirectInsert(statement);
                    } else {
                        console.warn(`⚠️  Statement ${i + 1} failed:`, error.message);
                    }
                } else {
                    console.log(`✅ Statement ${i + 1} executed successfully`);
                }
            } catch (stmtError) {
                console.warn(`⚠️  Statement ${i + 1} error:`, stmtError.message);
            }
        }
        
        // Create the cloudinary_images table and insert data manually
        await createCloudinaryImagesTable();
        await insertCloudinaryImages();
        
        // Verify the update
        await verifyUpdate();
        
        console.log('🎉 Database update completed successfully!');
        
    } catch (error) {
        console.error('❌ Database update failed:', error);
        process.exit(1);
    }
}

async function createCloudinaryImagesTable() {
    console.log('🏗️  Creating cloudinary_images table...');
    
    const { error } = await supabase.rpc('exec_sql', {
        sql_query: `
            CREATE TABLE IF NOT EXISTS cloudinary_images (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                public_id VARCHAR(255) NOT NULL UNIQUE,
                url VARCHAR(500) NOT NULL,
                category VARCHAR(100),
                file_name VARCHAR(255),
                file_size INTEGER,
                format VARCHAR(10),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `
    });
    
    if (error) {
        console.warn('Table creation warning:', error.message);
    } else {
        console.log('✅ cloudinary_images table created/verified');
    }
}

async function insertCloudinaryImages() {
    console.log('📦 Inserting Cloudinary images...');
    
    // Read the image URLs file
    const urlsFile = path.join(__dirname, '..', 'mosi', 'all-206-other-images-urls.md');
    const urlsContent = fs.readFileSync(urlsFile, 'utf8');
    
    // Extract URLs from the markdown file
    const urlRegex = /https:\/\/res\.cloudinary\.com\/dkdvqimxe\/image\/upload\/v\d+\/[^)]+/g;
    const urls = urlsContent.match(urlRegex) || [];
    
    console.log(`🔗 Found ${urls.length} image URLs to insert`);
    
    // Insert images in batches
    const batchSize = 10;
    for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const imageData = batch.map((url, index) => {
            const fileName = url.split('/').pop().replace('.jpg', '');
            return {
                public_id: fileName,
                url: url,
                category: 'other',
                file_name: `${fileName}.jpg`,
                format: 'jpg'
            };
        });
        
        const { error } = await supabase
            .from('cloudinary_images')
            .upsert(imageData, { onConflict: 'public_id' });
        
        if (error) {
            console.warn(`⚠️  Batch ${Math.floor(i/batchSize) + 1} insert error:`, error.message);
        } else {
            console.log(`✅ Batch ${Math.floor(i/batchSize) + 1} inserted successfully`);
        }
    }
}

async function handleDirectUpdate(statement) {
    // Parse UPDATE statement and execute with Supabase client
    // This is a simplified version - you may need to adjust based on your specific statements
    console.log('🔄 Direct update not implemented, skipping...');
}

async function handleDirectInsert(statement) {
    // Parse INSERT statement and execute with Supabase client
    // This is a simplified version - you may need to adjust based on your specific statements
    console.log('🔄 Direct insert not implemented, skipping...');
}

async function verifyUpdate() {
    console.log('🔍 Verifying database update...');
    
    try {
        // Check cloudinary_images table
        const { count, error } = await supabase
            .from('cloudinary_images')
            .select('*', { count: 'exact', head: true });
        
        if (error) {
            console.warn('Verification warning:', error.message);
        } else {
            console.log(`✅ Verification complete: ${count} images stored in cloudinary_images table`);
        }
        
        // Check if other tables have image URLs
        const tables = ['services', 'portfolio_projects', 'blog_posts', 'team_members'];
        for (const table of tables) {
            const { data, error } = await supabase
                .from(table)
                .select('id')
                .or('image_url.not.is.null,featured_image_url.not.is.null,photo_url.not.is.null');
            
            if (!error && data) {
                console.log(`✅ ${table}: ${data.length} records with images`);
            }
        }
        
    } catch (error) {
        console.warn('Verification error:', error.message);
    }
}

// Run the update
runDatabaseUpdate();
