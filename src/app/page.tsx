import { redirect } from "next/navigation";

import { appRoutes } from "@/features/subscriptions/routes";

export default function Home() {
  redirect(appRoutes.dashboard);
}
