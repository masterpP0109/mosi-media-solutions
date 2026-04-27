# Database Setup Guide

This directory contains the database schema and configuration files for Mosi Media Solutions website.

## Database Structure

The database is designed to support all frontend data requirements:

### Core Tables

1. **services** - Main service categories (Video Production, Photography, etc.)
2. **service_features** - Detailed features for each service
3. **portfolio_projects** - Portfolio items with categories and metadata
4. **project_tags** - Tags for portfolio categorization
5. **blog_posts** - Blog articles with SEO metadata
6. **blog_tags** - Tags for blog categorization
7. **service_packages** - Pricing tiers and packages
8. **package_features** - Features included in each package
9. **contact_submissions** - Contact form submissions
10. **team_members** - Team member profiles
11. **users** - Admin user accounts
12. **testimonials** - Client testimonials
13. **gallery_images** - General gallery images

## Setup Instructions

### 1. Database Installation

#### PostgreSQL (Recommended)
```bash
# Install PostgreSQL
# Windows: Download from https://www.postgresql.org/download/windows/
# macOS: brew install postgresql
# Ubuntu: sudo apt-get install postgresql postgresql-contrib

# Create database
createdb mosi_media_db

# Create user (optional)
createuser mosi_user
psql -c "ALTER USER mosi_user PASSWORD 'your_password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE mosi_media_db TO mosi_user;"
```

#### MySQL (Alternative)
```bash
# Install MySQL
# Windows: Download from https://dev.mysql.com/downloads/mysql/
# macOS: brew install mysql
# Ubuntu: sudo apt-get install mysql-server

# Create database and user
mysql -u root -p
CREATE DATABASE mosi_media_db;
CREATE USER 'mosi_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON mosi_media_db.* TO 'mosi_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Environment Configuration

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` with your database credentials:
```env
# For PostgreSQL
DATABASE_URL=postgresql://mosi_user:your_password@localhost:5432/mosi_media_db

# For MySQL
DATABASE_URL=mysql://mosi_user:your_password@localhost:3306/mosi_media_db
```

### 3. Run Database Schema

```bash
# For PostgreSQL
psql -d mosi_media_db -f database/schema.sql

# For MySQL
mysql -u mosi_user -p mosi_media_db < database/schema.sql
```

### 4. Initialize Database Connection

The database connection is automatically initialized when the application starts. The connection logic is in `src/lib/database.ts`.

## Database Features

### Automatic Timestamps
- `created_at` and `updated_at` fields are automatically managed
- Triggers ensure `updated_at` is always current

### UUID Primary Keys
- All tables use UUID primary keys for better security and scalability
- Generated automatically using PostgreSQL's `uuid-ossp` extension

### Indexes
- Performance indexes on commonly queried fields
- Composite indexes for complex queries

### Sample Data
- Pre-populated with sample data matching the frontend
- Includes services, portfolio projects, blog posts, and packages

## API Integration

The database integrates with the frontend through:

1. **Database Connection** (`src/lib/database.ts`)
   - Supports both PostgreSQL and MySQL
   - Connection pooling and error handling
   - Helper methods for common operations

2. **API Service** (`src/lib/api.ts`)
   - Type-safe API methods
   - Handles all CRUD operations
   - Includes caching and optimization

3. **React Hooks** (`src/hooks/useApi.ts`)
   - React Query integration
   - Automatic caching and refetching
   - Type-safe data fetching

## Security Considerations

1. **Environment Variables**: Never commit database credentials to version control
2. **SQL Injection**: All queries use parameterized statements
3. **Connection Security**: Use SSL in production environments
4. **User Authentication**: Admin users have hashed passwords

## Maintenance

### Backups
```bash
# PostgreSQL
pg_dump mosi_media_db > backup_$(date +%Y%m%d).sql

# MySQL
mysqldump -u mosi_user -p mosi_media_db > backup_$(date +%Y%m%d).sql
```

### Updates
- Run schema migrations carefully to avoid data loss
- Test changes in development first
- Keep backups before major updates

## Troubleshooting

### Connection Issues
1. Verify database is running
2. Check credentials in `.env`
3. Ensure database exists
4. Verify network connectivity

### Performance Issues
1. Check query execution plans
2. Add missing indexes
3. Optimize slow queries
4. Consider connection pooling

### Data Issues
1. Verify data types match schema
2. Check foreign key constraints
3. Validate required fields
4. Review trigger functions

## Development Notes

- The schema is designed to be flexible and extensible
- All tables include audit fields (`created_at`, `updated_at`)
- Soft deletes are implemented where appropriate
- Relationships are properly indexed for performance
