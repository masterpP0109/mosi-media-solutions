// Database Configuration Verification Script
// This script verifies that the database is properly configured and accessible

require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Supabase configuration from environment
const supabaseUrl = process.env.SUPABASE_URL || 'https://terzrbltzhtwiyronimk.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnpyYmx0emh0d2l5cm9uaW1rIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzI0MjQ2MSwiZXhwIjoyMDkyODE4NDYxfQ.nssT0e0SPyJWvbhQbANQB0cIw-Wyg773gT68HBtMGAQ';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabaseConfiguration() {
    console.log('🔍 Verifying database configuration...\n');
    
    const verificationResults = {
        environment: false,
        connection: false,
        tables: false,
        data: false,
        cloudinary: false
    };
    
    try {
        // 1. Verify Environment Variables
        console.log('📋 1. Checking Environment Variables...');
        const envVars = [
            'DATABASE_URL',
            'SUPABASE_URL',
            'SUPABASE_ANON_KEY',
            'SUPABASE_SERVICE_KEY',
            'DB_HOST',
            'DB_PORT',
            'DB_NAME',
            'DB_USER',
            'DB_PASSWORD'
        ];
        
        let envOk = true;
        for (const envVar of envVars) {
            if (process.env[envVar]) {
                console.log(`   ✅ ${envVar}: ${envVar.includes('PASSWORD') || envVar.includes('KEY') ? '***CONFIGURED***' : process.env[envVar]}`);
            } else {
                console.log(`   ❌ ${envVar}: NOT SET`);
                envOk = false;
            }
        }
        
        verificationResults.environment = envOk;
        console.log(envOk ? '   ✅ Environment variables configured\n' : '   ❌ Missing environment variables\n');
        
        // 2. Test Database Connection
        console.log('🔌 2. Testing Database Connection...');
        try {
            // Test connection by querying a known table (users)
            const { data, error } = await supabase
                .from('users')
                .select('id')
                .limit(1);
            
            if (error) {
                console.log(`   ❌ Connection failed: ${error.message}`);
            } else {
                console.log('   ✅ Database connection successful');
                verificationResults.connection = true;
            }
        } catch (connError) {
            console.log(`   ❌ Connection error: ${connError.message}`);
        }
        console.log('');
        
        // 3. Verify Required Tables Exist
        console.log('🏗️  3. Verifying Required Tables...');
        const requiredTables = [
            'users',
            'services',
            'portfolio_projects',
            'blog_posts',
            'team_members',
            'contact_submissions',
            'cloudinary_images'
        ];
        
        let tablesOk = true;
        for (const table of requiredTables) {
            try {
                const { data, error } = await supabase
                    .from(table)
                    .select('id')
                    .limit(1);
                
                if (error) {
                    console.log(`   ❌ ${table}: ${error.message}`);
                    tablesOk = false;
                } else {
                    console.log(`   ✅ ${table}: exists`);
                }
            } catch (tableError) {
                console.log(`   ❌ ${table}: ${tableError.message}`);
                tablesOk = false;
            }
        }
        
        verificationResults.tables = tablesOk;
        console.log(tablesOk ? '   ✅ All required tables exist\n' : '   ❌ Missing required tables\n');
        
        // 4. Verify Sample Data
        console.log('📊 4. Verifying Sample Data...');
        const dataChecks = [
            { table: 'users', minCount: 1, name: 'Admin users' },
            { table: 'services', minCount: 1, name: 'Services' },
            { table: 'portfolio_projects', minCount: 1, name: 'Portfolio projects' },
            { table: 'team_members', minCount: 1, name: 'Team members' }
        ];
        
        let dataOk = true;
        for (const check of dataChecks) {
            try {
                const { count, error } = await supabase
                    .from(check.table)
                    .select('*', { count: 'exact', head: true });
                
                if (error) {
                    console.log(`   ❌ ${check.name}: ${error.message}`);
                    dataOk = false;
                } else if (count >= check.minCount) {
                    console.log(`   ✅ ${check.name}: ${count} records`);
                } else {
                    console.log(`   ⚠️  ${check.name}: ${count} records (expected at least ${check.minCount})`);
                    dataOk = false;
                }
            } catch (dataError) {
                console.log(`   ❌ ${check.name}: ${dataError.message}`);
                dataOk = false;
            }
        }
        
        verificationResults.data = dataOk;
        console.log(dataOk ? '   ✅ Sample data verified\n' : '   ❌ Sample data issues\n');
        
        // 5. Verify Cloudinary Images
        console.log('🖼️  5. Verifying Cloudinary Images...');
        try {
            const { count, error } = await supabase
                .from('cloudinary_images')
                .select('*', { count: 'exact', head: true });
            
            if (error) {
                console.log(`   ❌ Cloudinary images table error: ${error.message}`);
            } else {
                console.log(`   ✅ Cloudinary images: ${count} total`);
                
                // Check categories
                const { data: categories } = await supabase
                    .from('cloudinary_images')
                    .select('category');
                
                if (categories && categories.length > 0) {
                    const categoryCounts = {};
                    categories.forEach(item => {
                        categoryCounts[item.category] = (categoryCounts[item.category] || 0) + 1;
                    });
                    
                    console.log('   📁 Image categories:');
                    Object.entries(categoryCounts).forEach(([category, count]) => {
                        console.log(`      - ${category}: ${count} images`);
                    });
                    
                    verificationResults.cloudinary = count > 0;
                }
            }
        } catch (cloudinaryError) {
            console.log(`   ❌ Cloudinary verification error: ${cloudinaryError.message}`);
        }
        console.log('');
        
        // 6. Summary
        console.log('📋 VERIFICATION SUMMARY:');
        console.log('========================');
        
        const results = [
            { name: 'Environment Variables', status: verificationResults.environment },
            { name: 'Database Connection', status: verificationResults.connection },
            { name: 'Required Tables', status: verificationResults.tables },
            { name: 'Sample Data', status: verificationResults.data },
            { name: 'Cloudinary Images', status: verificationResults.cloudinary }
        ];
        
        let allPassed = true;
        results.forEach(result => {
            const icon = result.status ? '✅' : '❌';
            console.log(`${icon} ${result.name}`);
            if (!result.status) allPassed = false;
        });
        
        console.log('\n========================');
        if (allPassed) {
            console.log('🎉 ALL VERIFICATIONS PASSED! Database is properly configured.');
        } else {
            console.log('⚠️  SOME VERIFICATIONS FAILED. Please address the issues above.');
        }
        
        // 7. Next Steps
        console.log('\n📝 NEXT STEPS:');
        if (!verificationResults.environment) {
            console.log('   - Set up missing environment variables in .env file');
        }
        if (!verificationResults.connection) {
            console.log('   - Check database connection string and credentials');
        }
        if (!verificationResults.tables) {
            console.log('   - Run database setup script: node database/setup.cjs');
        }
        if (!verificationResults.data) {
            console.log('   - Insert sample data using setup script');
        }
        if (!verificationResults.cloudinary) {
            console.log('   - Run Cloudinary update script: node database/update-supabase-direct.cjs');
        }
        if (allPassed) {
            console.log('   ✅ Database is ready for use!');
            console.log('   🚀 You can now start the application');
        }
        
    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        process.exit(1);
    }
}

// Run verification
verifyDatabaseConfiguration();
