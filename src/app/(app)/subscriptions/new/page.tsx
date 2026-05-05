import { AppScreenHeader } from "@/components/app-shell";
import { SubscriptionForm } from "@/features/subscriptions/components/subscription-form";

export default function AddSubscriptionPage() {
  return (
    <div className="space-y-6">
      <AppScreenHeader
        title="Add subscription"
        description="Track a new service and schedule reminders for upcoming billing."
      />
      <SubscriptionForm mode="create" />
    </div>
  );
}
