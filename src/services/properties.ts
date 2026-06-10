import type { Property, PropertyFilters } from '#/types/property'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Casa Térrea Alphaville',
    description:
      'Espaçosa casa em condomínio fechado com ampla área de lazer, piscina e churrasqueira. Acabamentos de alto padrão e jardim impecável.',
    price: 2450000,
    type: 'casa',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Alameda Principal', neighborhood: 'Alphaville', city: 'Barueri', state: 'SP' },
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB7UJdkaDOQfEOMUKjZRtvJSkaEINOoo3KauL4G5H9sRHCl7byXR6RflMud-v62p9BRr5kK4OPkFp_vMDJ3St6UWT7PR22Hos1G_IR1-SosDN1PQ5gpE7QZkyogDKc960gDUtnn7QcG68C4FOUntDdipsA8o9v6UD1bhFqCaWIyIJAeSTGHF8O-IqtdOou4KKLG1M3E-X0bcQPHVkRAYsD8UFmuuUigg6Nb2Mq1yNAVFpogQTXpchUOLVa8ywTEGQhFch1hOo5UUIPS',
    ],
    badge: 'Exclusivo',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Apartamento Vista Parque',
    description:
      'Apartamento moderno com vista privilegiada para o parque. Living integrado, varanda gourmet e cozinha planejada.',
    price: 1800000,
    condominiumFee: 2800,
    type: 'apartamento',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Rua Oscar Freire', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP' },
    area: 150,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpots: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB06Awz5dI9R7TQ4hU9bTcupKJ0ntB_c9MxEyTMkDF2K39mijwQOkrUwDJItjIf6MvTSjVJCdY0w_CXz0wcU9No4k4indADjdM0hSjM2Dm-BtMB1F4h7N4VvhdaesrCV3WHqf6sUjdwfWUoCZ4Y6uOXdVvYegmosiiannOFGTCZ-VSbLkiHBY4wPNT9y8IVyQxh22Aa0zWXK0MH8967-1neEnq27Dxc5Aq-9_X-1o2VvGcNJ10qcSO9-49CXLFpYxl3EIva_uOwwpVo',
    ],
    badge: 'Novo',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-06-05T10:00:00Z',
  },
  {
    id: '3',
    title: 'Cobertura Duplex Panorâmica',
    description:
      'Exclusiva cobertura duplex com piscina privativa e vista 360° do skyline de São Paulo. Projeto assinado e acabamentos únicos.',
    price: 4200000,
    condominiumFee: 5500,
    type: 'cobertura',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Rua do Paraíso', neighborhood: 'Vila Nova Conceição', city: 'São Paulo', state: 'SP' },
    area: 280,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZiF_m2zK5VPWizc_zX09PjdpPP0i6Owwlb6jRW-hCKefVaFp7GbHd1Gu3hWf93Fbus2j5hxEY3Q64Al_4A-xVWJL1ZQoqzBGeA9OWIP5ugfQDYfcuNq0k-_ZRl193eRC2iJ0li5kvJFYmIflx1Zq4aM4eNncV0AVuODagHd80kw8B5ETPdvwj8uS9bJBi2neYLKjq4tsnD9ExzLGHOnSLHV-YDOVKOmJ49t3CVXVp8BRvDocKWIcEM_oUpK4s8Z1YCq9dd9fq0Bw1',
    ],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-06-10T10:00:00Z',
  },
  {
    id: '4',
    title: 'Apartamento de Luxo no Jardins',
    description:
      'Magnífico apartamento de alto padrão localizado no coração dos Jardins. Com projeto arquitetônico assinado e acabamentos de altíssima qualidade, este imóvel oferece uma experiência de moradia inigualável.\n\nA área social conta com um amplo living para três ambientes integrados a uma varanda gourmet envidraçada, com vista deslumbrante do skyline de São Paulo. O piso em madeira nobre e o projeto luminotécnico criam uma atmosfera sofisticada.\n\nNa área íntima, são 4 dormitórios, sendo 2 suítes plenas. A suíte master possui closet espaçoso e banheiro spa com acabamentos em mármore importado.',
    price: 4500000,
    condominiumFee: 3200,
    type: 'apartamento',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Rua Oscar Freire', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP' },
    area: 240,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBa1Ri12gd_IbRKB2lfW1cZHUqnVHMrG4OAZALgWHgHFRlmcjm2H37WYcy4l7Sm5ZVK_pOIMO8KTIQ3jRReJPywLHBiO_Ikme67obt9D-fI-wGm8GoZzUqTY9npaoEoVrIn0dRkOKU6lFhUkUeqVpM21SLJSPuCx_uyC0JUL0WDph38pCMbrkKTdnDlsq20rt1LE6Os537vPTjxiw9kehL0eDyozWXHdnHLjoiq-KkrGSBOPvuMeBuxkx7GTYlzh1EQmnW01p39op_v',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAa_BQma8G6jrJP3rW0HILp2UIb8cyDx-vcEIGLWwW90QFu6ymZ6cSLuoUFe0SlmzYkPpPA_xd29jStej_9ZgFjQrsDhARPUJ347_0DLJysoPxZod8Ll7-BCtTa76LlebWlOb-Ba-y3EXJYPQNdmdii5zAmvhYsaFC1-IhQYqlU47G4gxx44l9Dwg2NH5KuDdE6ga0VrrAliMS0r17FN-JRLmBKvWqUdS_tmJLgMf3UySNDmaAWDhUnuGsfZN3xiLskGQFc_CSqrt9y',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBC2WSqgKjUfZbAXbPtatX4wTCUbHYeAyqRyMTde1vu8GyR5cZFiw7PcRdtLcDe-RICz6xVj9nZC3wz_32XTGU4udrECCwkmq5G6PO6AcwiXjWgtFIlKcYQLh8eSw67AtMkU3NEsWyPSwHbZ6VF3SRhmrAY2yKBfo4j9b1-jVXPlTX_cMKR0CMd4k2UGulLgnTH8s3rOIiSJRP_UFJe_wE51KUSrs5ojBhDiYHVUwziduu8mQdRZljuynbm_9qo528ua26Een8Ga8Jp',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBoQ6ZAsrL47FmgrSCOEZD_m1nrOAdhexVuTGMQhUUVIFdTrBnp-ZOeImQrBG9b4SxrIws-klYsUowxYFpVbJwv3uooR60ll_tGGUPhDmaR-whBZj-5-GOz_QFfH_xwgkwmWBlq-WHOOU5chsOeMaRYNu8WRnnprbn0l7gkCa8GkRkVRY3TLQa6x1CTWvxT6LLF6WHHoa3slmMjTqN-bMqPxTqA15SpfxgphfJI6eY8yxKjrM-3umlwjw78aCA7ddGdzoKikAQ4ymut',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD_B930COrdWJQiCyIZpBDFVKX3opfnFQDi54vu-ZNPcal6vQ0aLgPd6FkQO1U4xQzfBHuaDjZGuQxlUoZ5bUObv5sHGck6j0uEygV7s0fDlV01g5bLhezdsRfoJm_JlHB89UX-WarDHsiIQrGQjThiXnIKv1AYWvkSRA_-4sDV2NJG16sEr_fyb75BPH5J3EeHHYuxAbSHGQfmVUB5tqJ-CXu1JlsMfow6CqWVbwlaa4u_-6BeJsXU8RL3x0Pe8Hj492qQXNVRS4DN',
    ],
    badge: 'Exclusivo',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-06-12T10:00:00Z',
  },
  {
    id: '5',
    title: 'Cobertura Duplex Itaim Bibi',
    description: 'Cobertura de alto padrão no Itaim Bibi com varanda espaçosa e acabamentos premium.',
    price: 4200000,
    condominiumFee: 4800,
    type: 'cobertura',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Rua Joaquim Floriano', neighborhood: 'Itaim Bibi', city: 'São Paulo', state: 'SP' },
    area: 210,
    bedrooms: 3,
    bathrooms: 4,
    parkingSpots: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmUI9Y1wANcsy22tr3NKN4Z74J_U84L3T0p6VrQwwbbC27L5ip5ww9Tc_0hEbYrii5fgE7uITTj7Grzf-Gjt-829QXIl4nsscsHJkrggya1tSZp3I4V_DfwV6Wxs0fPTZFQD1xxT1VxQknMfs2Yct8DHxT1e5V0Hci8zS_BzW8dAd7sQslwNESsOaXubJF1LcQvXiDc0UHBCNDEENfW2GNvK4GGRjOL-YztJd_Y1bcaDeZulCqhJI2gZRy78DqK12wxSq094iaEmmS',
    ],
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-05-20T10:00:00Z',
  },
  {
    id: '6',
    title: 'Apartamento Clássico Higienópolis',
    description: 'Clássico e elegante apartamento no bairro nobre de Higienópolis com amplas áreas e muito charme.',
    price: 5100000,
    condominiumFee: 5200,
    type: 'apartamento',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Av. Higienópolis', neighborhood: 'Higienópolis', city: 'São Paulo', state: 'SP' },
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCEaiWKTPNJ3_-h21BA4dyGTpmZd39nI4eO7RXGam7vyjJdeyfYSlds-TDgbbiIyL4YJzF3ftt2Vysx7PRjl5MbGp2mf8Bh8wYck8Bxsx8Q_R7tVOBTrXPCwDXVr8dW2X_VD7Tf2uVkgxJdNrQIorLf4h6XwkRXvril8Vo9bsOBSccIDOoPCMIZ6S4TaParxXTi4a0HYclfQoVHYoSfvl2UsIXj2NlHaO4EtYM8qPrfQlOiP6oZfOGjM9MHUhTe3PkvysIgx7PfuHec',
    ],
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-06-08T10:00:00Z',
  },
  {
    id: '7',
    title: 'Loft Contemporâneo Vila Nova',
    description: 'Loft moderno e sofisticado em Vila Nova Conceição, perfeito para quem busca praticidade e estilo.',
    price: 3950000,
    condominiumFee: 3100,
    type: 'loft',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Rua Haiti', neighborhood: 'Vila Nova Conceição', city: 'São Paulo', state: 'SP' },
    area: 180,
    bedrooms: 2,
    bathrooms: 3,
    parkingSpots: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgsy0RKNgwL3T4E5-YnK6RHuaHW3TDYSYTkgYe-ZmjD6UNXBlBQtU3QSiIsa6wm5ucJSTXpnu-Mh-WZz0TFsu_9T75Z--gl2LlKACDOnlq3eH6MuvziHJlhC69rvDgsgXcBolk8v6gdiROZoIYdfRZ4URFNj8KZa3jwNfGNtGAaFI8zcmHRGfZqDYHWGMwQ_Kuck_Rw1FkAldN8d5JbmXMnRCHQtkmx5cP0lPpuC6qCjtJnkDAON7VeoYogV8_WVy8UdQVS6it4-pP',
    ],
    createdAt: '2024-04-01T10:00:00Z',
    updatedAt: '2024-06-11T10:00:00Z',
  },
]

