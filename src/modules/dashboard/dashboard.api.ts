import { api } from "#/lib/api";
import type { DashboardMetrics } from "./dashboard.types";

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
	return api.get<DashboardMetrics>("/dashboard/metrics");
}
