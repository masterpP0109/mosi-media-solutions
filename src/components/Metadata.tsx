import { useEffect } from 'react';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}

const Metadata = ({
  title = "Mosi Media Solutions - Professional Multimedia Services",
  description = "Leading multimedia agency in Zimbabwe offering video production, professional photography, digital screen solutions, events management, and audio services. Based in Victoria Falls.",
  keywords = "multimedia agency, video production, professional photography, digital screens, events management, audio services, Zimbabwe, Victoria Falls",
  ogTitle,
  ogDescription,
  ogImage = "https://mosimediasolutions.com/og-image.jpg",
  ogUrl
}: MetadataProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Mosi Media Solutions');

    // Open Graph tags
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:image', ogImage, true);
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }

    // Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:site', '@MosiMediaSolutions');
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);
    updateMetaTag('twitter:image', ogImage);

  }, [title, description, keywords, ogTitle, ogDescription, ogImage, ogUrl]);

  return null;
};

export default Metadata;
