import { Client, Product, Invoice } from '../types';

// Fix: Corrected MOCK_CLIENTS data structure by adding the missing tax_id to the third client object to satisfy the Client type definition.
export const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'João Silva', email: 'joao.silva@example.com', tax_id: '123456789' },
  { id: '2', name: 'Maria Santos', email: 'maria.santos@example.com', tax_id: '987654321' },
  { id: '3', name: 'Tech Solutions Lda', email: 'contact@techsolutions.pt', tax_id: '501234567' },
];

// Fix: Added and exported MOCK_PRODUCTS to resolve import errors in ProductList.tsx.
export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Desenvolvimento Web', description: 'Criação de website responsivo.', unit_price: 1500, tax_rate: 23 },
  { id: 'p2', name: 'Consultoria SEO', description: 'Otimização para motores de busca.', unit_price: 500, tax_rate: 23 },
  { id: 'p3', name: 'Manutenção Mensal', description: 'Suporte e atualizações de site.', unit_price: 250, tax_rate: 23 },
  { id: 'p4', name: 'Design Gráfico', description: 'Criação de identidade visual.', unit_price: 800, tax_rate: 23 },
];

// Fix: Added and exported MOCK_INVOICES to resolve import errors in Dashboard.tsx and InvoiceList.tsx.
export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    number: '2024-001',
    client: MOCK_CLIENTS[0],
    status: 'paid',
    date: '2024-07-01',
    due_date: '2024-07-31',
    total: 1845,
    lines: [
      { product: MOCK_PRODUCTS[0], quantity: 1, unit_price: 1500, tax_rate: 23, line_total: 1845 },
    ],
  },
  {
    id: 'inv2',
    number: '2024-002',
    client: MOCK_CLIENTS[1],
    status: 'issued',
    date: '2024-07-15',
    due_date: '2024-08-15',
    total: 615,
    lines: [
      { product: MOCK_PRODUCTS[1], quantity: 1, unit_price: 500, tax_rate: 23, line_total: 615 },
    ],
  },
  {
    id: 'inv3',
    number: '2024-003',
    client: MOCK_CLIENTS[2],
    status: 'issued',
    date: '2024-07-20',
    due_date: '2024-08-20',
    total: 307.5,
    lines: [
      { product: MOCK_PRODUCTS[2], quantity: 1, unit_price: 250, tax_rate: 23, line_total: 307.5 },
    ],
  },
  {
    id: 'inv4',
    number: '2024-004',
    client: MOCK_CLIENTS[0],
    status: 'draft',
    date: '2024-07-25',
    due_date: '2024-08-25',
    total: 984,
    lines: [
      { product: MOCK_PRODUCTS[3], quantity: 1, unit_price: 800, tax_rate: 23, line_total: 984 },
    ],
  },
  {
    id: 'inv5',
    number: '2023-050',
    client: MOCK_CLIENTS[2],
    status: 'cancelled',
    date: '2023-12-10',
    due_date: '2024-01-10',
    total: 2152.5,
    lines: [
        { product: MOCK_PRODUCTS[0], quantity: 1, unit_price: 1500, tax_rate: 23, line_total: 1845 },
        { product: MOCK_PRODUCTS[2], quantity: 1, unit_price: 250, tax_rate: 23, line_total: 307.5 },
    ],
  }
];