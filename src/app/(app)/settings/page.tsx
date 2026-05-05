import { AppScreenHeader } from "@/components/app-shell";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AppScreenHeader
        title="Settings"
        description="Manage notifications, billing reminders, and display preferences."
      />
      <section className="space-y-4 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">App Preferences</h2>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="rounded-lg border border-slate-200 px-3 py-2">
            Billing reminders
          </li>
          <li className="rounded-lg border border-slate-200 px-3 py-2">
            Notification channels
          </li>
          <li className="rounded-lg border border-slate-200 px-3 py-2">
            Currency and locale
          </li>
        </ul>
      </section>
    </div>
  );
}
