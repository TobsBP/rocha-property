import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Search, MapPin, Home, Bed, ArrowRight, SquareDashedBottom, Bath, Car, Heart } from 'lucide-react'
import { NavBar } from '#/components/NavBar'
import { Footer } from '#/components/Footer'
import { useProperties } from '#/hooks/useProperties'
import type { Property, TransactionType, PropertyType } from '#/types/property'

export const Route = createFileRoute('/')({ component: HomePage })

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD3gvu9x0XxA1t1soVmGXBkpq52qOwfqjAsLslyVU-F_IjnOPCyOrQLb4TYptF44LmU4BKVX8CBxCpfKBPacwtzxvE5I8rNc-DFt942WViamaluVyuESvzkdjr3aCYlTD_JIz8-xEb2mC_BssDljvSIdsL7tQ4xhdMC-LzIwNA2a01kEWqR_yhQ-8tUUP2n3sTd_UrfOOoXrTOqhut-6gkAqNmCSW6OFCZLiDdQNzA6tMAru0YSKviLmz6ul5a1pyu6QPdQA4mxo68z'
const AGENT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC3bza3BJK1sQDk4MZyzJLseNiv7m6Opd8ojjCHHz7IwT4Jktg2rL8H_SrreJJv_lCFbxIxOJJdXEja65fohBfomLHQa_CqugcMPwZoPHGRolzudrVIs-TJ5ek2hl2DTfyDMRu0mm2Jx4Pm2IQuoFQa2Y7qs3XL5TkLwUq8Kz1JqUWQTi80PB7Sy50-UArCtelWRgrTKk-MqramVVYvNlmP8Qn6XgtpPDiND_UvxCN7IPLg8SAVV_8QSjJHdC_hqJFo0Cz3BkF7-tzn'

function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price)
}

