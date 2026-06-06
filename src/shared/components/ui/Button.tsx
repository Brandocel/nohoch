import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[#b4b000] text-[#07343a] hover:bg-[#d2cc12] shadow-lg shadow-black/20",
  secondary:
    "border border-white/40 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md",
  ghost: "text-white hover:bg-white/10",
  dark: "bg-[#05363d] text-white hover:bg-[#07505a]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

export function Button({
  children,
  href,
  className,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full font-bold uppercase tracking-[0.14em] transition duration-300 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}