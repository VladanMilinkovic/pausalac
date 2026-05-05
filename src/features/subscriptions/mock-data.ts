import type { Subscription, SubscriptionId } from "./types";

export const subscriptionRecords: Subscription[] = [
  {
    id: "netflix",
    name: "Netflix",
    amount: 15.49,
    billingCycle: "monthly",
    category: "Entertainment",
    nextBillingDate: "2026-05-17",
    notes: "Family plan",
  },
  {
    id: "spotify",
    name: "Spotify",
    amount: 10.99,
    billingCycle: "monthly",
    category: "Music",
    nextBillingDate: "2026-05-12",
    notes: "Duo subscription",
  },
  {
    id: "icloud",
    name: "iCloud+",
    amount: 2.99,
    billingCycle: "monthly",
    category: "Storage",
    nextBillingDate: "2026-05-22",
    notes: "200GB plan",
  },
];

export function getSubscriptionById(
  subscriptionId: SubscriptionId,
): Subscription | undefined {
  return subscriptionRecords.find(
    (subscription) => subscription.id === subscriptionId,
  );
}
