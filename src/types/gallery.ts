export interface GalleryImage {
  id: string;
  title: string;
  category: string;
  displayCategory: string;
  url: string;
  size: "small" | "medium" | "large" | "wide" | "tall" | "extraWide" | "extraTall";
  file_name?: string;
  format?: string;
  created_at?: string;
}
