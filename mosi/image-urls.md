# Mosi Media Solutions - Image URLs

This document contains all the extracted image URLs from your Cloudinary account organized by category.

## Services (1 image)
```
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/the_Conference_Hall_of_the_Federal_Tax_Service_1_d04ddu.jpg
```

## Portfolio (2 images)
```
https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/creative-designer-photographer-workspace-desk-setup-free-photo_ufgvmv.webp
https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/Captivate-and-Connect-Crafting-Interactive-Social-Media-Posts-That-Works_wczfiv.jpg
```

## Gallery (4 images)
```
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/Image-8-RS-6_i7wkrt.jpg
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/WhatsApp_Image_2026-01-12_at_4.20.30_PM_zys3l5.jpg
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/istockphoto-1492180527-612x612_pome1d.jpg
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/samples_imagecon-group.jpg
```

## Events (3 images)
```
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding-sparkler-machine-grand-entrance-exit-1024x683_xyavvm.jpg
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding_12_cnflkf.jpg
https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/wedding1_dwchv0.jpg
```

## Downloaded Files

The images have been downloaded and organized into the following folders:

- `mosi/services/` - 1 image
- `mosi/portfolio/` - 2 images  
- `mosi/gallery/` - 4 images
- `mosi/events/` - 3 images

## Usage in Frontend

You can now use these URLs in your React components:

```jsx
// Example usage in Services component
const serviceImages = {
  'film-video-production': 'https://res.cloudinary.com/dkdvqimxe/image/upload/v1738286375/the_Conference_Hall_of_the_Federal_Tax_Service_1_d04ddu.jpg'
};

// Example usage in Portfolio component
const portfolioImages = [
  'https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/creative-designer-photographer-workspace-desk-setup-free-photo_ufgvmv.webp',
  'https://res.cloudinary.com/dkdvqimxe/image/upload/v1777252136/Captivate-and-Connect-Crafting-Interactive-Social-Media-Posts-That-Works_wczfiv.jpg'
];
```

## Additional Images

There are 206 additional images in the "other" category available for download if needed. Use the download script to get them:

```bash
node mosi/download-selected-fixed.cjs other [limit]
```

## Summary

- **Total Images Extracted**: 216
- **Downloaded Images**: 10 (categorized)
- **Total Size**: 358.36 MB
- **Available for Download**: 206 additional images

All image URLs are now available for use in your Mosi Media Solutions website!
