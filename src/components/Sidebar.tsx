
import React, { useState } from 'react';
import { Page } from '../types';
import { DashboardIcon, InvoiceIcon, ClientsIcon, ProductsIcon, MenuIcon, SparkIcon } from './icons';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'invoices', label: 'Faturas', icon: <InvoiceIcon /> },
    { id: 'clients', label: 'Clientes', icon: <ClientsIcon /> },
    { id: 'products', label: 'Produtos', icon: <ProductsIcon /> },
  ];

  const NavLink: React.FC<{ pageId: Page; label: string; icon: React.ReactNode }> = ({ pageId, label, icon }) => (
    <li
      onClick={() => setActivePage(pageId)}
      className={`
        flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200
        ${activePage === pageId 
          ? 'bg-sky-600 text-white shadow-md' 
          : 'text-slate-500 hover:bg-sky-100 dark:text-slate-400 dark:hover:bg-slate-700'}
      `}
    >
      <span className="w-6 h-6">{icon}</span>
      {!isCollapsed && <span className="ml-4 font-medium">{label}</span>}
    </li>
  );

  return (
    <nav className={`bg-white dark:bg-slate-800 shadow-lg transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className="flex flex-col h-full p-4">
        <div className={`flex items-center mb-8 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className={`flex items-center ${isCollapsed ? 'hidden' : 'block'}`}>
                <SparkIcon className="w-8 h-8 text-sky-500" />
                <h1 className="text-xl font-bold ml-2 text-slate-800 dark:text-white">Clique 360</h1>
            </div>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <MenuIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </button>
        </div>
        
        <ul>
          {navItems.map(item => (
            <NavLink key={item.id} pageId={item.id as Page} label={item.label} icon={item.icon} />
          ))}
        </ul>

        <div className="mt-auto">
          {/* Future items like settings, logout can go here */}
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;