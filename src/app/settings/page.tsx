import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        padding: "var(--space-xxl) var(--space-lg)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "42rem",
          display: "grid",
          gap: "var(--space-xl)",
        }}
      >
        <header>
          <p
            style={{
              margin: 0,
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-sm)",
            }}
          >
            Preferences
          </p>
          <h1
            style={{
              margin: "var(--space-xs) 0 0",
              color: "var(--color-text-primary)",
              fontSize: "var(--font-size-xl)",
              lineHeight: "var(--line-height-tight)",
            }}
          >
            Settings
          </h1>
        </header>

        <article
          style={{
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--surface-card)",
            border: "1px solid var(--surface-border)",
            padding: "var(--space-xl)",
            boxShadow: "var(--shadow-card)",
            display: "grid",
            gap: "var(--space-md)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "var(--color-text-primary)",
              fontSize: "var(--font-size-lg)",
            }}
          >
            Appearance
          </h2>
          <p
            style={{
              margin: 0,
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-md)",
              lineHeight: "var(--line-height-normal)",
            }}
          >
            Choose your preferred color mode. Your choice is saved locally and
            applied across all screens.
          </p>
          <ThemeToggle />
        </article>

        <Link
          href="/"
          style={{
            color: "var(--color-accent)",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "var(--font-size-sm)",
          }}
        >
          ← Back to overview
        </Link>
      </section>
    </main>
  );
}
