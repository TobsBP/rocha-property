import { createFileRoute, Link } from '@tanstack/react-router'
import {
  Building2,
  Users,
  Award,
  BarChart2,
  LogOut,
  Bell,
  Plus,
  Pencil,
  Trash2,
  TrendingUp,
  Minus,
} from 'lucide-react'
import { useDashboardMetrics } from '#/hooks/useDashboard'
import { useAdminProperties } from '#/hooks/useProperties'
import { useLeads } from '#/hooks/useLeads'
import type { Property, Lead, PropertyStatus } from '#/types/property'

export const Route = createFileRoute('/admin')({ component: AdminPage })

const ADMIN_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxrjSktGOUhtcMl3bJouvr0F44M6ZyIcDJnt4Q79rGDhW-6sVTeMDJYo_J7-jY8Roi45-jgS-QuX8zOt7gTjW608VSNB80wD5v3bRdfTbdRMjCZTb818S7_SY_oVdY5DZ_vg4pGrSm7loNH5scU7f7BxC8IKOxV51VBEePfCxGkWHE21TskBRdVDY6yZQoF77QEASZp0pt8OcodCe-Zq4quDy2kdoAWg0z_ZMCh0sv2CR3upAGblw23l0Lo61QoG8QJmO7Q2Ah9T1-'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price)
}

function formatMillions(value: number): string {
  return `R$ ${(value / 1_000_000).toFixed(1)}M`
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffH = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffH < 1) return 'agora'
  if (diffH < 24) return `${diffH}h atrás`
  const diffD = Math.floor(diffH / 24)
  return `${diffD}d atrás`
}

