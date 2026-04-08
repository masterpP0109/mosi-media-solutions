import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Metadata from "@/components/Metadata";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Metadata
        title="Page Not Found - Mosi Media Solutions"
        description="The page you're looking for doesn't exist. Return to Mosi Media Solutions homepage for professional multimedia services in Zimbabwe."
        ogUrl="https://mosimediasolutions.com/404"
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
