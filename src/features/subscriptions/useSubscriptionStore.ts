"use client";

import { useSyncExternalStore } from "react";

import {
  createSubscriptionStore,
  type SubscriptionStoreState,
} from "@/features/subscriptions/store";

export const subscriptionStore = createSubscriptionStore();

export function useSubscriptionStore<T>(
  selector: (state: SubscriptionStoreState) => T
): T {
  return useSyncExternalStore(
    subscriptionStore.subscribe,
    () => selector(subscriptionStore.getState()),
    () => selector(subscriptionStore.getState())
  );
}
