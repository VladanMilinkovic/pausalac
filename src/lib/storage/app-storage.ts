import "client-only";

type MaybePromise<T> = T | Promise<T>;

export type SubscriptionBillingCycle = "weekly" | "monthly" | "yearly";

export interface SubscriptionRecord {
  id: string;
  name: string;
  amount: number;
  currency: string;
  billingCycle: SubscriptionBillingCycle;
  renewalDate: string;
  isActive: boolean;
}

export type AppTheme = "system" | "light" | "dark";

export interface AppSettings {
  currency: string;
  notificationsEnabled: boolean;
  theme: AppTheme;
}

export interface AppStorageData {
  subscriptions: SubscriptionRecord[];
  settings: AppSettings;
}

export type AppStorageKey = keyof AppStorageData;

export interface StorageAdapter {
  getItem(key: string): MaybePromise<string | null>;
  setItem(key: string, value: string): MaybePromise<void>;
  removeItem(key: string): MaybePromise<void>;
}

export interface AppStorage {
  get<K extends AppStorageKey>(key: K): Promise<AppStorageData[K]>;
  set<K extends AppStorageKey>(key: K, value: AppStorageData[K]): Promise<boolean>;
  clear(key?: AppStorageKey): Promise<boolean>;
}

interface CreateAppStorageOptions {
  adapter?: StorageAdapter;
  onError?: (
    error: unknown,
    details: { action: "get" | "set" | "clear"; key?: AppStorageKey },
  ) => void;
}

const STORAGE_PREFIX = "pausalac";
const APP_STORAGE_KEYS: AppStorageKey[] = ["subscriptions", "settings"];
const memoryStorage = new Map<string, string>();

const DEFAULT_SETTINGS: AppSettings = {
  currency: "USD",
  notificationsEnabled: true,
  theme: "system",
};

const BILLING_CYCLES: SubscriptionBillingCycle[] = ["weekly", "monthly", "yearly"];
const THEMES: AppTheme[] = ["system", "light", "dark"];

let cachedBrowserStorage: Storage | null | undefined;

function getStorageKey(key: AppStorageKey): string {
  return `${STORAGE_PREFIX}:${key}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isBillingCycle(value: unknown): value is SubscriptionBillingCycle {
  return typeof value === "string" && BILLING_CYCLES.includes(value as SubscriptionBillingCycle);
}

function isTheme(value: unknown): value is AppTheme {
  return typeof value === "string" && THEMES.includes(value as AppTheme);
}

function parseSubscriptions(value: unknown): SubscriptionRecord[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (!isRecord(item)) {
      return [];
    }

    const {
      id,
      name,
      amount,
      currency,
      billingCycle,
      renewalDate,
      isActive,
    } = item;

    if (
      typeof id !== "string" ||
      typeof name !== "string" ||
      typeof amount !== "number" ||
      !Number.isFinite(amount) ||
      typeof currency !== "string" ||
      !isBillingCycle(billingCycle) ||
      typeof renewalDate !== "string" ||
      typeof isActive !== "boolean"
    ) {
      return [];
    }

    return [
      {
        id,
        name,
        amount,
        currency,
        billingCycle,
        renewalDate,
        isActive,
      },
    ];
  });
}

function parseSettings(value: unknown): AppSettings {
  if (!isRecord(value)) {
    return { ...DEFAULT_SETTINGS };
  }

  const parsedSettings: AppSettings = { ...DEFAULT_SETTINGS };

  if (typeof value.currency === "string" && value.currency.length > 0) {
    parsedSettings.currency = value.currency;
  }

  if (typeof value.notificationsEnabled === "boolean") {
    parsedSettings.notificationsEnabled = value.notificationsEnabled;
  }

  if (isTheme(value.theme)) {
    parsedSettings.theme = value.theme;
  }

  return parsedSettings;
}

const valueParsers: { [K in AppStorageKey]: (value: unknown) => AppStorageData[K] } = {
  subscriptions: parseSubscriptions,
  settings: parseSettings,
};

function getDefaultValue<K extends AppStorageKey>(key: K): AppStorageData[K] {
  if (key === "subscriptions") {
    return [] as AppStorageData[K];
  }

  return { ...DEFAULT_SETTINGS } as AppStorageData[K];
}

function resolveBrowserStorage(): Storage | null {
  if (cachedBrowserStorage !== undefined) {
    return cachedBrowserStorage;
  }

  if (typeof window === "undefined") {
    cachedBrowserStorage = null;
    return cachedBrowserStorage;
  }

  try {
    const testKey = "__pausalac_storage_probe__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    cachedBrowserStorage = window.localStorage;
  } catch {
    cachedBrowserStorage = null;
  }

  return cachedBrowserStorage;
}

function createDefaultAdapter(): StorageAdapter {
  return {
    getItem(key) {
      const browserStorage = resolveBrowserStorage();
      if (browserStorage) {
        return browserStorage.getItem(key);
      }

      return memoryStorage.get(key) ?? null;
    },
    setItem(key, value) {
      const browserStorage = resolveBrowserStorage();
      if (browserStorage) {
        browserStorage.setItem(key, value);
        return;
      }

      memoryStorage.set(key, value);
    },
    removeItem(key) {
      const browserStorage = resolveBrowserStorage();
      if (browserStorage) {
        browserStorage.removeItem(key);
        return;
      }

      memoryStorage.delete(key);
    },
  };
}

export function createAppStorage(options: CreateAppStorageOptions = {}): AppStorage {
  const adapter = options.adapter ?? createDefaultAdapter();
  const onError = options.onError ?? (() => undefined);

  return {
    async get<K extends AppStorageKey>(key: K): Promise<AppStorageData[K]> {
      try {
        const rawValue = await adapter.getItem(getStorageKey(key));

        if (rawValue === null) {
          return getDefaultValue(key);
        }

        const parsed = JSON.parse(rawValue);
        return valueParsers[key](parsed);
      } catch (error) {
        onError(error, { action: "get", key });
        return getDefaultValue(key);
      }
    },

    async set<K extends AppStorageKey>(key: K, value: AppStorageData[K]): Promise<boolean> {
      try {
        await adapter.setItem(getStorageKey(key), JSON.stringify(value));
        return true;
      } catch (error) {
        onError(error, { action: "set", key });
        return false;
      }
    },

    async clear(key?: AppStorageKey): Promise<boolean> {
      const keysToClear = key ? [key] : APP_STORAGE_KEYS;

      try {
        await Promise.all(keysToClear.map((item) => adapter.removeItem(getStorageKey(item))));
        return true;
      } catch (error) {
        onError(error, { action: "clear", key });
        return false;
      }
    },
  };
}

export const appStorage = createAppStorage();
