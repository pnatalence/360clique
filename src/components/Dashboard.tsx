
import React from 'react';
import { MOCK_INVOICES } from '../data/mockData';
import { Card } from './ui/Card';
import { ArrowUpIcon, DollarSignIcon, UsersIcon, FileTextIcon } from './icons';

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode }> = ({ title, value, change, icon }) => (
    <Card className="p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
                <div className="flex items-center text-sm text-green-500 mt-1">
                    <ArrowUpIcon className="w-4 h-4 mr-1" />
                    <span>{change}</span>
                </div>
            </div>
            <div className="p-3 bg-sky-100 dark:bg-sky-900/50 rounded-full text-sky-500 dark:text-sky-400">
                {icon}
            </div>
        </div>
    </Card>
);

const Dashboard: React.FC = () => {
    const recentInvoices = MOCK_INVOICES.slice(0, 5);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Faturamento Total" value="AOA 1,234.56" change="+20.1% from last month" icon={<DollarSignIcon className="w-6 h-6" />} />
                <StatCard title="Novos Clientes" value="+12" change="+5 from last week" icon={<UsersIcon className="w-6 h-6" />} />
                <StatCard title="Faturas Pendentes" value="8" change="2 overdue" icon={<FileTextIcon className="w-6 h-6" />} />
            </div>

            <Card>
                <h3 className="text-lg font-semibold p-4 border-b border-slate-200 dark:border-slate-700">Faturas Recentes</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="p-4">Fatura #</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Data</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentInvoices.map(invoice => (
                                <tr key={invoice.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="p-4 font-medium">{invoice.number}</td>
                                    <td className="p-4">{invoice.client.name}</td>
                                    <td className="p-4">{invoice.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full
                                            ${invoice.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                              invoice.status === 'issued' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
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

export default Dashboard;