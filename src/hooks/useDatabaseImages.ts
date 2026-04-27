import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://terzrbltzhtwiyronimk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcnpyYmx0emh0d2l5cm9uaW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyNDI0NjEsImV4cCI6MjA5MjgxODQ2MX0.H_BEvxZf9aHItEjybiBKzz5Pn26wbI1jkLUS6VPQp1U';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DatabaseImage {
  id: string;
  title: string;
  category: string;
  url: string;
  file_name?: string;
  format?: string;
  created_at?: string;
}

export const useDatabaseImages = (category?: string, limit: number = 10) => {
  const [images, setImages] = useState<DatabaseImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from('cloudinary_images')
          .select('*')
          .order('created_at', { ascending: false });

        if (category && category !== 'all') {
          query = query.eq('category', category);
        }

        const { data, error } = await query.limit(limit);

        if (error) {
          console.error('Error fetching images:', error);
          setError(error.message);
        } else {
          setImages(data || []);
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category, limit]);

  return { images, loading, error };
};

// Helper function to get a random image from database
export const getRandomImage = async (category?: string): Promise<DatabaseImage | null> => {
  try {
    let query = supabase
      .from('cloudinary_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    
    if (error || !data || data.length === 0) {
      console.error('Error fetching random image:', error);
      return null;
    }

    // Get random image from the results
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
};

// Helper function to get multiple random images
export const getRandomImages = async (count: number, category?: string): Promise<DatabaseImage[]> => {
  try {
    let query = supabase
      .from('cloudinary_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;
    
    if (error || !data || data.length === 0) {
      console.error('Error fetching random images:', error);
      return [];
    }

    // Shuffle and take requested count
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, data.length));
  } catch (err) {
    console.error('Error:', err);
    return [];
  }
};
