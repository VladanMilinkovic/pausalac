import Link from "next/link";
import { notFound } from "next/navigation";

import { SubscriptionForm } from "@/features/subscriptions/components/subscription-form";
import { getSubscriptionById } from "@/features/subscriptions/mock-data";
import { appRoutes } from "@/features/subscriptions/routes";
import { type SubscriptionRouteParams } from "@/features/subscriptions/types";

type EditSubscriptionPageProps = {
  params: Promise<SubscriptionRouteParams>;
};

export default async function EditSubscriptionPage({
  params,
}: EditSubscriptionPageProps) {
  const { subscriptionId } = await params;
  const subscription = getSubscriptionById(subscriptionId);

  if (!subscription) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Edit Subscription</h1>
          <Link
            href={appRoutes.subscriptionDetails(subscription.id)}
            className="text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          >
            Back to details
          </Link>
        </div>
        <p className="text-sm text-slate-600">
          Reusing the add form with prefilled data for subscription {subscription.id}.
        </p>
      </header>

      <SubscriptionForm
        mode="edit"
        initialValues={{
          name: subscription.name,
          amount: subscription.amount,
          billingCycle: subscription.billingCycle,
          category: subscription.category,
          nextBillingDate: subscription.nextBillingDate,
          notes: subscription.notes,
        }}
      />
    </section>
  );
}
