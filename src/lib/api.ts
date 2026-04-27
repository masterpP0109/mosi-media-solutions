import { db } from './database';

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
      const services = await db.findAll('services', {}, 'sort_order ASC');
      return { success: true, data: services };
    } catch (error) {
      return { success: false, error: 'Failed to fetch services' };
    }
  }

  static async getServiceBySlug(slug: string): Promise<ApiResponse<Service>> {
    try {
      const services = await db.findAll('services', { slug });
      const service = services[0] || null;
      if (service) {
        // Get features for this service
        const features = await db.findAll('service_features', { service_id: service.id }, 'sort_order ASC');
        return { success: true, data: { ...service, features } };
      }
      return { success: false, error: 'Service not found' };
    } catch (error) {
      return { success: false, error: 'Failed to fetch service' };
    }
  }

  // Portfolio
  static async getPortfolioProjects(category?: string): Promise<ApiResponse<PortfolioProject[]>> {
    try {
      const conditions: any = { published: true };
      if (category && category !== 'All') {
        conditions.category = category;
      }
      const projects = await db.findAll('portfolio_projects', conditions, 'sort_order ASC, created_at DESC');
      return { success: true, data: projects };
    } catch (error) {
      return { success: false, error: 'Failed to fetch portfolio projects' };
    }
  }

  static async getPortfolioProjectBySlug(slug: string): Promise<ApiResponse<PortfolioProject>> {
    try {
      const projects = await db.findAll('portfolio_projects', { slug, published: true });
      const project = projects[0] || null;
      if (project) {
        // Get tags for this project
        const tags = await db.findAll('project_tags', { project_id: project.id });
        return { success: true, data: { ...project, tags } };
      }
      return { success: false, error: 'Project not found' };
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
      const members = await db.findAll('team_members', { published: true }, 'sort_order ASC');
      return { success: true, data: members };
    } catch (error) {
      return { success: false, error: 'Failed to fetch team members' };
    }
  }

  // Testimonials
  static async getTestimonials(featured?: boolean): Promise<ApiResponse<any[]>> {
    try {
      const conditions: any = { published: true };
      if (featured !== undefined) {
        conditions.featured = featured;
      }
      const testimonials = await db.findAll('testimonials', conditions, 'sort_order ASC');
      return { success: true, data: testimonials };
    } catch (error) {
      return { success: false, error: 'Failed to fetch testimonials' };
    }
  }

  // Gallery
  static async getGalleryImages(category?: string): Promise<ApiResponse<any[]>> {
    try {
      const conditions: any = { published: true };
      if (category) {
        conditions.category = category;
      }
      const images = await db.findAll('gallery_images', conditions, 'sort_order ASC');
      return { success: true, data: images };
    } catch (error) {
      return { success: false, error: 'Failed to fetch gallery images' };
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
