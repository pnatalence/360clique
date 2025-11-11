
export type Page = 'dashboard' | 'invoices' | 'clients' | 'products';

export interface Company {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: Company;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  tax_id: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  unit_price: number;
  tax_rate: number;
}

export interface InvoiceLine {
  product: Product;
  quantity: number;
  unit_price: number;
  tax_rate: number;
  line_total: number;
}

export interface Invoice {
  id: string;
  number: string;
  client: Client;
  status: 'draft' | 'issued' | 'paid' | 'cancelled';
  date: string;
  due_date: string;
  total: number;
  lines: InvoiceLine[];
}

export type ChatMessage = {
  sender: 'user' | 'bot' | 'system';
  text: string;
  actions?: any[];
  requiresConfirmation?: boolean;
  timestamp: string;
};

export type GeminiAction = {
    type: string;
    confidence: number;
    payload: any;
};

export type GeminiResponse = {
    reply_text: string;
    actions: GeminiAction[];
    requires_confirmation: boolean;
    intent?: string;
    slots?: any;
};
