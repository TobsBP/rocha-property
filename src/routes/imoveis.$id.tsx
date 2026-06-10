import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import {
  MapPin,
  Share2,
  Heart,
  Images,
  Ruler,
  Bed,
  Bath,
  Car,
  Star,
  Landmark,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'
import { NavBar } from '#/components/NavBar'
import { Footer } from '#/components/Footer'
import { useProperty, useSimilarProperties } from '#/hooks/useProperties'
import { useSubmitLead } from '#/hooks/useLeads'
import type { Property } from '#/types/property'

export const Route = createFileRoute('/imoveis/$id')({ component: PropertyDetailPage })

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price)
}

function calcMonthlyPayment(price: number, downPercent: number, months: number): number {
  const principal = price * (1 - downPercent / 100)
  const r = 0.009
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1)
}

function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const shown = images.slice(0, 5)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[360px] md:h-[614px] rounded-xl overflow-hidden">
      <div
        className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden"
        onClick={() => setActive(0)}
      >
        <img
          src={shown[active] ?? shown[0]}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {shown.slice(1, 5).map((src, i) => (
        <div
          key={i}
          className="hidden md:block relative group cursor-pointer overflow-hidden"
          onClick={() => setActive(i + 1)}
        >
          <img
            src={src}
            alt={`${title} ${i + 2}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {i === 3 && images.length > 5 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <span className="text-white text-lg font-semibold flex items-center gap-2">
                <Images size={20} /> +{images.length - 5} Fotos
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function LeadForm({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState(`Olá, gostaria de mais informações sobre ${propertyTitle}...`)
  const [success, setSuccess] = useState(false)

  const { mutate, isPending } = useSubmitLead()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutate(
      { name, email, phone, message, propertyId },
      { onSuccess: () => setSuccess(true) },
    )
  }

  if (success) {
    return (
      <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant text-center">
        <div className="w-14 h-14 bg-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-3">
          <Star size={24} className="text-on-tertiary-fixed" />
        </div>
        <h3 className="text-lg font-semibold text-on-surface mb-1">Mensagem enviada!</h3>
        <p className="text-sm text-on-surface-variant">Um corretor entrará em contato em breve.</p>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant">
      <h3 className="text-xl font-semibold text-on-surface mb-5">Tenho Interesse</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Nome Completo</label>
          <input
            type="text"
            required
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">E-mail</label>
          <input
            type="email"
            required
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Telefone / WhatsApp</label>
          <input
            type="tel"
            placeholder="(11) 90000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Mensagem</label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-primary hover:bg-on-primary-fixed-variant disabled:opacity-70 text-on-primary py-3 rounded-lg text-base font-semibold shadow-sm hover:shadow-md hover:-translate-y-[1px] transition-all duration-200 mt-1"
        >
          {isPending ? 'Enviando…' : 'Falar com Corretor'}
        </button>
      </form>
    </div>
  )
}

function FinancingSimulator({ price }: { price: number }) {
  const [downPercent, setDownPercent] = useState(20)
  const [months, setMonths] = useState(360)

  const downValue = price * (downPercent / 100)
  const monthly = calcMonthlyPayment(price, downPercent, months)

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant">
      <div className="flex items-center gap-2 mb-5">
        <Landmark size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-on-surface">Simulador de Financiamento</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold text-on-surface-variant">Valor do Imóvel</span>
            <span className="text-xs font-bold text-on-surface">{formatPrice(price)}</span>
          </div>
          <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-full" />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold text-on-surface-variant">Entrada ({downPercent}%)</span>
            <span className="text-xs font-bold text-on-surface">{formatPrice(downValue)}</span>
          </div>
          <input
            type="range"
            min={10}
            max={80}
            value={downPercent}
            onChange={(e) => setDownPercent(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-on-surface-variant mb-1">Prazo (Meses)</label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full rounded-lg border border-outline-variant bg-surface-bright px-3 py-2.5 text-sm text-on-surface focus:border-primary outline-none"
          >
            <option value={360}>360 meses (30 anos)</option>
            <option value={240}>240 meses (20 anos)</option>
            <option value={120}>120 meses (10 anos)</option>
          </select>
        </div>
        <div className="mt-2 p-4 bg-surface-container-low rounded-lg border border-surface-variant flex flex-col items-center">
          <span className="text-xs font-semibold text-on-surface-variant">Parcela Estimada</span>
          <span className="text-2xl font-semibold text-primary mt-1">
            {formatPrice(monthly)}
            <span className="text-sm font-normal text-on-surface-variant">/mês</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function SimilarCard({ property }: { property: Property }) {
  return (
    <Link to="/imoveis/$id" params={{ id: property.id }} className="no-underline">
      <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden group cursor-pointer border border-surface-variant hover:-translate-y-1 transition-transform duration-300">
        <div className="relative h-48 overflow-hidden">
          {property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <button className="absolute top-4 right-4 glass-panel p-2 rounded-full text-on-surface hover:text-primary transition-colors">
            <Heart size={16} />
          </button>
          <div className="absolute bottom-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm px-3 py-1 rounded-md">
            <span className="text-xs font-bold text-primary">{formatPrice(property.price)}</span>
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h4 className="text-base font-semibold text-on-surface truncate">{property.title}</h4>
          <p className="text-xs text-on-surface-variant flex items-center gap-1">
            <MapPin size={12} /> {property.address.neighborhood}, {property.address.city}
          </p>
          <div className="flex items-center gap-4 mt-2 text-on-surface-variant text-xs border-t border-surface-variant pt-3">
            <span className="flex items-center gap-1">
              <Ruler size={12} /> {property.area}m²
            </span>
            <span className="flex items-center gap-1">
              <Bed size={12} /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Car size={12} /> {property.parkingSpots}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

function PropertyDetailPage() {
  const { id } = Route.useParams()
  const { data: property, isLoading } = useProperty(id)
  const { data: similar = [] } = useSimilarProperties(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-[Inter,ui-sans-serif,system-ui,sans-serif]">
        <NavBar activePage="imoveis" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-10">
          <div className="animate-pulse flex flex-col gap-6">
            <div className="h-6 bg-surface-container-high rounded w-48" />
            <div className="h-[400px] bg-surface-container-high rounded-xl" />
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-96 bg-surface-container-high rounded-xl" />
              <div className="h-96 bg-surface-container-high rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] font-[Inter,ui-sans-serif,system-ui,sans-serif]">
        <NavBar activePage="imoveis" />
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 py-20 text-center">
          <h1 className="text-2xl font-semibold text-on-surface mb-2">Imóvel não encontrado</h1>
          <p className="text-on-surface-variant mb-6">O imóvel que você procura não está disponível.</p>
          <Link to="/" className="text-primary font-bold hover:underline no-underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-on-background font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
      <NavBar activePage="imoveis" />

      <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-6 flex flex-col gap-6">
        {/* Breadcrumbs & Quick Actions */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
            <Link to="/" className="hover:text-primary transition-colors no-underline text-on-surface-variant">
              Home
            </Link>
            <ChevronRight size={14} />
            <span className="hover:text-primary transition-colors cursor-pointer">
              {property.address.city}
            </span>
            <ChevronRight size={14} />
            <span className="text-on-surface">{property.address.neighborhood}</span>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant">
              <Share2 size={18} />
            </button>
            <button className="p-2 rounded-full bg-surface-container-low hover:bg-surface-container-high transition-colors text-on-surface-variant">
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} title={property.title} />

        {/* Main Content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
          {/* Left: Details */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full w-fit">
                <Star size={14} />
                <span className="text-xs font-bold uppercase tracking-wider">Exclusividade</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-on-surface-variant text-base">
                <MapPin size={18} />
                <span>
                  {property.address.street}, {property.address.neighborhood} — {property.address.city},{' '}
                  {property.address.state}
                </span>
              </div>
              <div className="mt-1">
                <span className="text-3xl font-semibold text-primary">{formatPrice(property.price)}</span>
                {property.condominiumFee && (
                  <span className="text-sm text-on-surface-variant ml-2">
                    Condomínio: {formatPrice(property.condominiumFee)}/mês
                  </span>
                )}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 bg-surface-container-lowest rounded-xl shadow-sm border border-surface-variant">
              {[
                { icon: <Ruler size={28} className="text-secondary" />, value: `${property.area} m²`, label: 'Área Útil' },
                { icon: <Bed size={28} className="text-secondary" />, value: property.bedrooms, label: `Quartos` },
                { icon: <Bath size={28} className="text-secondary" />, value: property.bathrooms, label: 'Banheiros' },
                { icon: <Car size={28} className="text-secondary" />, value: property.parkingSpots, label: 'Vagas' },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center justify-center p-4 text-center ${i > 0 ? 'border-l border-surface-variant' : ''}`}
                >
                  <div className="mb-2">{m.icon}</div>
                  <span className="text-xl font-semibold text-on-surface">{m.value}</span>
                  <span className="text-xs font-semibold text-on-surface-variant mt-1">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-4">Descrição do Imóvel</h2>
              <div className="text-base text-on-surface-variant leading-relaxed space-y-4">
                {property.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-semibold text-on-surface mb-4">Localização</h2>
              <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-surface-container-high border border-surface-variant relative flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDK43VO3KspVbBnblKD6_bMf_1HLvoUICUZZxtQ-tB0IfAVv87zU_EG6b7M2q8qRDMguSQvoRD9aveO09i5sjjj0tuDRAadpYlCbSa-RAjwerhq4GwdpAf11cBSsIs_g88nomqDXEg-MV2zQij1DUZEUY2E-lgZcStRYu03_zrKS_p2E9VI1IvijOjd6z1UJIT5J-SvzINlLWjJEiSyN6lGtCKHTulI1HujjvSueUZW1etk-APveVQZQsc2YUXX4odVpjY6Xh72rmHW')`,
                  }}
                />
                <div className="z-10 bg-surface/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg text-center">
                  <MapPin size={32} className="text-primary mx-auto mb-2" />
                  <p className="text-lg font-semibold text-on-surface">
                    {property.address.neighborhood}, {property.address.city}
                  </p>
                  <p className="text-sm text-on-surface-variant">Mapa Interativo (Placeholder)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 h-fit">
            <LeadForm propertyId={property.id} propertyTitle={property.title} />
            <FinancingSimulator price={property.price} />
          </div>
        </div>

        {/* Similar Properties */}
        {similar.length > 0 && (
          <div className="mt-6 pt-6 border-t border-surface-variant">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-3xl font-semibold text-on-surface">Imóveis Similares</h2>
              <a href="#" className="text-primary hover:text-on-primary-fixed-variant text-sm font-medium flex items-center gap-1 transition-colors no-underline">
                Ver todos <ArrowRight size={14} />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((p) => (
                <SimilarCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