const ADMIN_PROPERTIES: Property[] = [
  {
    id: 'a1',
    title: 'Villa Nova Luxury',
    description: 'Luxuosa villa em condomínio fechado.',
    price: 2450000,
    type: 'casa',
    transactionType: 'compra',
    status: 'active',
    address: { street: 'Alameda Principal', neighborhood: 'Alphaville', city: 'São Paulo', state: 'SP' },
    area: 320,
    bedrooms: 4,
    bathrooms: 5,
    parkingSpots: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHgvP3YYcOgyqajzavCxuGvMT_rnrZSRusk50aKnG6vz_UkF3QR47bFIZXdD0xLzYb9URwl4bKAp0-QOvRLH2WKmGqPplHJoqlTtpIQmemWWm9npFmi40XXpzPFM2OntSv-HqAP2A1S7_URAC50lsN9Yv2QTHrndWVbC0Rb3QvEpunP_bI-DGKyrVPuR3ceSLGq8pqh6DO8UtfSQvBMAi-Kc-D8Pxo9itHArvEulaANsdNh24ge94vd3GXwwA4ks_7C9wJv_eYGchA',
    ],
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-06-01T10:00:00Z',
  },
  {
    id: 'a2',
    title: 'Jardins Penthouse',
    description: 'Cobertura exclusiva nos Jardins.',
    price: 1800000,
    condominiumFee: 2800,
    type: 'cobertura',
    transactionType: 'compra',
    status: 'pending',
    address: { street: 'Rua Oscar Freire', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP' },
    area: 150,
    bedrooms: 3,
    bathrooms: 3,
    parkingSpots: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvXT4nxZOJ6gBiO7GHlCDybQswavduz3jr98Loz3ca8r5A8z2HHdpT9dSn3rRcPW_wxQy3nXPYWpfhW8fEih2zYeb1EgBp6uYd1RPkhoIgH3WVSwCmMpbRUKk6pl5tVQbo4GLK5N3CwnDiAF8iaEHRJewZmivtqInxM181V6yTHoy6FBgYMkX3AVnjwXOqOy16NHbz4ri_yRJXPoU-DuDGFrpLIkITbm6SXNQp9D_1_ah-_IIvERLm4Cdf1h-O727qCgjAHKs2E5Uy',
    ],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-06-02T10:00:00Z',
  },
  {
    id: 'a3',
    title: 'Corporate Office Alto',
    description: 'Escritório corporativo de alto padrão.',
    price: 5200000,
    type: 'comercial',
    transactionType: 'compra',
    status: 'draft',
    address: { street: 'Av. Atlântica', neighborhood: 'Copacabana', city: 'Rio de Janeiro', state: 'RJ' },
    area: 450,
    bedrooms: 0,
    bathrooms: 6,
    parkingSpots: 10,
    images: [],
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-06-03T10:00:00Z',
  },
]

export async function fetchProperties(filters?: PropertyFilters): Promise<Property[]> {
  await delay(300)
  let result = [...MOCK_PROPERTIES]
  if (filters?.intent) result = result.filter((p) => p.transactionType === filters.intent)
  if (filters?.type) result = result.filter((p) => p.type === filters.type)
  if (filters?.bedrooms) result = result.filter((p) => p.bedrooms >= (filters.bedrooms ?? 0))
  if (filters?.minPrice) result = result.filter((p) => p.price >= (filters.minPrice ?? 0))
  if (filters?.maxPrice) result = result.filter((p) => p.price <= (filters.maxPrice ?? Infinity))
  return result.slice(0, 3)
}

export async function fetchProperty(id: string): Promise<Property | null> {
  await delay(200)
  return MOCK_PROPERTIES.find((p) => p.id === id) ?? null
}

export async function fetchSimilarProperties(id: string): Promise<Property[]> {
  await delay(300)
  return MOCK_PROPERTIES.filter((p) => p.id !== id).slice(0, 3)
}

export async function fetchAdminProperties(): Promise<Property[]> {
  await delay(300)
  return ADMIN_PROPERTIES
}
