
import React from 'react';
import { BellIcon, ChevronDownIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Bem-vindo, Usuário!</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Aqui está um resumo do seu negócio.</p>
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400">
          <BellIcon className="w-6 h-6" />
          <span className="absolute top-0 right-0 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        </button>
        <div className="flex items-center space-x-2">
          <img 
            src="https://picsum.photos/40" 
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">Minha Empresa</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Usuário Admin</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;