import React from "react";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  preTitle?: string;
  variant?: "default" | "dark" | "light" | "left";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  preTitle,
  variant = "default",
  className
}: SectionHeaderProps) {

  const isLeft = variant === "left";

  const titleColor =
    (variant === "default" || variant === "left") ? "text-slate-900" :
      variant === "light" ? "text-white" : "text-slate-900";

  const titleSize = (variant === "default" || variant === "light" || variant === "left") ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl";
  const subtitleColor = variant === "light" ? "text-gray-300" : "text-gray-500";

  const alignClasses = isLeft ? "text-left" : "text-center max-w-3xl mx-auto";

  return (
    <div className={`${alignClasses} ${className ?? 'mb-16'}`}>
      {preTitle && (
        <p className="text-sm font-bold tracking-widest text-amber-500 uppercase mb-3">
          {preTitle}
        </p>
      )}
      <h2 className={`${titleSize} font-extrabold mb-4 ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <div className={`text-lg ${subtitleColor}`}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
