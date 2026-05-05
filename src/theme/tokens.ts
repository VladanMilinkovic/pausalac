export type ThemeMode = "light" | "dark";

type ThemeColors = {
  background: string;
  foreground: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentContrast: string;
  positive: string;
};

type ThemeSpacing = {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
};

type ThemeTypography = {
  fontFamilySans: string;
  fontFamilyMono: string;
  sizeSm: string;
  sizeMd: string;
  sizeLg: string;
  sizeXl: string;
  size2xl: string;
  lineHeightTight: string;
  lineHeightNormal: string;
};

type ThemeSurfaces = {
  page: string;
  card: string;
  elevated: string;
  border: string;
};

type ThemeRadii = {
  sm: string;
  md: string;
  lg: string;
  pill: string;
};

type ThemeShadows = {
  card: string;
};

export type ThemeTokens = {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  surfaces: ThemeSurfaces;
  radii: ThemeRadii;
  shadows: ThemeShadows;
};

const spacingTokens: ThemeSpacing = {
  xxs: "0.125rem",
  xs: "0.25rem",
  sm: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  xl: "1.5rem",
  xxl: "2rem",
};

const typographyTokens: ThemeTypography = {
  fontFamilySans: "var(--font-geist-sans), Inter, Arial, sans-serif",
  fontFamilyMono: "var(--font-geist-mono), ui-monospace, monospace",
  sizeSm: "0.875rem",
  sizeMd: "1rem",
  sizeLg: "1.25rem",
  sizeXl: "1.875rem",
  size2xl: "2.25rem",
  lineHeightTight: "1.2",
  lineHeightNormal: "1.5",
};

const shapeTokens: Pick<ThemeTokens, "radii" | "shadows"> = {
  radii: {
    sm: "0.5rem",
    md: "0.875rem",
    lg: "1.25rem",
    pill: "999px",
  },
  shadows: {
    card: "0 10px 30px rgba(16, 24, 40, 0.08)",
  },
};

export const themeTokens: Record<ThemeMode, ThemeTokens> = {
  light: {
    colors: {
      background: "#f4f7fb",
      foreground: "#ffffff",
      textPrimary: "#0f172a",
      textSecondary: "#334155",
      textMuted: "#64748b",
      accent: "#2563eb",
      accentContrast: "#eff6ff",
      positive: "#16a34a",
    },
    spacing: spacingTokens,
    typography: typographyTokens,
    surfaces: {
      page: "#f4f7fb",
      card: "#ffffff",
      elevated: "#f8fafc",
      border: "#d9e2ec",
    },
    ...shapeTokens,
  },
  dark: {
    colors: {
      background: "#0f172a",
      foreground: "#111c2e",
      textPrimary: "#e2e8f0",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      accent: "#60a5fa",
      accentContrast: "#172554",
      positive: "#4ade80",
    },
    spacing: spacingTokens,
    typography: typographyTokens,
    surfaces: {
      page: "#0b1220",
      card: "#111c2e",
      elevated: "#1b2b44",
      border: "#25364f",
    },
    ...shapeTokens,
  },
};

export function getThemeCssVariables(mode: ThemeMode): Record<string, string> {
  const tokens = themeTokens[mode];

  return {
    "--color-background": tokens.colors.background,
    "--color-foreground": tokens.colors.foreground,
    "--color-text-primary": tokens.colors.textPrimary,
    "--color-text-secondary": tokens.colors.textSecondary,
    "--color-text-muted": tokens.colors.textMuted,
    "--color-accent": tokens.colors.accent,
    "--color-accent-contrast": tokens.colors.accentContrast,
    "--color-positive": tokens.colors.positive,
    "--surface-page": tokens.surfaces.page,
    "--surface-card": tokens.surfaces.card,
    "--surface-elevated": tokens.surfaces.elevated,
    "--surface-border": tokens.surfaces.border,
    "--space-xs": tokens.spacing.xs,
    "--space-sm": tokens.spacing.sm,
    "--space-md": tokens.spacing.md,
    "--space-lg": tokens.spacing.lg,
    "--space-xl": tokens.spacing.xl,
    "--space-xxl": tokens.spacing.xxl,
    "--space-xxs": tokens.spacing.xxs,
    "--font-family-sans": tokens.typography.fontFamilySans,
    "--font-family-mono": tokens.typography.fontFamilyMono,
    "--font-size-sm": tokens.typography.sizeSm,
    "--font-size-md": tokens.typography.sizeMd,
    "--font-size-lg": tokens.typography.sizeLg,
    "--font-size-xl": tokens.typography.sizeXl,
    "--font-size-2xl": tokens.typography.size2xl,
    "--line-height-tight": tokens.typography.lineHeightTight,
    "--line-height-normal": tokens.typography.lineHeightNormal,
    "--radius-sm": tokens.radii.sm,
    "--radius-md": tokens.radii.md,
    "--radius-lg": tokens.radii.lg,
    "--radius-pill": tokens.radii.pill,
    "--shadow-card": tokens.shadows.card,
  };
}
