import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "primary-glow" | "white";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", href, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-full transition-all disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      primary:
        "bg-amber-500 hover:bg-amber-600 text-white shadow-sm hover:shadow-md hover:shadow-amber-500/20",
      "primary-glow":
        "bg-amber-500 hover:bg-amber-400 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:shadow-[0_0_25px_rgba(245,158,11,0.8)]",
      white: "bg-white hover:bg-gray-100 text-gray-900 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "py-1.5 px-4 text-sm",
      md: "py-2 px-6",
      lg: "py-3.5 px-8 font-bold",
    };

    const compClass = cn(baseStyles, variants[variant], sizes[size], className);

    if (href) {
      return (
        <Link href={href} className={compClass}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={compClass} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
