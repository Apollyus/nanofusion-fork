import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  preTitle?: string;
  align?: 'left' | 'center';
  variant?: 'light' | 'dark' | 'default' | 'left';
  swapColors?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  preTitle,
  align = 'center',
  variant = 'dark',
  swapColors = false,
  className
}: SectionHeaderProps) {
  
  return (
    <div className={cn(
      align === 'center' ? "text-center max-w-3xl mx-auto" : "text-left",
      className ?? "mb-16"
    )}>
      {preTitle && (
        <p className={cn(
          "text-xs font-bold tracking-widest uppercase mb-3",
          variant === 'light' ? 'text-gray-400' : (swapColors ? 'text-amber-500' : 'text-slate-600')
        )}>
          {preTitle}
        </p>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold mb-4 font-heading",
        variant === 'light' ? 'text-white' : (swapColors ? 'text-slate-900' : 'text-amber-500')
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "text-lg max-w-2xl font-light leading-relaxed",
          variant === 'light' ? 'text-slate-400' : 'text-slate-600',
          align === 'center' && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
