
import React from 'react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { PlusIcon } from './icons';

const ProductList: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Produtos & Serviços</h2>
                <Button>
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Novo Produto
                </Button>
            </div>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-800">
                            <tr>
                                <th className="p-4">Nome</th>
                                <th className="p-4">Descrição</th>
                                <th className="p-4">Taxa de Imposto</th>
                                <th className="p-4 text-right">Preço Unitário</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_PRODUCTS.map(product => (
                                <tr key={product.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <td className="p-4 font-medium">{product.name}</td>
                                    <td className="p-4 text-slate-500 dark:text-slate-400">{product.description}</td>
                                    <td className="p-4">{product.tax_rate.toFixed(2)}%</td>
                                    <td className="p-4 text-right font-mono">AOA {product.unit_price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ProductList;