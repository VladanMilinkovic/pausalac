import Link from "next/link";

import { appRoutes } from "@/features/subscriptions/routes";
import { subscriptionRecords } from "@/features/subscriptions/mock-data";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Overview of your active subscriptions and quick actions.
        </p>
      </header>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Quick Action
        </h2>
        <Link
          className="mt-3 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          href={appRoutes.addSubscription}
        >
          Add Subscription
        </Link>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
          Active Subscriptions
        </h2>
        <ul className="space-y-3">
          {subscriptionRecords.map((subscription) => (
            <li
              key={subscription.id}
              className="flex flex-col gap-3 rounded-md border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{subscription.name}</p>
                <p className="text-sm text-slate-600">
                  ${subscription.amount.toFixed(2)} / {subscription.billingCycle}
                </p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link
                  className="text-indigo-700 hover:text-indigo-600"
                  href={appRoutes.subscriptionDetails(subscription.id)}
                >
                  View Details
                </Link>
                <Link
                  className="text-slate-700 hover:text-slate-600"
                  href={appRoutes.editSubscription(subscription.id)}
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
