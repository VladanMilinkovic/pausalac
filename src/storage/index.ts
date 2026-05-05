export type StorageKey = "user-settings" | "subscriptions-cache";

export const storageKeys: Record<StorageKey, StorageKey> = {
  "user-settings": "user-settings",
  "subscriptions-cache": "subscriptions-cache",
};
