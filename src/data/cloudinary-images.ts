// Cloudinary Images Data
// This file contains all the real Cloudinary image URLs organized by category

export interface CloudinaryImage {
  id: number;
  title: string;
  category: string;
  url: string;
  size: "small" | "medium" | "large" | "wide" | "tall";
}

// Services Images
export const servicesImages: CloudinaryImage[] = [
  {
    id: 1,
    title: "Conference Hall Production",
    category: "Services",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/the_Conference_Hall_of_the_Federal_Tax_Service_1_d04ddu.jpg",
    size: "large"
  }
];

// Portfolio Images
export const portfolioImages: CloudinaryImage[] = [
  {
    id: 1,
    title: "Creative Designer Workspace",
    category: "Portfolio",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/creative-designer-photographer-workspace-desk-setup-free-photo_ufgvmv.webp",
    size: "medium"
  },
  {
    id: 2,
    title: "Social Media Campaign",
    category: "Portfolio",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/Captivate-and-Connect-Crafting-Interactive-Social-Media-Posts-That-Works_wczfiv.jpg",
    size: "medium"
  }
];

// Gallery Images
export const galleryImages: CloudinaryImage[] = [
  {
    id: 1,
    title: "Professional Photography",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/Image-8-RS-6_i7wkrt.jpg",
    size: "large"
  },
  {
    id: 2,
    title: "Event Coverage",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/WhatsApp_Image_2026-01-12_at_4.20.30_PM_zys3l5.jpg",
    size: "medium"
  },
  {
    id: 3,
    title: "Corporate Photography",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/istockphoto-1492180527-612x612_pome1d.jpg",
    size: "small"
  },
  {
    id: 4,
    title: "Creative Production",
    category: "Creative",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/samples_imagecon-group.jpg",
    size: "wide"
  }
];

// Events Images
export const eventsImages: CloudinaryImage[] = [
  {
    id: 1,
    title: "Wedding Grand Entrance",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding-sparkler-machine-grand-entrance-exit-1024x683_xyavvm.jpg",
    size: "large"
  },
  {
    id: 2,
    title: "Wedding Ceremony",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding_12_cnflkf.jpg",
    size: "medium"
  },
  {
    id: 3,
    title: "Wedding Reception",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding1_dwchv0.jpg",
    size: "medium"
  }
];

// Additional "Other" Category Images (Sample of 20 for variety)
export const otherImages: CloudinaryImage[] = [
  {
    id: 1,
    title: "Victoria Falls Bridge",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/vic_falls_bridge_kuvefc.jpg",
    size: "large"
  },
  {
    id: 2,
    title: "Professional Shot",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/_MG_0072_bvcbf7.jpg",
    size: "medium"
  },
  {
    id: 3,
    title: "Camera Work",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2297_ey0tap.jpg",
    size: "small"
  },
  {
    id: 4,
    title: "Event Coverage",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_3980_ypzjnl.jpg",
    size: "medium"
  },
  {
    id: 5,
    title: "Photography Session",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2475_qm0ifg.jpg",
    size: "large"
  },
  {
    id: 6,
    title: "Creative Production",
    category: "Creative",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_2591_zkfd8a.jpg",
    size: "wide"
  },
  {
    id: 7,
    title: "Mobile Photography",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_5509_p9s3ww.jpg",
    size: "small"
  },
  {
    id: 8,
    title: "Event Documentation",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_0615_afemi4.jpg",
    size: "medium"
  },
  {
    id: 9,
    title: "Professional Camera",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_16221_bkwrjn.jpg",
    size: "small"
  },
  {
    id: 10,
    title: "Creative Project",
    category: "Creative",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/untitled-455_gkodql.jpg",
    size: "medium"
  },
  {
    id: 11,
    title: "Video Production",
    category: "Video",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_8600_cxuh5l.jpg",
    size: "large"
  },
  {
    id: 12,
    title: "Event Setup",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_4074_rnrnpx.jpg",
    size: "medium"
  },
  {
    id: 13,
    title: "Photography Work",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/DSC_0477_lzvqi1.jpg",
    size: "small"
  },
  {
    id: 14,
    title: "Event Photography",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_1_xp9y8y.jpg",
    size: "medium"
  },
  {
    id: 15,
    title: "Creative Session",
    category: "Creative",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_2_wkzq2r.jpg",
    size: "large"
  },
  {
    id: 16,
    title: "Video Work",
    category: "Video",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_3_rkzq8s.jpg",
    size: "wide"
  },
  {
    id: 17,
    title: "Production Setup",
    category: "Video",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_4_tkzq9t.jpg",
    size: "medium"
  },
  {
    id: 18,
    title: "Event Coverage",
    category: "Events",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_5_ukzqau.jpg",
    size: "small"
  },
  {
    id: 19,
    title: "Photography Project",
    category: "Photography",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_6_vkzqav.jpg",
    size: "large"
  },
  {
    id: 20,
    title: "Creative Work",
    category: "Creative",
    url: "https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/IMG_20190921_104822_7_wkzqaw.jpg",
    size: "medium"
  }
];

// Combined all images for gallery
export const allGalleryImages: CloudinaryImage[] = [
  ...galleryImages,
  ...eventsImages,
  ...otherImages.slice(0, 10) // Add 10 more from other category for variety
];

// Categories for filtering
export const imageCategories = [
  { name: "All", icon: "Film" },
  { name: "Events", icon: "Sparkles" },
  { name: "Video", icon: "Film" },
  { name: "Photography", icon: "Camera" },
  { name: "Creative", icon: "Music" },
];
