-- Mosi Media Solutions Database Schema
-- Designed for multimedia agency website with services, portfolio, blogs, and contact management

-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Core tables for the website

-- Services table - for the 6 main service categories
CREATE TABLE services (
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

-- Service features - detailed features for each service
CREATE TABLE service_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    feature_name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Portfolio projects
CREATE TABLE portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    client_name VARCHAR(255),
    category VARCHAR(100) NOT NULL, -- Events, Video, Photography, Corporate
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    featured BOOLEAN DEFAULT FALSE,
    project_date DATE,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Project tags for better categorization
CREATE TABLE project_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES portfolio_projects(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog posts
CREATE TABLE blog_posts (
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
    author_id UUID REFERENCES users(id),
    meta_title VARCHAR(255),
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Blog post tags
CREATE TABLE blog_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Service packages/pricing tiers
CREATE TABLE service_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price VARCHAR(100), -- Using VARCHAR to handle "From $500" format
    popular BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Package features
CREATE TABLE package_features (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID REFERENCES service_packages(id) ON DELETE CASCADE,
    feature_name VARCHAR(255) NOT NULL,
    included BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service_interest VARCHAR(255),
    message TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, read, responded, closed
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Team members
CREATE TABLE team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255),
    bio TEXT,
    photo_url VARCHAR(500),
    email VARCHAR(255),
    phone VARCHAR(50),
    linkedin_url VARCHAR(500),
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Users table for admin access
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'admin', -- admin, editor, viewer
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name VARCHAR(255) NOT NULL,
    client_company VARCHAR(255),
    client_position VARCHAR(255),
    testimonial_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    project_title VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Gallery images for general use
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_portfolio_projects_category ON portfolio_projects(category);
CREATE INDEX idx_portfolio_projects_published ON portfolio_projects(published);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_team_members_published ON team_members(published);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_portfolio_projects_updated_at BEFORE UPDATE ON portfolio_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_packages_updated_at BEFORE UPDATE ON service_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_team_members_updated_at BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data based on the website content

-- Services
INSERT INTO services (title, slug, description, icon_name, sort_order) VALUES
('Film & Video Production', 'film-video-production', 'From corporate documentaries to promotional content, live streaming, and podcasts — we produce high-quality video that tells your story with cinematic precision.', 'Film', 1),
('Professional Photography', 'professional-photography', 'Expert photography services delivering sharp, well-composed images that preserve moments and strengthen brand identity.', 'Camera', 2),
('Events Management', 'events-management', 'End-to-end event production for conferences, weddings, board meetings, school events, and brand launches.', 'Sparkles', 3),
('Digital Screen Solutions', 'digital-screen-solutions', 'LED screens, interactive displays, and projection mapping that transform any venue into an immersive visual experience.', 'Monitor', 4),
('Professional Audio Services', 'professional-audio-services', 'Crystal-clear sound for any venue — from intimate meetings to large-scale outdoor events.', 'Music', 5),
('Marketing & Advertising', 'marketing-advertising', 'Strategic campaigns that drive visibility, engagement, and measurable growth for your brand.', 'TrendingUp', 6);

-- Service features
INSERT INTO service_features (service_id, feature_name, sort_order) VALUES
((SELECT id FROM services WHERE slug = 'film-video-production'), 'Corporate videos & documentaries', 1),
((SELECT id FROM services WHERE slug = 'film-video-production'), 'Event coverage & live streaming', 2),
((SELECT id FROM services WHERE slug = 'film-video-production'), 'Promotional & social media content', 3),
((SELECT id FROM services WHERE slug = 'film-video-production'), 'Podcast production', 4),
((SELECT id FROM services WHERE slug = 'film-video-production'), 'Music videos & short films', 5),
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Wedding & portrait photography', 1),
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Corporate & event photography', 2),
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Product & food photography', 3),
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Fashion & editorial shoots', 4),
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Real estate & architectural', 5);

-- Portfolio projects
INSERT INTO portfolio_projects (title, slug, description, client_name, category, featured, project_date) VALUES
('Moldon Marketing Product Campaign', 'moldon-marketing-campaign', 'Full video production and photography for Moldon Marketing''s product range.', 'Moldon Marketing', 'Corporate', TRUE, '2024-03-15'),
('Afdis Hunters 660ml Product Launch', 'afdis-hunters-launch', 'Event management and media coverage for African Distillers'' product launch.', 'African Distillers', 'Events', TRUE, '2024-02-28'),
('Kings Primary Speech & Prize Giving', 'kings-primary-event', 'AV setup, photography, and live streaming for the annual school event.', 'Kings Primary School', 'Events', FALSE, '2024-01-20'),
('Victoria Falls Destination Wedding', 'victoria-falls-wedding', 'Intimate elopement photography in the Victoria Falls Rainforest.', 'Private Client', 'Photography', TRUE, '2024-01-10'),
('Corporate Brand Film — ZB Bank', 'zb-bank-brand-film', 'Cinematic brand film showcasing ZB Bank''s community impact.', 'ZB Bank', 'Video', TRUE, '2023-12-15'),
('Tourism Victoria Falls Campaign', 'tourism-campaign', 'Destination marketing campaign for Victoria Falls tourism board.', 'Victoria Falls Tourism Board', 'Corporate', FALSE, '2023-11-20');

-- Blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, read_time_minutes, featured, published, published_at) VALUES
('The Future of Digital Marketing in Zimbabwe', 'future-digital-marketing-zimbabwe', 'Explore how digital marketing is evolving in Zimbabwe and how businesses can leverage new technologies to reach their audiences effectively.', 'Full blog content would go here...', 'Digital Marketing', 5, TRUE, TRUE, '2024-04-01 10:00:00'),
('Creating Impactful Video Content for African Brands', 'impactful-video-content-africa', 'Learn the secrets behind creating compelling video content that resonates with African audiences and drives engagement.', 'Full blog content would go here...', 'Video Production', 7, FALSE, TRUE, '2024-03-28 14:30:00'),
('Event Photography: Capturing the Perfect Moment', 'event-photography-guide', 'A comprehensive guide to event photography techniques and how to ensure your corporate events are documented beautifully.', 'Full blog content would go here...', 'Photography', 6, FALSE, TRUE, '2024-03-25 09:15:00'),
('The Power of Social Media in Business Growth', 'social-media-business-growth', 'Discover how strategic social media management can transform your business presence and drive measurable growth.', 'Full blog content would go here...', 'Social Media', 4, FALSE, TRUE, '2024-03-20 16:45:00');

-- Service packages
INSERT INTO service_packages (name, slug, description, price, popular, sort_order) VALUES
('Starter Package', 'starter-package', 'Perfect for small businesses and startups looking to establish their online presence.', 'From $500', FALSE, 1),
('Professional Package', 'professional-package', 'Comprehensive digital solution for growing businesses that need a strong brand presence.', 'From $1,500', TRUE, 2),
('Enterprise Package', 'enterprise-package', 'Full-service multimedia solution for established businesses and large organizations.', 'From $3,500', FALSE, 3);

-- Package features
INSERT INTO package_features (package_id, feature_name, sort_order) VALUES
((SELECT id FROM service_packages WHERE slug = 'starter-package'), 'Professional logo design', 1),
((SELECT id FROM service_packages WHERE slug = 'starter-package'), 'Basic website (5 pages)', 2),
((SELECT id FROM service_packages WHERE slug = 'starter-package'), 'Social media setup (3 platforms)', 3),
((SELECT id FROM service_packages WHERE slug = 'starter-package'), 'Business card design', 4),
((SELECT id FROM service_packages WHERE slug = 'starter-package'), '1 month support', 5),
((SELECT id FROM service_packages WHERE slug = 'starter-package'), 'Basic SEO setup', 6),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Everything in Starter +', 1),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Advanced website (up to 15 pages)', 2),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Complete brand identity', 3),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Social media management (6 months)', 4),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Professional photography (1 session)', 5),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Content creation (10 posts)', 6),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Email marketing setup', 7),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), '3 months support', 8),
((SELECT id FROM service_packages WHERE slug = 'professional-package'), 'Advanced SEO optimization', 9),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Everything in Professional +', 1),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Custom web application', 2),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Video production (3 videos)', 3),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Event coverage & documentation', 4);

-- Create admin user (password: admin123 - should be changed in production)
INSERT INTO users (username, email, password_hash, first_name, last_name, role) VALUES
('admin', 'admin@mosimediasolutions.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'Admin', 'User', 'admin');
