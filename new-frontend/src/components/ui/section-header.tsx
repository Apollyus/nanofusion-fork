import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-4">
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
