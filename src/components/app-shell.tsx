"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appRoutes } from "@/features/subscriptions/routes";

type AppShellProps = {
  children: React.ReactNode;
};

type AppScreenHeaderProps = {
  title: string;
  description?: string;
};

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: appRoutes.dashboard, label: "Dashboard" },
  { href: appRoutes.spending, label: "Spending" },
  { href: appRoutes.settings, label: "Settings" },
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Subscription Tracker
            </p>
            <p className="text-lg font-semibold tracking-tight">Navigation Shell</p>
          </div>
          <Link
            href={appRoutes.addSubscription}
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Add Subscription
          </Link>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
        {children}
      </main>

      <footer className="sticky bottom-0 border-t border-slate-200 bg-white/95 p-3 backdrop-blur">
        <nav className="mx-auto flex w-full max-w-5xl gap-2 rounded-2xl bg-slate-100 p-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex-1 rounded-xl px-3 py-2 text-center text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "bg-transparent text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </footer>
    </div>
  );
}

export function AppScreenHeader({ title, description }: AppScreenHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      {description ? <p className="text-sm text-slate-600">{description}</p> : null}
    </header>
  );
}
