
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GeminiAction } from '../types';
import { ChatIcon, SendIcon, CloseIcon, SparkIcon } from './icons';
import { getChatbotResponse } from '../services/geminiService';
import { Button } from './ui/Button';
import { Spinner } from './ui/Spinner';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        if(isOpen && messages.length === 0) {
            setMessages([{
                sender: 'bot',
                text: "Olá! Sou seu assistente de faturação. Como posso ajudar? Experimente dizer 'criar fatura para o cliente X'.",
                timestamp: new Date().toISOString()
            }]);
        }
    }, [isOpen, messages.length]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage: ChatMessage = { sender: 'user', text: input, timestamp: new Date().toISOString() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const botResponse = await getChatbotResponse(input, { company_name: "Minha Empresa" });
            
            const botMessage: ChatMessage = {
                sender: 'bot',
                text: botResponse.reply_text,
                actions: botResponse.actions,
                requiresConfirmation: botResponse.requires_confirmation,
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, botMessage]);

        } catch (error) {
            console.error("Error fetching chatbot response:", error);
            const errorMessage: ChatMessage = {
                sender: 'bot',
                text: "Desculpe, ocorreu um erro ao processar seu pedido. Por favor, tente novamente.",
                timestamp: new Date().toISOString(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleActionConfirm = (action: GeminiAction) => {
        const systemMessage: ChatMessage = {
            sender: 'system',
            text: `Ação '${action.type}' confirmada e executada com sucesso!`,
            timestamp: new Date().toISOString(),
        };
        setMessages(prev => [...prev, systemMessage]);
    };


    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-sky-600 text-white p-4 rounded-full shadow-lg hover:bg-sky-700 transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                aria-label="Open chat"
            >
                <ChatIcon className="w-8 h-8" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl flex flex-col z-50 transition-all duration-300 ease-in-out">
            <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-t-2xl">
                <div className="flex items-center">
                    <SparkIcon className="w-6 h-6 text-sky-500 mr-2" />
                    <h3 className="font-bold text-lg">Assistente IA</h3>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                    <CloseIcon className="w-5 h-5" />
                </button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0"><SparkIcon className="w-5 h-5" /></div>}
                        <div className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.sender === 'user' ? 'bg-sky-600 text-white rounded-br-none' : 
                            msg.sender === 'bot' ? 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none' :
                            'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300 text-sm text-center w-full'
                        }`}>
                           <p className="whitespace-pre-wrap">{msg.text}</p>
                           {msg.requiresConfirmation && msg.actions && (
                               <div className="mt-3 pt-3 border-t border-slate-300 dark:border-slate-600 flex gap-2">
                                   {msg.actions.map((action, i) => (
                                      <Button key={i} size="sm" onClick={() => handleActionConfirm(action)}>Confirmar {action.type}</Button>
                                   ))}
                                   <Button size="sm" variant="outline">Cancelar</Button>
                               </div>
                           )}
                        </div>
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0"><SparkIcon className="w-5 h-5" /></div>
                        <div className="max-w-[80%] p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 rounded-bl-none">
                            <Spinner />
                        </div>
                     </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Digite seu comando..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500"
                        disabled={isLoading}
                    />
                    <button onClick={handleSend} disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-sky-600 text-white rounded-full hover:bg-sky-700 disabled:bg-slate-400 disabled:cursor-not-allowed">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
