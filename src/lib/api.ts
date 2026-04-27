import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://terzrbltzhtwiyronimk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnpyYmx0emh0d2l5cm9uaW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNDI0NjEsImV4cCI6MjA5MjgxODQ2MX0.H_BEvxZf9aHItEjybiBKzz5Pn26wbI1jkLUS6VPQp1U';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon_name: string;
  image_url?: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  id: string;
  service_id: string;
  feature_name: string;
  description?: string;
  sort_order: number;
}

// Portfolio types
export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  client_name?: string;
  category: string;
  image_url?: string;
  video_url?: string;
  featured: boolean;
  project_date?: string;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

// Blog types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url?: string;
  category?: string;
  read_time_minutes?: number;
  featured: boolean;
  published: boolean;
  published_at?: string;
  author_id?: string;
  meta_title?: string;
  meta_description?: string;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// Contact types
export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service_interest?: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'closed';
  created_at: string;
  updated_at: string;
}

// Package types
export interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  popular: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface PackageFeature {
  id: string;
  package_id: string;
  feature_name: string;
  included: boolean;
  sort_order: number;
}

// API Service class
export class ApiService {
  // Services
  static async getServices(): Promise<ApiResponse<Service[]>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch services' };
    }
  }

  static async getServiceBySlug(slug: string): Promise<ApiResponse<Service>> {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*, service_features(*)')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch service' };
    }
  }

  // Portfolio
  static async getPortfolioProjects(category?: string): Promise<ApiResponse<PortfolioProject[]>> {
    try {
      let query = supabase
        .from('portfolio_projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch portfolio projects' };
    }
  }

  static async getPortfolioProjectBySlug(slug: string): Promise<ApiResponse<PortfolioProject>> {
    try {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*, project_tags(*)')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (error) throw error;
      return { success: true, data: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch project' };
    }
  }

  // Blog
  static async getBlogPosts(category?: string, featured?: boolean): Promise<ApiResponse<BlogPost[]>> {
    try {
      const conditions: any = { published: true };
      if (category && category !== 'All') {
        conditions.category = category;
      }
      if (featured !== undefined) {
        conditions.featured = featured;
      }
      const posts = await db.findAll('blog_posts', conditions, 'published_at DESC');
      return { success: true, data: posts };
    } catch (error) {
      return { success: false, error: 'Failed to fetch blog posts' };
    }
  }

  static async getBlogPostBySlug(slug: string): Promise<ApiResponse<BlogPost>> {
    try {
      const posts = await db.findAll('blog_posts', { slug, published: true });
      const post = posts[0] || null;
      if (post) {
        // Increment view count
        await db.query('UPDATE blog_posts SET view_count = view_count + 1 WHERE id = $1', [post.id]);
        
        // Get tags for this post
        const tags = await db.findAll('blog_tags', { blog_post_id: post.id });
        return { success: true, data: { ...post, tags, view_count: post.view_count + 1 } };
      }
      return { success: false, error: 'Blog post not found' };
    } catch (error) {
      return { success: false, error: 'Failed to fetch blog post' };
    }
  }

  // Contact
  static async submitContactForm(data: Omit<ContactSubmission, 'id' | 'status' | 'created_at' | 'updated_at'>): Promise<ApiResponse<ContactSubmission>> {
    try {
      const submission = await db.create('contact_submissions', {
        ...data,
        status: 'new'
      });
      return { success: true, data: submission };
    } catch (error) {
      return { success: false, error: 'Failed to submit contact form' };
    }
  }

  static async getContactSubmissions(): Promise<ApiResponse<ContactSubmission[]>> {
    try {
      const submissions = await db.findAll('contact_submissions', {}, 'created_at DESC');
      return { success: true, data: submissions };
    } catch (error) {
      return { success: false, error: 'Failed to fetch contact submissions' };
    }
  }

  // Packages
  static async getServicePackages(): Promise<ApiResponse<ServicePackage[]>> {
    try {
      const packages = await db.findAll('service_packages', { published: true }, 'sort_order ASC');
      
      // Get features for each package
      const packagesWithFeatures = await Promise.all(
        packages.map(async (pkg) => {
          const features = await db.findAll('package_features', { package_id: pkg.id }, 'sort_order ASC');
          return { ...pkg, features };
        })
      );
      
      return { success: true, data: packagesWithFeatures };
    } catch (error) {
      return { success: false, error: 'Failed to fetch service packages' };
    }
  }

  static async getPackageBySlug(slug: string): Promise<ApiResponse<ServicePackage>> {
    try {
      const packages = await db.findAll('service_packages', { slug, published: true });
      const pkg = packages[0] || null;
      if (pkg) {
        const features = await db.findAll('package_features', { package_id: pkg.id }, 'sort_order ASC');
        return { success: true, data: { ...pkg, features } };
      }
      return { success: false, error: 'Package not found' };
    } catch (error) {
      return { success: false, error: 'Failed to fetch package' };
    }
  }

  // Team Members
  static async getTeamMembers(): Promise<ApiResponse<any[]>> {
    try {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch team members' };
    }
  }

  // Cloudinary Images (for Gallery)
  static async getGalleryImages(category?: string): Promise<ApiResponse<any[]>> {
    try {
      let query = supabase
        .from('cloudinary_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (category && category !== 'All') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch gallery images' };
    }
  }

  // Get all image categories
  static async getGalleryCategories(): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await supabase
        .from('cloudinary_images')
        .select('category')
        .not('category', 'is', null);
      
      if (error) throw error;
      
      const categories = [...new Set(data?.map(item => item.category) || [])];
      return { success: true, data: categories };
    } catch (error) {
      return { success: false, error: 'Failed to fetch gallery categories' };
    }
  }
}

// React Query hooks for frontend
export const apiKeys = {
  services: ['services'],
  service: (slug: string) => ['services', slug],
  portfolio: (category?: string) => ['portfolio', category],
  portfolioProject: (slug: string) => ['portfolio', slug],
  blogPosts: (category?: string, featured?: boolean) => ['blogPosts', category, featured],
  blogPost: (slug: string) => ['blogPosts', slug],
  packages: ['packages'],
  package: (slug: string) => ['packages', slug],
  teamMembers: ['teamMembers'],
  testimonials: (featured?: boolean) => ['testimonials', featured],
  gallery: (category?: string) => ['gallery', category],
  contactSubmissions: ['contactSubmissions'],
} as const;
