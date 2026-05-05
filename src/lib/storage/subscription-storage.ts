import {
  appStorage,
  type AppStorage,
  type SubscriptionRecord,
} from "@/lib/storage/app-storage";

export function createSubscriptionStorage(storage: AppStorage = appStorage) {
  return {
    async getAll(): Promise<SubscriptionRecord[]> {
      return storage.get("subscriptions");
    },

    async setAll(subscriptions: SubscriptionRecord[]): Promise<boolean> {
      return storage.set("subscriptions", subscriptions);
    },

    async clear(): Promise<boolean> {
      return storage.clear("subscriptions");
    },
  };
}

export const subscriptionStorage = createSubscriptionStorage();
