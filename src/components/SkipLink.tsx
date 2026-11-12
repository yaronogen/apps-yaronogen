export function SkipLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="#main"
      className={`sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg ${className}`}
    >
      Skip to content
    </a>
  );
}
