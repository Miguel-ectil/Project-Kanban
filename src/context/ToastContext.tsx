import { useState, useEffect } from 'react';

interface MessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const autoCloseDuration = 4000; // 4 segundos

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, []);

  return (
    isVisible && (
      <div
        className={`fixed z-50 top-5 left-1/2 transform -translate-x-1/2 w-96 p-4 rounded-lg text-white ${getColor()} shadow-lg`}
      >
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">{message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 text-white focus:outline-none"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default Message;
