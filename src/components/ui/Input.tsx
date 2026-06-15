import type { InputHTMLAttributes } from "react";

export type InputSize = "sm" | "md" | "lg";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  type?: "text" | "email" | "password" | "search" | "date";
  size?: InputSize;
}

const SIZES: Record<InputSize, string> = {
  sm: "px-sm text-sm",
  md: "px-md text-md",
  lg: "px-md text-lg",
};

/**
 * Design-system Input (props per MCP: type text|email|password, size sm|md|lg).
 * Always meets the 44px a11y minimum touch target.
 */
export default function Input({
  type = "text",
  size = "md",
  className = "",
  ...rest
}: InputProps) {
  return (
    <input
      type={type}
      className={`min-h-touch w-full rounded-md border border-gray-600 bg-surface text-secondary placeholder:text-gray-600 focus:border-primary focus:outline focus:outline-2 focus:outline-primary disabled:bg-gray-100 ${SIZES[size]} ${className}`}
      {...rest}
    />
  );
}
