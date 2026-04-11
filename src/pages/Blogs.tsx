import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Metadata from "@/components/Metadata";
import Aurora from "@/components/Aurora";
import RippleGrid from "@/components/RippleGrid";
import heroBg from "@/assets/hero-bg.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Future of Digital Marketing in Zimbabwe",
    excerpt: "Explore how digital marketing is evolving in Zimbabwe and how businesses can leverage new technologies to reach their audiences effectively.",
    date: "2024-04-01",
    readTime: "5 min read",
    category: "Digital Marketing",
    image: heroBg,
    featured: true
  },
  {
    id: 2,
    title: "Creating Impactful Video Content for African Brands",
    excerpt: "Learn the secrets behind creating compelling video content that resonates with African audiences and drives engagement.",
    date: "2024-03-28",
    readTime: "7 min read",
    category: "Video Production",
    image: heroBg,
    featured: false
  },
  {
    id: 3,
    title: "Event Photography: Capturing the Perfect Moment",
    excerpt: "A comprehensive guide to event photography techniques and how to ensure your corporate events are documented beautifully.",
    date: "2024-03-25",
    readTime: "6 min read",
    category: "Photography",
    image: heroBg,
    featured: false
  },
  {
    id: 4,
    title: "The Power of Social Media in Business Growth",
    excerpt: "Discover how strategic social media management can transform your business presence and drive measurable growth.",
    date: "2024-03-20",
    readTime: "4 min read",
    category: "Social Media",
    image: heroBg,
    featured: false
  },
  {
    id: 5,
    title: "Audio Production: The Unsung Hero of Multimedia",
    excerpt: "Why professional audio matters in your multimedia projects and how it can elevate your brand's communication.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Audio Production",
    image: heroBg,
    featured: false
  },
  {
    id: 6,
    title: "Victoria Falls: A Destination Marketing Case Study",
    excerpt: "How we've helped position Victoria Falls as Africa's premier adventure destination through strategic multimedia campaigns.",
    date: "2024-03-10",
    readTime: "8 min read",
    category: "Case Study",
    image: heroBg,
    featured: false
  }
];

const categories = ["All", "Digital Marketing", "Video Production", "Photography", "Social Media", "Audio Production", "Case Study"];

const Blogs = () => {
  return (
    <main>
      <Metadata
        title="Blogs - Mosi Media Solutions | Insights & Industry Updates"
        description="Stay updated with the latest trends in multimedia, digital marketing, and creative solutions. Read our expert insights on video production, photography, and more."
        ogUrl="https://mosimediasolutions.com/blogs"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(139,0,0,0.15),transparent_50%),radial-gradient(ellipse_at_30%_70%,rgba(25,25,112,0.25),transparent_50%),#030508]" />
          <Aurora
            colorStops={["#191970","#2F2F5F","#8B0000"]}
            blend={0.85}
            amplitude={1.1}
            speed={1.3}
          />
          <div className="absolute inset-0">
            <RippleGrid
              enableRainbow={false}
              gridColor="#8B0000"
              rippleIntensity={0.015}
              gridSize={10}
              gridThickness={8}
              mouseInteraction={true}
              mouseInteractionRadius={1.8}
              opacity={0.2}
              vignetteStrength={1.2}
              glowIntensity={0.03}
            />
          </div>
        </div>
        
        <div className="relative z-10 container mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary text-sm uppercase tracking-[0.2em] font-medium mb-3">Our Blog</p>
            <h1 className="font-heading text-[40px] md:text-6xl font-[500] mb-6 text-transform capitalize" style={{ color: "#FFFFFF", textShadow: "5px 0px 8px #000000", lineHeight: "1.2em" }}>
              Insights & <span className="text-gradient-brand">Industry Updates</span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "hsl(220 20% 80%)" }}>
              Stay ahead of the curve with our latest thoughts on multimedia, digital marketing, and creative solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-background">
        <div className="container mx-auto">
          {/* Categories */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className="px-4 py-2 rounded-full border border-border hover:border-secondary hover:text-secondary transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post) => (
            <motion.div 
              key={post.id} 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag size={14} />
                        {post.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={14} />
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">{post.title}</h2>
                    <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        to={`/blogs/${post.id}`}
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors"
                      >
                        Read More
                        <ArrowRight size={16} />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post, index) => (
              <motion.article 
                key={post.id} 
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <Link
                      to={`/blogs/${post.id}`}
                      className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
                    >
                      Read More
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for the latest insights, industry trends, and exclusive content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <motion.button 
                className="bg-gradient-red px-6 py-3 rounded-lg font-semibold text-secondary-foreground hover:opacity-90 transition-all hover:bg-[#9B3030]"
                style={{ background: "linear-gradient(135deg, #8B0000, #5C0000)" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Blogs;