function BadgeChip({ badge }: { badge: NonNullable<Property['badge']> }) {
  const colors: Record<string, string> = {
    Exclusivo: 'bg-primary/90 text-on-primary',
    Novo: 'bg-surface-tint/90 text-on-primary',
    'Redução de Preço': 'bg-tertiary/90 text-on-tertiary',
  }
  return (
    <span className={`${colors[badge]} text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm`}>{badge}</span>
  )
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      to="/imoveis/$id"
      params={{ id: property.id }}
      className="no-underline"
    >
      <article className="bg-surface rounded-xl overflow-hidden card-shadow group cursor-pointer border border-surface-variant hover:-translate-y-1 transition-transform duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-high">
          {property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {property.badge && (
            <div className="absolute top-4 left-4">
              <BadgeChip badge={property.badge} />
            </div>
          )}
          <button className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md p-2 rounded-full text-on-surface-variant hover:text-primary transition-colors shadow-sm">
            <Heart size={18} />
          </button>
        </div>
        <div className="p-4">
          <div className="text-lg font-bold text-primary mb-1">{formatPrice(property.price)}</div>
          <h3 className="text-base font-semibold text-on-surface truncate mb-1">{property.title}</h3>
          <p className="text-sm text-on-surface-variant mb-4 flex items-center gap-1">
            <MapPin size={14} />
            {property.address.neighborhood}, {property.address.city} - {property.address.state}
          </p>
          <div className="flex items-center gap-4 border-t border-surface-variant pt-3 text-on-surface-variant text-xs font-medium">
            <span className="flex items-center gap-1">
              <SquareDashedBottom size={14} /> {property.area}m²
            </span>
            <span className="flex items-center gap-1">
              <Bed size={14} /> {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={14} /> {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Car size={14} /> {property.parkingSpots}
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function PropertyCardSkeleton() {
  return (
    <div className="bg-surface rounded-xl overflow-hidden card-shadow border border-surface-variant animate-pulse">
      <div className="aspect-[4/3] bg-surface-container-high" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-5 bg-surface-container-high rounded w-1/3" />
        <div className="h-4 bg-surface-container-high rounded w-2/3" />
        <div className="h-3 bg-surface-container-high rounded w-1/2" />
        <div className="h-3 bg-surface-container-high rounded mt-2" />
      </div>
    </div>
  )
}

function HeroSection({
  intent,
  setIntent,
}: {
  intent: TransactionType
  setIntent: (v: TransactionType) => void
}) {
  const [location, setLocation] = useState('')
  const [type, setType] = useState<PropertyType | ''>('')
  const [bedrooms, setBedrooms] = useState('')

  return (
    <header className="relative w-full h-[600px] md:h-[819px] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="Imóvel de luxo" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 md:px-10 text-center mt-[-5vh]">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg tracking-tight leading-tight">
          Encontre o imóvel ideal<br className="hidden md:block" /> para sua família
        </h1>
        <p className="text-lg md:text-2xl font-semibold text-surface-container-low max-w-3xl mx-auto mb-8 drop-shadow-md">
          Compra, venda e aluguel de imóveis com segurança e confiança.
        </p>

        <div className="glass-panel rounded-xl p-4 md:p-6 max-w-4xl mx-auto shadow-2xl text-left">
          <div className="flex gap-4 border-b border-outline-variant pb-3 mb-4">
            {(['compra', 'aluguel'] as TransactionType[]).map((v) => (
              <label key={v} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="intent"
                  value={v}
                  checked={intent === v}
                  onChange={() => setIntent(v)}
                  className="accent-primary"
                />
                <span className={`text-sm font-semibold text-on-surface ${intent === v ? 'font-bold' : ''}`}>
                  {v === 'compra' ? 'Comprar' : 'Alugar'}
                </span>
              </label>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="col-span-1 md:col-span-2 relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Cidade ou Bairro"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface"
              />
            </div>
            <div className="col-span-1 relative">
              <Home size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType | '')}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface appearance-none"
              >
                <option value="">Tipo de Imóvel</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                <option value="cobertura">Cobertura</option>
              </select>
            </div>
            <div className="col-span-1 relative">
              <Bed size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-on-surface appearance-none"
              >
                <option value="">Quartos</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary text-sm font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2">
              <Search size={16} />
              Buscar Imóveis
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function FeaturedSection({ properties, isLoading }: { properties: Property[]; isLoading: boolean }) {
  return (
    <section>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-on-surface tracking-tight">Imóveis em Destaque</h2>
          <p className="text-sm text-on-surface-variant mt-1">As melhores oportunidades selecionadas para você.</p>
        </div>
        <a href="#" className="hidden md:flex items-center gap-1 text-primary text-sm font-bold hover:underline">
          Ver todos <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [1, 2, 3].map((i) => <PropertyCardSkeleton key={i} />)
          : properties.map((p) => <PropertyCard key={p.id} property={p} />)}
      </div>

      <div className="mt-4 text-center md:hidden">
        <button className="w-full border border-outline text-on-surface py-3 rounded-lg text-sm font-bold">
          Ver todos os imóveis
        </button>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="bg-surface-container-low rounded-2xl p-6 md:p-10 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        <div className="lg:col-span-5 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-on-surface mb-3 tracking-tight">
            Tradição e Inovação no Mercado Imobiliário
          </h2>
          <p className="text-base text-on-surface-variant mb-6 leading-relaxed">
            A Imóveis Rocha combina décadas de experiência com as mais modernas ferramentas digitais para garantir
            negócios seguros, ágeis e transparentes. Nosso compromisso é encontrar o espaço perfeito para sua história.
          </p>
          <div>
            <button className="bg-primary text-on-primary px-6 py-3 rounded-lg text-sm font-bold hover:bg-on-error-container transition-colors shadow-sm">
              Conheça nossa história
            </button>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
          <div className="bg-surface p-4 rounded-xl card-shadow border border-surface-variant flex flex-col items-center justify-center text-center">
            <span className="text-5xl font-bold text-primary">25+</span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">
              Anos no Mercado
            </span>
          </div>
          <div className="col-span-1 row-span-2 rounded-xl overflow-hidden relative min-h-[200px]">
            <img src={AGENT_IMAGE} alt="Equipe Imóveis Rocha" className="w-full h-full object-cover" />
          </div>
          <div className="bg-surface p-4 rounded-xl card-shadow border border-surface-variant flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-black text-on-surface">5.000+</span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mt-1">
              Imóveis Negociados
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomePage() {
  const [intent, setIntent] = useState<TransactionType>('compra')
  const { data: properties = [], isLoading } = useProperties({ intent })

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-on-background font-[Inter,ui-sans-serif,system-ui,sans-serif] antialiased">
      <NavBar activePage="home" />
      <HeroSection intent={intent} setIntent={setIntent} />
      <main className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-10 md:py-20 flex flex-col gap-20">
        <FeaturedSection properties={properties} isLoading={isLoading} />
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
