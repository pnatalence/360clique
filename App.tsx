
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvoiceList from './components/InvoiceList';
import ClientList from './components/ClientList';
import ProductList from './components/ProductList';
import Chatbot from './components/Chatbot';
import { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'invoices':
        return <InvoiceList />;
      case 'clients':
        return <ClientList />;
      case 'products':
        return <ProductList />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default App;
