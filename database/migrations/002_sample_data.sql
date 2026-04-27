-- Migration 002: Sample Data
-- This file inserts sample data matching the frontend structure
-- Run this after the initial schema migration

-- Services
INSERT INTO services (title, slug, description, icon_name, sort_order) VALUES
('Film & Video Production', 'film-video-production', 'From corporate documentaries to promotional content, live streaming, and podcasts — we produce high-quality video that tells your story with cinematic precision.', 'Film', 1),
('Professional Photography', 'professional-photography', 'Expert photography services delivering sharp, well-composed images that preserve moments and strengthen brand identity.', 'Camera', 2),
('Events Management', 'events-management', 'End-to-end event production for conferences, weddings, board meetings, school events, and brand launches.', 'Sparkles', 3),
('Digital Screen Solutions', 'digital-screen-solutions', 'LED screens, interactive displays, and projection mapping that transform any venue into an immersive visual experience.', 'Monitor', 4),
('Professional Audio Services', 'professional-audio-services', 'Crystal-clear sound for any venue — from intimate meetings to large-scale outdoor events.', 'Music', 5),
('Marketing & Advertising', 'marketing-advertising', 'Strategic campaigns that drive visibility, engagement, and measurable growth for your brand.', 'TrendingUp', 6)
ON CONFLICT (slug) DO NOTHING;

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
((SELECT id FROM services WHERE slug = 'professional-photography'), 'Real estate & architectural', 5),
((SELECT id FROM services WHERE slug = 'events-management'), 'Corporate conferences & galas', 1),
((SELECT id FROM services WHERE slug = 'events-management'), 'Wedding planning & coordination', 2),
((SELECT id FROM services WHERE slug = 'events-management'), '360° booth experiences', 3),
((SELECT id FROM services WHERE slug = 'events-management'), 'Special effects & cold sparks', 4),
((SELECT id FROM services WHERE slug = 'events-management'), 'Décor & stage design', 5),
((SELECT id FROM services WHERE slug = 'digital-screen-solutions'), 'LED screen rental & setup', 1),
((SELECT id FROM services WHERE slug = 'digital-screen-solutions'), 'Interactive touch displays', 2),
((SELECT id FROM services WHERE slug = 'digital-screen-solutions'), 'Projection mapping', 3),
((SELECT id FROM services WHERE slug = 'digital-screen-solutions'), 'Digital signage solutions', 4),
((SELECT id FROM services WHERE slug = 'digital-screen-solutions'), 'Video walls', 5),
((SELECT id FROM services WHERE slug = 'professional-audio-services'), 'PA system rental & setup', 1),
((SELECT id FROM services WHERE slug = 'professional-audio-services'), 'Wireless microphone systems', 2),
((SELECT id FROM services WHERE slug = 'professional-audio-services'), 'Live audio mixing', 3),
((SELECT id FROM services WHERE slug = 'professional-audio-services'), 'Studio recording', 4),
((SELECT id FROM services WHERE slug = 'professional-audio-services'), 'Conference audio solutions', 5),
((SELECT id FROM services WHERE slug = 'marketing-advertising'), 'Social media campaigns', 1),
((SELECT id FROM services WHERE slug = 'marketing-advertising'), 'Brand strategy & positioning', 2),
((SELECT id FROM services WHERE slug = 'marketing-advertising'), 'Content marketing', 3),
((SELECT id FROM services WHERE slug = 'marketing-advertising'), 'Digital advertising', 4),
((SELECT id FROM services WHERE slug = 'marketing-advertising'), 'Influencer partnerships', 5)
ON CONFLICT DO NOTHING;

-- Portfolio projects
INSERT INTO portfolio_projects (title, slug, description, client_name, category, featured, project_date) VALUES
('Moldon Marketing Product Campaign', 'moldon-marketing-campaign', 'Full video production and photography for Moldon Marketing''s product range.', 'Moldon Marketing', 'Corporate', TRUE, '2024-03-15'),
('Afdis Hunters 660ml Product Launch', 'afdis-hunters-launch', 'Event management and media coverage for African Distillers'' product launch.', 'African Distillers', 'Events', TRUE, '2024-02-28'),
('Kings Primary Speech & Prize Giving', 'kings-primary-event', 'AV setup, photography, and live streaming for the annual school event.', 'Kings Primary School', 'Events', FALSE, '2024-01-20'),
('Victoria Falls Destination Wedding', 'victoria-falls-wedding', 'Intimate elopement photography in the Victoria Falls Rainforest.', 'Private Client', 'Photography', TRUE, '2024-01-10'),
('Corporate Brand Film — ZB Bank', 'zb-bank-brand-film', 'Cinematic brand film showcasing ZB Bank''s community impact.', 'ZB Bank', 'Video', TRUE, '2023-12-15'),
('Tourism Victoria Falls Campaign', 'tourism-campaign', 'Destination marketing campaign for Victoria Falls tourism board.', 'Victoria Falls Tourism Board', 'Corporate', FALSE, '2023-11-20')
ON CONFLICT (slug) DO NOTHING;

-- Blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, read_time_minutes, featured, published, published_at) VALUES
('The Future of Digital Marketing in Zimbabwe', 'future-digital-marketing-zimbabwe', 'Explore how digital marketing is evolving in Zimbabwe and how businesses can leverage new technologies to reach their audiences effectively.', 'Digital marketing in Zimbabwe is undergoing a transformative phase. With increasing internet penetration and smartphone adoption, businesses are discovering new opportunities to connect with their audiences. This comprehensive guide explores the latest trends, strategies, and tools that Zimbabwean businesses can use to stay ahead in the digital landscape.', 'Digital Marketing', 5, TRUE, TRUE, '2024-04-01 10:00:00'),
('Creating Impactful Video Content for African Brands', 'impactful-video-content-africa', 'Learn the secrets behind creating compelling video content that resonates with African audiences and drives engagement.', 'Video content has become the cornerstone of modern marketing, especially for African brands looking to make an impact. This article delves into the unique aspects of creating video content that speaks to African audiences, from storytelling techniques to cultural considerations that make your content truly authentic and engaging.', 'Video Production', 7, FALSE, TRUE, '2024-03-28 14:30:00'),
('Event Photography: Capturing the Perfect Moment', 'event-photography-guide', 'A comprehensive guide to event photography techniques and how to ensure your corporate events are documented beautifully.', 'Event photography requires a unique blend of technical skill and artistic vision. From understanding lighting conditions to anticipating key moments, this guide covers everything you need to know about capturing professional event photos that tell a story and preserve memories for years to come.', 'Photography', 6, FALSE, TRUE, '2024-03-25 09:15:00'),
('The Power of Social Media in Business Growth', 'social-media-business-growth', 'Discover how strategic social media management can transform your business presence and drive measurable growth.', 'Social media has evolved from a simple communication tool to a powerful business growth engine. This article explores how Zimbabwean businesses can leverage platforms like Facebook, Instagram, and LinkedIn to build brand awareness, engage customers, and drive conversions with measurable results.', 'Social Media', 4, FALSE, TRUE, '2024-03-20 16:45:00')
ON CONFLICT (slug) DO NOTHING;

-- Service packages
INSERT INTO service_packages (name, slug, description, price, popular, sort_order) VALUES
('Starter Package', 'starter-package', 'Perfect for small businesses and startups looking to establish their online presence.', 'From $500', FALSE, 1),
('Professional Package', 'professional-package', 'Comprehensive digital solution for growing businesses that need a strong brand presence.', 'From $1,500', TRUE, 2),
('Enterprise Package', 'enterprise-package', 'Full-service multimedia solution for established businesses and large organizations.', 'From $3,500', FALSE, 3)
ON CONFLICT (slug) DO NOTHING;

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
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Event coverage & documentation', 4),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Complete marketing campaign', 5),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), '6 months ongoing support', 6),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Priority service', 7),
((SELECT id FROM service_packages WHERE slug = 'enterprise-package'), 'Dedicated account manager', 8)
ON CONFLICT DO NOTHING;

-- Team members
INSERT INTO team_members (name, position, bio, email, phone, sort_order) VALUES
('John Moyo', 'Creative Director', 'With over 10 years of experience in multimedia production, John leads our creative team with vision and expertise.', 'john@mosimediasolutions.com', '+263 77 123 4567', 1),
('Sarah Chenje', 'Lead Photographer', 'Sarah brings artistic vision and technical excellence to every photography project, specializing in corporate and event photography.', 'sarah@mosimediasolutions.com', '+263 77 234 5678', 2),
('Tendai Ndlovu', 'Video Producer', 'Tendai is our video production expert, with extensive experience in corporate videos, documentaries, and commercial content.', 'tendai@mosimediasolutions.com', '+263 77 345 6789', 3),
('Grace Mugabe', 'Events Manager', 'Grace orchestrates flawless events from conception to execution, ensuring every detail is perfect.', 'grace@mosimediasolutions.com', '+263 77 456 7890', 4)
ON CONFLICT DO NOTHING;

-- Testimonials
INSERT INTO testimonials (client_name, client_company, client_position, testimonial_text, rating, project_title, featured, sort_order) VALUES
('Michael Banda', 'ZB Bank', 'Marketing Director', 'Mosi Media Solutions transformed our brand image with their exceptional video production and photography services. Their team is professional, creative, and delivers outstanding results.', 5, 'Corporate Brand Film', TRUE, 1),
('Patience Chikowore', 'African Distillers', 'Brand Manager', 'The product launch event was flawless! From planning to execution, Mosi Media handled everything perfectly. Our guests were impressed, and the media coverage exceeded our expectations.', 5, 'Afdis Hunters Launch', TRUE, 2),
('David Moyo', 'Kings Primary School', 'Headmaster', 'The AV setup and live streaming for our annual speech day was exceptional. Parents who couldn''t attend were able to watch live, and the quality was outstanding.', 5, 'School Event Coverage', FALSE, 3)
ON CONFLICT DO NOTHING;

-- Gallery images
INSERT INTO gallery_images (title, description, image_url, category, sort_order) VALUES
('Corporate Event Setup', 'Professional AV setup for corporate conference with LED screens and professional lighting.', '/assets/gallery/corporate-setup.jpg', 'Events', 1),
('Wedding Photography', 'Beautiful wedding photography captured in Victoria Falls rainforest.', '/assets/gallery/wedding-photo.jpg', 'Photography', 2),
('Video Production', 'Behind the scenes of corporate video production shoot.', '/assets/gallery/video-production.jpg', 'Video', 3),
('LED Screen Display', 'Large LED screen setup for outdoor event with stunning visual effects.', '/assets/gallery/led-screen.jpg', 'Digital Screens', 4)
ON CONFLICT DO NOTHING;
