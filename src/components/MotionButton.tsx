"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface MotionButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export const MotionButton = ({ 
  children, 
  variant = "primary",
  className = "",
  ...props 
}: MotionButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-gradient-red text-secondary-foreground hover:opacity-90",
    secondary: "bg-secondary text-secondary-foreground hover:opacity-90",
    outline: "border border-secondary/50 text-secondary hover:bg-secondary/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

interface MotionLinkProps extends HTMLMotionProps<"a"> {
  children: React.ReactNode;
  href: string;
}

export const MotionLink = ({ 
  children, 
  href,
  className = "",
  ...props 
}: MotionLinkProps) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
};