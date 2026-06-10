import type { DashboardMetrics } from '#/types/property'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

const MOCK_METRICS: DashboardMetrics = {
  totalListings: 1284,
  totalListingsDelta: 12,
  activeLeads: 342,
  activeLeadsDelta: 8,
  monthlyVolume: 4200000,
  monthlyVolumeDelta: 0,
  conversionRate: 4.8,
  conversionData: [30, 50, 40, 70, 90, 60, 80],
}

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  await delay(300)
  return { ...MOCK_METRICS }
}
