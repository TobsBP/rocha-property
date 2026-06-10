import { api, isApiConfigured } from "#/lib/api";
import { MOCK_METRICS } from "./dashboard.mocks";
import type { DashboardMetrics } from "./dashboard.types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
	if (isApiConfigured) {
		return api.get<DashboardMetrics>("/dashboard/metrics");
	}

	await delay(300);
	return { ...MOCK_METRICS };
}
