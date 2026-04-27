import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  variant?: "default" | "image" | "text" | "avatar" | "button";
}

function SkeletonCard({ className, variant = "default" }: SkeletonCardProps) {
  const variants = {
    default: "h-48",
    image: "aspect-video",
    text: "h-4 w-full",
    avatar: "h-10 w-10 rounded-full",
    button: "h-10 w-24",
  };

  return (
    <div 
      className={cn(
        "animate-pulse rounded-lg bg-muted/50 skeleton-shimmer", 
        variants[variant],
        className
      )} 
    />
  );
}

function SkeletonGrid({ count = 6, className, children }: { count?: number; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("grid gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{children || <SkeletonCard />}</div>
      ))}
    </div>
  );
}

function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonCard 
          key={i} 
          variant="text" 
          className={i === lines - 1 ? "w-3/4" : "w-full"} 
        />
      ))}
    </div>
  );
}

function SkeletonSection({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 p-6", className)}>
      <SkeletonCard variant="text" className="w-1/3 h-8" />
      <SkeletonText lines={4} />
    </div>
  );
}

export { SkeletonCard, SkeletonGrid, SkeletonText, SkeletonSection };