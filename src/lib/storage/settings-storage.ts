import { appStorage, type AppSettings, type AppStorage } from "@/lib/storage/app-storage";

export function createSettingsStorage(storage: AppStorage = appStorage) {
  return {
    async get(): Promise<AppSettings> {
      return storage.get("settings");
    },

    async set(settings: AppSettings): Promise<boolean> {
      return storage.set("settings", settings);
    },

    async clear(): Promise<boolean> {
      return storage.clear("settings");
    },
  };
}

export const settingsStorage = createSettingsStorage();
