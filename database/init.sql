-- Simple database initialization script
-- Run this in your PostgreSQL database directly

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table first
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create other tables
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(100),
    image_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    client_name VARCHAR(255),
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    project_date DATE,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    featured_image_url VARCHAR(500),
    category VARCHAR(100),
    read_time_minutes INTEGER,
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    meta_title VARCHAR(255),
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Insert basic data
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@mosimediasolutions.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQ', 'Admin', 'User', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO services (title, slug, description, icon_name, sort_order) VALUES
('Film & Video Production', 'film-video-production', 'From corporate documentaries to promotional content, live streaming, and podcasts — we produce high-quality video that tells your story with cinematic precision.', 'Film', 1),
('Professional Photography', 'professional-photography', 'Expert photography services delivering sharp, well-composed images that preserve moments and strengthen brand identity.', 'Camera', 2),
('Events Management', 'events-management', 'End-to-end event production for conferences, weddings, board meetings, school events, and brand launches.', 'Sparkles', 3),
('Digital Screen Solutions', 'digital-screen-solutions', 'LED screens, interactive displays, and projection mapping that transform any venue into an immersive visual experience.', 'Monitor', 4),
('Professional Audio Services', 'professional-audio-services', 'Crystal-clear sound for any venue — from intimate meetings to large-scale outdoor events.', 'Music', 5),
('Marketing & Advertising', 'marketing-advertising', 'Strategic campaigns that drive visibility, engagement, and measurable growth for your brand.', 'TrendingUp', 6)
ON CONFLICT (slug) DO NOTHING;

-- Verify setup
SELECT 'Database initialized successfully!' as status;
