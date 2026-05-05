export type SubscriptionId = string;

export type BillingCycle = "monthly" | "yearly";

export type Subscription = {
  id: SubscriptionId;
  name: string;
  amount: number;
  billingCycle: BillingCycle;
  category: string;
  nextBillingDate: string;
  notes?: string;
};

export type SubscriptionDraft = Omit<Subscription, "id">;

export type SubscriptionRouteParams = {
  subscriptionId: SubscriptionId;
};
