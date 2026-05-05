type BrowserStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function getStorage(): BrowserStorage | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

export function readPersistedValue<T>(key: string): T | null {
  const storage = getStorage();

  if (!storage) {
    return null;
  }

  const value = storage.getItem(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function writePersistedValue<T>(key: string, value: T): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(key, JSON.stringify(value));
}

export function removePersistedValue(key: string): void {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.removeItem(key);
}
