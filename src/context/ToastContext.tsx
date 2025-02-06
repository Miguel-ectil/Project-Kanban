'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: number;
  text: string;
  type: ToastType;
}

interface ToastContextType {
  showMessage: (text: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showMessage = (text: string, type: ToastType = 'info') => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, text, type }]);

    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000); // Remove após 3s
  };

  return (
    <ToastContext.Provider value={{ showMessage }}>
      {children}

      {/* Container de mensagens */}
      <div className="fixed top-5 right-5 flex flex-col gap-2 z-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-4 py-3 text-white rounded-lg shadow-md transition-all ${
              msg.type === 'success' ? 'bg-green-500' :
              msg.type === 'error' ? 'bg-red-500' :
              msg.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
