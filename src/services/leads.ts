import type { Lead, LeadInput } from '#/types/property'

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const MOCK_LEADS: Lead[] = [
  {
    id: 'l1',
    name: 'Mariana Costa',
    email: 'mariana.costa@email.com',
    phone: '(11) 99999-1111',
    message: 'Olá, gostaria de agendar uma visita para a Villa Nova Luxury neste fim de semana.',
    propertyId: 'a1',
    propertyTitle: 'Villa Nova Luxury',
    type: 'viewing',
    intent: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'l2',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(11) 99999-2222',
    message: 'Pode me informar os valores do condomínio para o Jardins Penthouse?',
    propertyId: 'a2',
    propertyTitle: 'Jardins Penthouse',
    type: 'question',
    intent: 'medium',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'l3',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(11) 99999-3333',
    message: 'Gostaria de informações sobre avaliação do meu imóvel para venda.',
    type: 'seller',
    intent: 'medium',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
]

export async function fetchLeads(): Promise<Lead[]> {
  await delay(300)
  return [...MOCK_LEADS]
}

export async function submitLead(input: LeadInput): Promise<Lead> {
  await delay(500)
  const lead: Lead = {
    id: `l${Date.now()}`,
    ...input,
    type: 'question',
    intent: 'medium',
    createdAt: new Date().toISOString(),
  }
  return lead
}
