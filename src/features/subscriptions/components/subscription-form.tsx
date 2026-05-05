"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import type { SubscriptionDraft } from "@/features/subscriptions/types";

type SubscriptionFormProps = {
  mode: "create" | "edit";
  initialValues?: SubscriptionDraft;
};

type FormState = SubscriptionDraft;

function toFormState(initialValues?: SubscriptionDraft): FormState {
  return (
    initialValues ?? {
      name: "",
      amount: 0,
      billingCycle: "monthly",
      category: "",
      nextBillingDate: "",
      notes: "",
    }
  );
}

export function SubscriptionForm({ mode, initialValues }: SubscriptionFormProps) {
  const [formState, setFormState] = useState<FormState>(() =>
    toFormState(initialValues),
  );
  const [isSaved, setIsSaved] = useState(false);

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setFormState((current) => ({ ...current, [field]: value }));
    setIsSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaved(true);
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900">
          {mode === "create" ? "Add Subscription" : "Edit Subscription"}
        </h2>
        <p className="text-sm text-slate-600">
          {mode === "create"
            ? "Create a new subscription profile."
            : "Update your existing subscription details."}
        </p>
      </header>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            value={formState.name}
            onChange={(event) => handleChange("name", event.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Amount</span>
          <input
            type="number"
            min="0"
            step="0.01"
            value={formState.amount}
            onChange={(event) =>
              handleChange("amount", Number.parseFloat(event.target.value) || 0)
            }
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <input
            type="text"
            value={formState.category}
            onChange={(event) => handleChange("category", event.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Billing cycle</span>
          <select
            value={formState.billingCycle}
            onChange={(event) =>
              handleChange("billingCycle", event.target.value as FormState["billingCycle"])
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Next billing date</span>
          <input
            type="date"
            value={formState.nextBillingDate}
            onChange={(event) => handleChange("nextBillingDate", event.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-slate-700">Notes</span>
          <textarea
            rows={3}
            value={formState.notes ?? ""}
            onChange={(event) => handleChange("notes", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-100 transition focus:border-blue-500 focus:ring-2"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          {mode === "create" ? "Add subscription" : "Save changes"}
        </button>
      </form>
      {isSaved ? (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {mode === "create"
            ? "Subscription saved successfully."
            : "Subscription changes saved successfully."}
        </p>
      ) : null}
    </section>
  );
}
