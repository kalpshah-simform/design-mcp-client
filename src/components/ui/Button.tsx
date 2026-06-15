import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-surface hover:opacity-90 focus-visible:outline-primary",
  secondary:
    "bg-surface text-secondary border border-gray-600 hover:bg-gray-100 focus-visible:outline-secondary",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "px-sm text-sm",
  md: "px-md text-md",
  lg: "px-lg text-lg",
};

/**
 * Design-system Button (props per MCP: variant primary|secondary, size sm|md|lg).
 * Always meets the 44px a11y minimum touch target.
 */
export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-touch items-center justify-center gap-sm rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
