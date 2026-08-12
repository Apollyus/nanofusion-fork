import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  preTitle?: string;
  variant?: "default" | "dark" | "light";
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  preTitle,
  variant = "default",
  className
}: SectionHeaderProps) {
  
  const titleColor = 
    variant === "default" ? "text-amber-500" : 
    variant === "light" ? "text-white" : "text-slate-900";
    
  const titleSize = variant === "default" || variant === "light" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
  const subtitleColor = variant === "light" ? "text-gray-300" : "text-gray-500";
  
  return (
    <div className={`text-center max-w-3xl mx-auto ${className ?? 'mb-16'}`}>
      {preTitle && (
        <p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-3">
          {preTitle}
        </p>
      )}
      <h2 className={`${titleSize} font-extrabold mb-4 ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
