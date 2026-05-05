import Link from "next/link";

import { AppScreenHeader } from "@/components/app-shell";
import { appRoutes } from "@/features/subscriptions/routes";

const spendingByCategory = [
  { label: "Streaming", value: 58 },
  { label: "Productivity", value: 36 },
  { label: "Fitness", value: 19 },
];

export default function SpendingPage() {
  return (
    <section className="space-y-6">
      <AppScreenHeader
        title="Spending details"
        description="See where your recurring spending is concentrated."
      />
      <div className="space-y-3">
        {spendingByCategory.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-900">{item.label}</p>
              <p className="text-sm font-semibold text-slate-700">${item.value}/mo</p>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
        <p className="text-sm text-slate-700">
          Need to adjust a plan? Open a subscription detail then tap edit.
        </p>
        <Link
          href={appRoutes.dashboard}
          className="mt-3 inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Return to dashboard
        </Link>
      </div>
    </section>
  );
}
