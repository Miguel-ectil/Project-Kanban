import { useState, useEffect } from 'react';

interface MessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Define o tempo em segundos para a mensagem desaparecer
  const autoCloseDuration = 5000; // 5 segundos

  const getColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Use useEffect para fechar a mensagem automaticamente após o tempo definido
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDuration);

    // Limpar o timer caso o componente seja desmontado
    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 w-80 p-4 rounded-md text-white ${getColor()}`}>
        <div className="flex justify-between items-center">
          <p>{message}</p>
          <button onClick={() => setIsVisible(false)} className="ml-2 text-white focus:outline-none">
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default Message;
