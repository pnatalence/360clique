
import React from 'react';
import { MOCK_INVOICES } from '../data/mockData';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { PlusIcon } from './icons';

const InvoiceList: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Faturas</h2>
                <Button>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Nova Fatura
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="p-4">Fatura #</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Data de Emissão</th>
                                <th className="p-4">Data de Vencimento</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_INVOICES.map(invoice => (
                                <tr key={invoice.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="p-4 font-medium">{invoice.number}</td>
                                    <td className="p-4">{invoice.client.name}</td>
                                    <td className="p-4">{invoice.date}</td>
                                    <td className="p-4">{invoice.due_date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                            ${invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                              invoice.status === 'issued' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                              invoice.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                              'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                                            }`}
                                        >
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right font-mono">AOA {invoice.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default InvoiceList;
