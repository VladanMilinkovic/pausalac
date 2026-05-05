import { SubscriptionDashboard } from "@/features/subscriptions/components/subscription-dashboard";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full">
        <SubscriptionDashboard />
      </main>
    </div>
  );
}