function StatusBadge({ status }: { status: PropertyStatus }) {
  const styles: Record<PropertyStatus, string> = {
    active: 'bg-[#e6f4ea] text-[#137333] border border-[#ceead6]',
    pending: 'bg-[#fff8e1] text-[#f57f17] border border-[#ffecb3]',
    draft: 'bg-surface-container-highest text-on-surface border border-outline-variant',
    sold: 'bg-primary-fixed text-on-primary-fixed border border-outline-variant',
  }
  const labels: Record<PropertyStatus, string> = {
    active: 'Active',
    pending: 'Pending',
    draft: 'Draft',
    sold: 'Sold',
  }
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

function LeadTypeBadge({ type, intent }: { type: Lead['type']; intent?: Lead['intent'] }) {
  const typeLabels: Record<Lead['type'], string> = { viewing: 'Viewing', question: 'Question', seller: 'Seller' }
  return (
    <div className="flex gap-2 flex-wrap">
      <span className="inline-flex items-center px-2 py-1 rounded bg-surface-container-high text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
        {typeLabels[type]}
      </span>
      {intent === 'high' && (
        <span className="inline-flex items-center px-2 py-1 rounded bg-tertiary-fixed text-[11px] font-semibold text-on-tertiary-fixed uppercase tracking-wider">
          High Intent
        </span>
      )}
    </div>
  )
}

function SideNav() {
  const navItems = [
    { icon: <Building2 size={18} />, label: 'Properties', key: 'properties', to: '/' as const },
    { icon: <Users size={18} />, label: 'Leads', key: 'leads', badge: 12, to: '/admin' as const },
    { icon: <Award size={18} />, label: 'Brokers', key: 'brokers', to: '/admin' as const },
    { icon: <BarChart2 size={18} />, label: 'Metrics', key: 'metrics', to: '/admin' as const, active: true },
  ]

  return (
    <nav className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-lg flex flex-col p-4 gap-1 z-50">
      <div className="mb-6 px-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border border-outline-variant flex-shrink-0">
          <img src={ADMIN_AVATAR} alt="Admin" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-primary truncate">Admin Portal</h2>
          <p className="text-xs text-on-surface-variant truncate">Management Console</p>
        </div>
      </div>

      <ul className="flex flex-col gap-1 flex-grow">
        {navItems.map((item) => (
          <li key={item.key}>
            <Link
              to={item.to}
              className={[
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors no-underline',
                item.active
                  ? 'bg-primary-container text-on-primary-container font-bold shadow-sm translate-x-1'
                  : 'text-on-surface-variant hover:bg-surface-variant',
              ].join(' ')}
            >
              {item.icon}
              <span className="text-sm flex-grow">{item.label}</span>
              {item.badge && (
                <span className="bg-error-container text-on-error-container text-xs font-semibold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-surface-variant">
        <button className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors w-full text-left text-sm">
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </nav>
  )
}

function MetricCards() {
  const { data: metrics, isLoading } = useDashboardMetrics()

  const cards = metrics
    ? [
        {
          icon: <Building2 size={22} />,
          label: 'Total Listings',
          value: metrics.totalListings.toLocaleString(),
          delta: metrics.totalListingsDelta,
          deltaPositive: true,
        },
        {
          icon: <Users size={22} />,
          label: 'Active Leads',
          value: metrics.activeLeads.toLocaleString(),
          delta: metrics.activeLeadsDelta,
          deltaPositive: true,
        },
        {
          icon: <span className="text-xl font-bold">R$</span>,
          label: 'Monthly Sales Volume',
          value: formatMillions(metrics.monthlyVolume),
          delta: metrics.monthlyVolumeDelta,
          deltaPositive: false,
        },
        {
          icon: <BarChart2 size={22} />,
          label: 'Conversion Rate',
          value: `${metrics.conversionRate}%`,
          chart: metrics.conversionData,
        },
      ]
    : []

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface rounded-xl border border-surface-variant p-6 h-32 animate-pulse bg-surface-container-high"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-surface rounded-xl border border-surface-variant p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-outline-variant transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface-variant group-hover:text-primary group-hover:bg-primary-fixed transition-colors">
              {card.icon}
            </div>
            {card.delta !== undefined ? (
              <span
                className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full gap-1 ${
                  card.delta > 0
                    ? 'text-tertiary bg-tertiary-fixed'
                    : card.delta < 0
                      ? 'text-error bg-error-container'
                      : 'text-on-surface-variant bg-surface-container-highest'
                }`}
              >
                {card.delta > 0 ? <TrendingUp size={12} /> : <Minus size={12} />}
                {Math.abs(card.delta)}%
              </span>
            ) : null}
          </div>
          <div>
            <p className="text-sm text-on-surface-variant mb-1">{card.label}</p>
            <h3 className="text-4xl font-bold text-on-surface leading-none">{card.value}</h3>
            {card.chart && (
              <div className="flex items-end gap-1 h-12 mt-3 opacity-80">
                {card.chart.map((h, j) => (
                  <div
                    key={j}
                    className={`w-full rounded-t-sm transition-colors ${
                      j === card.chart!.length - 2
                        ? 'bg-primary shadow-[0_0_10px_rgba(162,5,19,0.3)]'
                        : 'bg-surface-container-highest hover:bg-outline-variant'
                    }`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function PropertiesTable() {
  const { data: properties = [], isLoading } = useAdminProperties()

  return (
    <div className="lg:col-span-2 bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
      <div className="p-5 border-b border-surface-variant flex justify-between items-center">
        <h3 className="text-lg font-semibold text-on-surface">Recent Properties</h3>
        <button className="text-sm font-semibold text-primary hover:text-on-primary-fixed-variant transition-colors">
          View All
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-lowest border-b border-surface-variant">
              {['Property', 'Status', 'Price', 'Actions'].map((h, i) => (
                <th
                  key={h}
                  className={`text-xs font-bold text-on-surface-variant py-3 px-5 uppercase tracking-wider ${i === 3 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-variant">
            {isLoading
              ? [1, 2, 3].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-surface-container-high" />
                        <div className="flex flex-col gap-1">
                          <div className="h-3 bg-surface-container-high rounded w-32" />
                          <div className="h-2 bg-surface-container-high rounded w-20" />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="h-6 bg-surface-container-high rounded w-16" />
                    </td>
                    <td className="py-4 px-5">
                      <div className="h-3 bg-surface-container-high rounded w-24" />
                    </td>
                    <td className="py-4 px-5" />
                  </tr>
                ))
              : properties.map((p: Property) => (
                  <tr key={p.id} className="hover:bg-surface-bright transition-colors group">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded bg-surface-container-low overflow-hidden border border-outline-variant flex-shrink-0 flex items-center justify-center">
                          {p.images[0] ? (
                            <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                          ) : (
                            <Building2 size={20} className="text-on-surface-variant" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-on-surface">{p.title}</p>
                          <p className="text-xs text-on-surface-variant">
                            {p.address.city}, {p.address.state}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="py-4 px-5 text-sm text-on-surface">{formatPrice(p.price)}</td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error-container transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LeadsPanel() {
  const { data: leads = [], isLoading } = useLeads()

  return (
    <div className="lg:col-span-1 bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
      <div className="p-5 border-b border-surface-variant flex justify-between items-center">
        <h3 className="text-lg font-semibold text-on-surface">Recent Leads</h3>
        <span className="bg-error-container text-on-error-container text-xs font-semibold px-2 py-0.5 rounded-full">
          New
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 overflow-y-auto flex-grow">
        {isLoading
          ? [1, 2, 3].map((i) => (
              <div key={i} className="p-4 rounded-lg border border-surface-variant animate-pulse">
                <div className="flex justify-between mb-2">
                  <div className="h-3 bg-surface-container-high rounded w-28" />
                  <div className="h-3 bg-surface-container-high rounded w-12" />
                </div>
                <div className="h-2 bg-surface-container-high rounded w-full mb-1" />
                <div className="h-2 bg-surface-container-high rounded w-3/4" />
              </div>
            ))
          : leads.map((lead: Lead) => (
              <div
                key={lead.id}
                className="p-4 rounded-lg border border-surface-variant bg-surface-container-lowest hover:border-primary-fixed-dim transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    {lead.name}
                  </h4>
                  <span className="text-xs text-on-surface-variant">{timeAgo(lead.createdAt)}</span>
                </div>
                <p className="text-xs text-on-surface-variant mb-3 line-clamp-2 leading-relaxed">{lead.message}</p>
                <LeadTypeBadge type={lead.type} intent={lead.intent} />
              </div>
            ))}
      </div>

      <div className="p-4 border-t border-surface-variant">
        <button className="w-full py-2 rounded-lg border border-outline-variant text-on-surface text-sm font-medium hover:bg-surface-container-high transition-colors">
          View Inbox
        </button>
      </div>
    </div>
  )
}

function AdminPage() {
  return (
    <div
      className="min-h-screen bg-[#f9f9f9] text-on-background font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased"
      style={{ overflowX: 'hidden' }}
    >
      <SideNav />

      <main className="ml-64 min-h-screen pb-10">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#f9f9f9]/80 backdrop-blur-md border-b border-surface-variant px-10 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold text-on-surface tracking-tight">Overview</h1>
            <p className="text-sm text-on-surface-variant mt-0.5">
              Here&apos;s what&apos;s happening with your portfolio today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full border border-surface-variant bg-surface flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
            </button>
            <button className="bg-primary text-on-primary text-sm font-medium px-5 py-2 rounded-lg flex items-center gap-2 hover:shadow-[0_4px_14px_rgba(162,5,19,0.3)] hover:-translate-y-0.5 transition-all duration-200">
              <Plus size={18} />
              Add New Property
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-10 max-w-[1600px] mx-auto flex flex-col gap-6">
          <MetricCards />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <PropertiesTable />
            <LeadsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
