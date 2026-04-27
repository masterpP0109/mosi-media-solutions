import { useState, useEffect } from 'react';
import { ApiService } from '@/lib/api';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  url: string;
  file_name: string;
  format: string;
  created_at: string;
}

interface GalleryData {
  images: GalleryImage[];
  categories: string[];
  loading: boolean;
  error: string | null;
}

export const useGalleryData = (selectedCategory?: string): GalleryData => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch images
        const imagesResponse = await ApiService.getGalleryImages(selectedCategory);
        if (!imagesResponse.success) {
          throw new Error(imagesResponse.error || 'Failed to fetch images');
        }

        // Transform database images to GalleryImage format with URL validation
        const transformedImages: GalleryImage[] = imagesResponse.data
          .filter(item => {
            // Validate URL format and basic structure
            if (!item.url) return false;
            try {
              new URL(item.url);
              return true;
            } catch {
              return false;
            }
          })
          .map((item, index) => ({
            id: item.id,
            title: item.title || `Image ${index + 1}`,
            category: item.category || 'other',
            displayCategory: mapCategoryToDisplay(item.category || 'other'),
            url: item.url,
            size: getImageSize(index),
            file_name: item.file_name,
            format: item.format,
            created_at: item.created_at
          }));

        // Fetch categories
        const categoriesResponse = await ApiService.getGalleryCategories();
        if (categoriesResponse.success) {
          const allCategories = ['All', ...(categoriesResponse.data || [])];
          setCategories(allCategories);
        }

        setImages(transformedImages);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Gallery data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [selectedCategory]);

  return {
    images,
    categories,
    loading,
    error
  };
};

// Helper function to determine diverse bento grid sizing patterns
const getImageSize = (index: number): "small" | "medium" | "large" | "wide" | "tall" | "extraWide" | "extraTall" => {
  // Create diverse bento patterns with different card sizes
  const patterns = [
    // Pattern 1: Mixed sizes with focal points
    ["large", "small", "small", "tall", "medium", "wide", "small", "extraTall"],
    // Pattern 2: Horizontal emphasis
    ["wide", "medium", "wide", "small", "extraWide", "small", "medium", "tall"],
    // Pattern 3: Vertical emphasis
    ["tall", "small", "large", "small", "extraTall", "medium", "small", "wide"],
    // Pattern 4: Balanced mix
    ["medium", "large", "medium", "tall", "wide", "small", "extraWide", "small"],
    // Pattern 5: Dynamic layout
    ["extraWide", "small", "large", "tall", "medium", "wide", "small", "extraTall"]
  ];
  
  // Select pattern based on index to create variety
  const patternIndex = index % patterns.length;
  const itemIndex = (index % 8);
  
  return patterns[patternIndex][itemIndex] as "small" | "medium" | "large" | "wide" | "tall" | "extraWide" | "extraTall";
};

// Helper function to map cloudinary categories to display categories
const mapCategoryToDisplay = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'services': 'Services',
    'portfolio': 'Portfolio', 
    'gallery': 'Gallery',
    'events': 'Events',
    'other': 'Creative'
  };
  return categoryMap[category] || 'Creative';
};
