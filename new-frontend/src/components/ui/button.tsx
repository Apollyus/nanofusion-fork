import * as React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "white";
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
      white: "bg-white hover:bg-gray-100 text-gray-900 shadow-sm hover:shadow-md",
    };

    const sizes = {
      sm: "py-1.5 px-4 text-sm",
      md: "py-2 px-6",
      lg: "py-3.5 px-8 font-bold",
    };

    const compClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`.trim();

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
