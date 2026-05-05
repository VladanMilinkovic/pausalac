export type BillingCycle = "monthly" | "yearly";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "CAD" | "AUD" | "JPY";

export type SubscriptionCategory =
  | "entertainment"
  | "productivity"
  | "utilities"
  | "health"
  | "education"
  | "finance"
  | "shopping"
  | "other";

export type ThemePreference = "light" | "dark" | "system";

export type ReminderTiming =
  | "on-due-date"
  | "one-day-before"
  | "three-days-before"
  | "one-week-before";

export type ISODateString = string;

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: CurrencyCode;
  billingCycle: BillingCycle;
  startDate: ISODateString;
  nextBillingDate: ISODateString;
  category: SubscriptionCategory;
  isActive: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface AppSettings {
  theme: ThemePreference;
  notificationsEnabled: boolean;
  reminderTiming: ReminderTiming;
  defaultCurrency: CurrencyCode;
}

export type Settings = AppSettings;
