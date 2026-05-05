"use client";

import { useTheme } from "@/theme/theme-provider";
import type { ThemeMode } from "@/theme/tokens";

type ThemeToggleProps = {
  className?: string;
};

const options: Array<{ mode: ThemeMode; label: string }> = [
  { mode: "light", label: "Light" },
  { mode: "dark", label: "Dark" },
];

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { mode, setMode } = useTheme();

  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        gap: "var(--space-xs)",
        padding: "var(--space-xs)",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--surface-border)",
        backgroundColor: "var(--surface-elevated)",
      }}
      role="group"
      aria-label="Theme switcher"
    >
      {options.map((option) => {
        const isSelected = option.mode === mode;
        return (
          <button
            key={option.mode}
            type="button"
            onClick={() => setMode(option.mode)}
            aria-pressed={isSelected}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: "var(--radius-pill)",
              padding: "calc(var(--space-sm) - var(--space-xxs)) var(--space-md)",
              fontSize: "var(--font-size-sm)",
              fontWeight: 600,
              color: isSelected
                ? "var(--color-accent-contrast)"
                : "var(--color-text-secondary)",
              backgroundColor: isSelected
                ? "var(--color-accent)"
                : "transparent",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
