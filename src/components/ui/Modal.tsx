import { useEffect, useRef, type ReactNode } from "react";
import Button from "./Button";

export type ModalSize = "sm" | "md" | "lg";

interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title: string;
  size?: ModalSize;
  dismissible?: boolean;
  children: ReactNode;
}

const SIZES: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Design-system Modal (props per MCP: size sm|md|lg, dismissible true|false).
 * Renders nothing when closed; closes on Escape/backdrop when dismissible.
 */
export default function Modal({
  open,
  onClose,
  title,
  size = "md",
  dismissible = true,
  children,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !dismissible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, dismissible, onClose]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-md"
      role="presentation"
      onMouseDown={(e) => {
        if (dismissible && e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="absolute inset-0 bg-gray-900 opacity-50" aria-hidden="true" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`relative w-full ${SIZES[size]} rounded-lg bg-surface shadow-lg focus:outline-none`}
      >
        <header className="flex items-center justify-between border-b border-gray-100 px-lg py-md">
          <h2 className="text-xl font-semibold text-secondary">{title}</h2>
          {dismissible && (
            <Button
              variant="secondary"
              size="sm"
              aria-label="Close dialog"
              onClick={onClose}
              className="border-none"
            >
              ✕
            </Button>
          )}
        </header>
        <div className="px-lg py-lg">{children}</div>
      </div>
    </div>
  );
}
