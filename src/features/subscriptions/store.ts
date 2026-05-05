"use client";

import { useSyncExternalStore } from "react";

import { readPersistedValue, writePersistedValue } from "@/lib/storage";
import type { CurrencyCode } from "@/features/settings/store";

export type Subscription = {
  id: string;
  name: string;
  amount: number;
  currency: CurrencyCode;
};

type PersistedSubscription = {
  id?: unknown;
  name?: unknown;
  amount?: unknown;
  currency?: unknown;
};

const SUBSCRIPTIONS_STORAGE_KEY = "pausalac.subscriptions";

let currentSubscriptions: Subscription[] = [];
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  const persisted =
    readPersistedValue<PersistedSubscription[]>(SUBSCRIPTIONS_STORAGE_KEY) ?? [];
  currentSubscriptions = Array.isArray(persisted)
    ? persisted.filter(isValidSubscription).map(normalizeSubscription)
    : [];
}

function isValidCurrencyCode(value: unknown): value is CurrencyCode {
  return value === "USD" || value === "EUR" || value === "GBP" || value === "CAD";
}

function isValidSubscription(
  subscription: PersistedSubscription,
): subscription is Subscription {
  return (
    typeof subscription.id === "string" &&
    typeof subscription.name === "string" &&
    typeof subscription.amount === "number" &&
    Number.isFinite(subscription.amount) &&
    isValidCurrencyCode(subscription.currency)
  );
}

function normalizeSubscription(subscription: Subscription): Subscription {
  return {
    id: subscription.id,
    name: subscription.name,
    amount: subscription.amount,
    currency: subscription.currency,
  };
}

function emitSubscriptionsUpdated(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function getSubscriptions(): Subscription[] {
  return currentSubscriptions;
}

export function addSubscription(
  subscription: Omit<Subscription, "id">,
): Subscription {
  const nextSubscription: Subscription = {
    ...subscription,
    id: crypto.randomUUID(),
  };

  currentSubscriptions = [nextSubscription, ...currentSubscriptions];
  writePersistedValue(SUBSCRIPTIONS_STORAGE_KEY, currentSubscriptions);
  emitSubscriptionsUpdated();

  return nextSubscription;
}

export function subscribeToSubscriptions(listener: () => void): () => void {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function useSubscriptionsStore(): Subscription[] {
  return useSyncExternalStore(
    subscribeToSubscriptions,
    getSubscriptions,
    getSubscriptions,
  );
}
