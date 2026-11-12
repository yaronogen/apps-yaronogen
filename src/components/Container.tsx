import type { ReactNode } from "react";

export function Container({ children, className = "", size = "wide" }: { children: ReactNode; className?: string; size?: "wide" | "text" }) {
  const max = size === "text" ? "max-w-3xl" : "max-w-6xl";
  return <div className={`mx-auto w-full ${max} px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
