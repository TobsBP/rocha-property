export type PropertyStatus = 'active' | 'pending' | 'sold' | 'draft'

export type PropertyType =
  | 'casa'
  | 'apartamento'
  | 'terreno'
  | 'cobertura'
  | 'loft'
  | 'comercial'

export type TransactionType = 'compra' | 'aluguel'
export type LeadType = 'viewing' | 'question' | 'seller'
export type LeadIntent = 'high' | 'medium' | 'low'

export interface Property {
  id: string
  title: string
  description: string
  price: number
  condominiumFee?: number
  type: PropertyType
  transactionType: TransactionType
  status: PropertyStatus
  address: {
    street: string
    neighborhood: string
    city: string
    state: string
  }
  area: number
  bedrooms: number
  bathrooms: number
  parkingSpots: number
  images: string[]
  badge?: 'Exclusivo' | 'Novo' | 'Redução de Preço'
  createdAt: string
  updatedAt: string
}

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  propertyTitle?: string
  type: LeadType
  intent: LeadIntent
  createdAt: string
}

export interface LeadInput {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
}

export interface DashboardMetrics {
  totalListings: number
  totalListingsDelta: number
  activeLeads: number
  activeLeadsDelta: number
  monthlyVolume: number
  monthlyVolumeDelta: number
  conversionRate: number
  conversionData: number[]
}

export interface PropertyFilters {
  intent?: TransactionType
  location?: string
  type?: PropertyType
  bedrooms?: number
  minPrice?: number
  maxPrice?: number
}
