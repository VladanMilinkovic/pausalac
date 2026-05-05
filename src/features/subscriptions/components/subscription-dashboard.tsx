"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import {
  type CurrencyCode,
  type ReminderTiming,
  type ThemeMode,
  updateSettings,
  useSettingsStore,
} from "@/features/settings/store";
import {
  addSubscription,
  useSubscriptionsStore,
} from "@/features/subscriptions/store";

const currencyOptions: Array<{ code: CurrencyCode; label: string }> = [
  { code: "USD", label: "USD ($)" },
  { code: "EUR", label: "EUR (€)" },
  { code: "GBP", label: "GBP (£)" },
  { code: "CAD", label: "CAD (C$)" },
];

const reminderOptions: Array<{ value: ReminderTiming; label: string }> = [
  { value: "same-day", label: "Same day" },
  { value: "one-day-before", label: "1 day before" },
  { value: "three-days-before", label: "3 days before" },
];

const themeOptions: Array<{ value: ThemeMode; label: string }> = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export function SubscriptionDashboard() {
  const settings = useSettingsStore();
  const subscriptions = useSubscriptionsStore();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("9.99");
  const [currency, setCurrency] = useState<CurrencyCode>(
    settings.defaultCurrency,
  );
  const previousDefaultCurrency = useRef(settings.defaultCurrency);

  useEffect(() => {
    // Keep the form in sync with default currency unless user changed it.
    if (currency === previousDefaultCurrency.current) {
      setCurrency(settings.defaultCurrency);
    }

    previousDefaultCurrency.current = settings.defaultCurrency;
  }, [currency, settings.defaultCurrency]);

  const formattedSubscriptions = useMemo(
    () =>
      subscriptions.map((subscription) => ({
        ...subscription,
        formattedAmount: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: subscription.currency,
        }).format(subscription.amount),
      })),
    [subscriptions],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedAmount = Number.parseFloat(amount);

    if (!name.trim() || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      return;
    }

    addSubscription({
      name: name.trim(),
      amount: parsedAmount,
      currency,
    });

    setName("");
    setAmount("9.99");
    setCurrency(settings.defaultCurrency);
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <h1 className="text-3xl font-semibold">Subscriptions</h1>

      <section className="rounded-2xl border border-black/10 p-6 dark:border-white/20">
        <h2 className="mb-4 text-xl font-semibold">Settings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            Theme mode
            <select
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              value={settings.themeMode}
              onChange={(event) =>
                updateSettings({ themeMode: event.target.value as ThemeMode })
              }
            >
              {themeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Reminder timing
            <select
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              value={settings.reminderTiming}
              onChange={(event) =>
                updateSettings({
                  reminderTiming: event.target.value as ReminderTiming,
                })
              }
            >
              {reminderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-2">
            Default currency
            <select
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              value={settings.defaultCurrency}
              onChange={(event) =>
                updateSettings({
                  defaultCurrency: event.target.value as CurrencyCode,
                })
              }
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(event) =>
                updateSettings({ notificationsEnabled: event.target.checked })
              }
            />
            Notifications enabled
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 p-6 dark:border-white/20">
        <h2 className="mb-4 text-xl font-semibold">Add subscription</h2>
        <form className="grid gap-4 md:grid-cols-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 md:col-span-2">
            Name
            <input
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              placeholder="Netflix"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Amount
            <input
              type="number"
              min="0.01"
              step="0.01"
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            Currency
            <select
              className="rounded-md border border-black/20 bg-transparent px-3 py-2"
              value={currency}
              onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
            >
              {currencyOptions.map((option) => (
                <option key={option.code} value={option.code}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="md:col-span-4 rounded-md bg-foreground px-4 py-2 text-background"
          >
            Add Subscription
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-black/10 p-6 dark:border-white/20">
        <h2 className="mb-4 text-xl font-semibold">Current subscriptions</h2>
        {formattedSubscriptions.length === 0 ? (
          <p className="text-sm text-zinc-500">No subscriptions added yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {formattedSubscriptions.map((subscription) => (
              <li
                key={subscription.id}
                className="flex items-center justify-between rounded-md border border-black/10 px-3 py-2 dark:border-white/20"
              >
                <span>{subscription.name}</span>
                <span>{subscription.formattedAmount}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
