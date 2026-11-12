import type { LegalKind } from "./types";

/** Legal routes under /<product>/, in display order (support has its own page). */
export const LEGAL_PAGES: { kind: Exclude<LegalKind, "support">; label: string }[] = [
  { kind: "terms", label: "Terms of Use" },
  { kind: "privacy", label: "Privacy Policy" },
  { kind: "imprint", label: "Legal notice" },
  { kind: "delete-account", label: "Delete account" },
];
