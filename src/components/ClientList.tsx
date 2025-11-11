
import React from 'react';
import { MOCK_CLIENTS } from '../data/mockData';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { PlusIcon, MailIcon, HashIcon } from './icons';

const ClientList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Clientes</h2>
        <Button>
          <PlusIcon className="w-5 h-5 mr-2" />
          Novo Cliente
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLIENTS.map(client => (
          <Card key={client.id} className="flex flex-col justify-between p-6">
            <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{client.name}</h3>
                <div className="mt-2 space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <p className="flex items-center">
                        <MailIcon className="w-4 h-4 mr-2" />
                        {client.email}
                    </p>
                    <p className="flex items-center">
                        <HashIcon className="w-4 h-4 mr-2" />
                        NIF: {client.tax_id}
                    </p>
                </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button variant="ghost" size="sm">Ver Faturas</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientList;