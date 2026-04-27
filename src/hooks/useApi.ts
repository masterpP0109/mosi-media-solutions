import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiService, apiKeys, ApiResponse } from '@/lib/api';

// Services hooks
export const useServices = () => {
  return useQuery({
    queryKey: apiKeys.services,
    queryFn: () => ApiService.getServices(),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useService = (slug: string) => {
  return useQuery({
    queryKey: apiKeys.service(slug),
    queryFn: () => ApiService.getServiceBySlug(slug),
    select: (data: ApiResponse) => data.data || null,
    enabled: !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Portfolio hooks
export const usePortfolioProjects = (category?: string) => {
  return useQuery({
    queryKey: apiKeys.portfolio(category),
    queryFn: () => ApiService.getPortfolioProjects(category),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const usePortfolioProject = (slug: string) => {
  return useQuery({
    queryKey: apiKeys.portfolioProject(slug),
    queryFn: () => ApiService.getPortfolioProjectBySlug(slug),
    select: (data: ApiResponse) => data.data || null,
    enabled: !!slug,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Blog hooks
export const useBlogPosts = (category?: string, featured?: boolean) => {
  return useQuery({
    queryKey: apiKeys.blogPosts(category, featured),
    queryFn: () => ApiService.getBlogPosts(category, featured),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: apiKeys.blogPost(slug),
    queryFn: () => ApiService.getBlogPostBySlug(slug),
    select: (data: ApiResponse) => data.data || null,
    enabled: !!slug,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};

// Contact form hook
export const useSubmitContactForm = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: any) => ApiService.submitContactForm(data),
    onSuccess: () => {
      // Invalidate contact submissions query if it exists
      queryClient.invalidateQueries({ queryKey: apiKeys.contactSubmissions });
    },
  });
};

// Packages hooks
export const useServicePackages = () => {
  return useQuery({
    queryKey: apiKeys.packages,
    queryFn: () => ApiService.getServicePackages(),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

export const usePackage = (slug: string) => {
  return useQuery({
    queryKey: apiKeys.package(slug),
    queryFn: () => ApiService.getPackageBySlug(slug),
    select: (data: ApiResponse) => data.data || null,
    enabled: !!slug,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Team members hook
export const useTeamMembers = () => {
  return useQuery({
    queryKey: apiKeys.teamMembers,
    queryFn: () => ApiService.getTeamMembers(),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Testimonials hook
export const useTestimonials = (featured?: boolean) => {
  return useQuery({
    queryKey: apiKeys.testimonials(featured),
    queryFn: () => ApiService.getTestimonials(featured),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

// Gallery hook
export const useGalleryImages = (category?: string) => {
  return useQuery({
    queryKey: apiKeys.gallery(category),
    queryFn: () => ApiService.getGalleryImages(category),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
};

// Admin hooks (for contact submissions management)
export const useContactSubmissions = () => {
  return useQuery({
    queryKey: apiKeys.contactSubmissions,
    queryFn: () => ApiService.getContactSubmissions(),
    select: (data: ApiResponse) => data.data || [],
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};
