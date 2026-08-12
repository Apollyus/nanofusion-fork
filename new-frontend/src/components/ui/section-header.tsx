import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  preTitle?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function SectionHeader({ 
  title, 
  subtitle, 
  preTitle,
  variant = "default",
  className
}: SectionHeaderProps) {
  
  const titleColor = variant === "default" ? "text-amber-500" : "text-slate-900";
  const titleSize = variant === "default" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
  
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
        <p className="text-lg text-gray-500">
          {subtitle}
        </p>
      )}
    </div>
  );
}
