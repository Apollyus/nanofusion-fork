import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface PillProps extends React.HTMLAttributes<HTMLElement> {
  href?: string;
  icon?: React.ReactNode;
  external?: boolean;
}

export function Pill({ className, href, icon, external, children, ...props }: PillProps) {
  const compClass = cn(
    "inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-sm font-medium transition-colors shadow-sm",
    href && "hover:bg-white/20 hover:shadow-md cursor-pointer",
    className
  );

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={compClass} {...(props as any)}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={compClass} {...(props as any)}>
        {content}
      </Link>
    );
  }

  return (
    <div className={compClass} {...(props as any)}>
      {content}
    </div>
  );
}
