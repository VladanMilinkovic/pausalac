"use client";

import { useSyncExternalStore } from "react";

import { readPersistedValue, writePersistedValue } from "@/lib/storage";

export type ThemeMode = "system" | "light" | "dark";
export type ReminderTiming = "same-day" | "one-day-before" | "three-days-before";
export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD";

export type Settings = {
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  reminderTiming: ReminderTiming;
  defaultCurrency: CurrencyCode;
};

type PersistedSettings = Partial<Settings>;

const SETTINGS_STORAGE_KEY = "pausalac.settings";

const DEFAULT_SETTINGS: Settings = {
  themeMode: "system",
  notificationsEnabled: true,
  reminderTiming: "one-day-before",
  defaultCurrency: "USD",
};

const currencyCodes = new Set<CurrencyCode>(["USD", "EUR", "GBP", "CAD"]);
const reminderTimings = new Set<ReminderTiming>([
  "same-day",
  "one-day-before",
  "three-days-before",
]);
const themeModes = new Set<ThemeMode>(["system", "light", "dark"]);

function mergeSettingsWithDefaults(
  settings: PersistedSettings | null | undefined,
): Settings {
  if (!settings) {
    return DEFAULT_SETTINGS;
  }

  return {
    themeMode: themeModes.has(settings.themeMode as ThemeMode)
      ? (settings.themeMode as ThemeMode)
      : DEFAULT_SETTINGS.themeMode,
    notificationsEnabled:
      typeof settings.notificationsEnabled === "boolean"
        ? settings.notificationsEnabled
        : DEFAULT_SETTINGS.notificationsEnabled,
    reminderTiming: reminderTimings.has(settings.reminderTiming as ReminderTiming)
      ? (settings.reminderTiming as ReminderTiming)
      : DEFAULT_SETTINGS.reminderTiming,
    defaultCurrency: currencyCodes.has(settings.defaultCurrency as CurrencyCode)
      ? (settings.defaultCurrency as CurrencyCode)
      : DEFAULT_SETTINGS.defaultCurrency,
  };
}

function loadInitialSettings(): Settings {
  const persisted = readPersistedValue<PersistedSettings>(SETTINGS_STORAGE_KEY);
  const settings = mergeSettingsWithDefaults(persisted);

  // Persist defaults immediately on first launch.
  if (!persisted) {
    writePersistedValue(SETTINGS_STORAGE_KEY, settings);
  }

  return settings;
}

let currentSettings: Settings = DEFAULT_SETTINGS;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  currentSettings = loadInitialSettings();
}

function emitSettingsUpdated(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function getSettings(): Settings {
  return currentSettings;
}

export function updateSettings(settingsUpdate: Partial<Settings>): void {
  currentSettings = mergeSettingsWithDefaults({
    ...currentSettings,
    ...settingsUpdate,
  });
  writePersistedValue(SETTINGS_STORAGE_KEY, currentSettings);
  emitSettingsUpdated();
}

export function subscribeToSettings(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function useSettingsStore(): Settings {
  return useSyncExternalStore(subscribeToSettings, getSettings, getSettings);
}

export { DEFAULT_SETTINGS };
