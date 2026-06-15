import type { HTMLAttributes } from "react";

export type CardElevation = "none" | "sm" | "md";
export type CardPadding = "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: CardElevation;
  padding?: CardPadding;
}

const ELEVATIONS: Record<CardElevation, string> = {
  none: "shadow-none border border-gray-100",
  sm: "shadow-sm",
  md: "shadow-md",
};

const PADDINGS: Record<CardPadding, string> = {
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
};

/**
 * Design-system Card (props per MCP: elevation none|sm|md, padding sm|md|lg).
 */
export default function Card({
  elevation = "sm",
  padding = "md",
  className = "",
  children,
  ...rest
}: CardProps) {
  return (
    <div
      className={`rounded-lg bg-surface ${ELEVATIONS[elevation]} ${PADDINGS[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
