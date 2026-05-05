import Link from "next/link";
import { notFound } from "next/navigation";

import { getSubscriptionById } from "@/features/subscriptions/mock-data";
import { appRoutes } from "@/features/subscriptions/routes";
import { type SubscriptionRouteParams } from "@/features/subscriptions/types";

type DetailsPageProps = {
  params: Promise<SubscriptionRouteParams>;
};

export default async function SubscriptionDetailsPage({ params }: DetailsPageProps) {
  const { subscriptionId } = await params;
  const subscription = getSubscriptionById(subscriptionId);

  if (!subscription) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Subscription Details</h1>
        <p className="text-sm text-slate-600">
          Viewing details for subscription ID{" "}
          <span className="font-semibold text-slate-900">{subscription.id}</span>.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <dl className="grid gap-4 sm:grid-cols-2">
          <Detail label="Name" value={subscription.name} />
          <Detail label="Billing Cycle" value={subscription.billingCycle} />
          <Detail label="Amount" value={`$${subscription.amount.toFixed(2)}`} />
          <Detail
            label="Next Billing"
            value={new Date(subscription.nextBillingDate).toLocaleDateString()}
          />
        </dl>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Link
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
          href={appRoutes.editSubscription(subscription.id)}
        >
          Edit Subscription
        </Link>
        <Link
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          href={appRoutes.dashboard}
        >
          Back to Dashboard
        </Link>
      </div>
    </section>
  );
}

type DetailProps = {
  label: string;
  value: string;
};

function Detail({ label, value }: DetailProps) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-900">{value}</dd>
    </div>
  );
}
