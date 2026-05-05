import { type SubscriptionId } from "./types";

export const appRoutes = {
  dashboard: "/dashboard",
  addSubscription: "/subscriptions/new",
  spending: "/spending",
  settings: "/settings",
  subscriptionDetails: (subscriptionId: SubscriptionId) =>
    `/subscriptions/${subscriptionId}`,
  editSubscription: (subscriptionId: SubscriptionId) =>
    `/subscriptions/${subscriptionId}/edit`,
} as const;
