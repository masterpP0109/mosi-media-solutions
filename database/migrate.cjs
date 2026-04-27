const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Database configuration
const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'mosi_media_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
};

async function runMigration() {
  const pool = new Pool(config);
  
  try {
    console.log('🔄 Starting database migration...');
    console.log(`📍 Connecting to: ${config.host}:${config.port}/${config.database}`);
    
    // Test connection first
    await pool.query('SELECT NOW()');
    console.log('✅ Database connection successful');
    
    // Read the setup SQL file
    const setupSql = fs.readFileSync(
      path.join(__dirname, 'setup.sql'), 
      'utf8'
    );
    
    console.log('📝 Executing setup script...');
    
    // Execute the setup script
    await pool.query(setupSql);
    
    console.log('✅ Database migration completed successfully!');
    
    // Verify the setup
    const result = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM services) as services_count,
        (SELECT COUNT(*) FROM portfolio_projects) as projects_count,
        (SELECT COUNT(*) FROM blog_posts) as blog_posts_count,
        (SELECT COUNT(*) FROM users) as users_count,
        (SELECT COUNT(*) FROM service_packages) as packages_count
    `);
    
    const counts = result.rows[0];
    console.log('\n📊 Database Summary:');
    console.log(`   Services: ${counts.services_count}`);
    console.log(`   Portfolio Projects: ${counts.projects_count}`);
    console.log(`   Blog Posts: ${counts.blog_posts_count}`);
    console.log(`   Users: ${counts.users_count}`);
    console.log(`   Service Packages: ${counts.packages_count}`);
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('🔍 Full error details:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration };
