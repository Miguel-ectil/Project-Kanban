import { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

interface MessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
  const [isVisible, setIsVisible] = useState(true);

  const autoCloseDuration = 5000; 

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

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="text-white text-2xl" />;
      case 'error':
        return <FiAlertCircle className="text-white text-2xl" />;
      case 'info':
        return <FiInfo className="text-white text-2xl" />;
      default:
        return null;
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
        className={`fixed z-50 top-5 left-1/2 transform -translate-x-1/2 min-w-xl p-4 rounded-lg text-white ${getColor()} shadow-lg`}
      >
        <div className="flex items-center">
          {getIcon()}
          <p className="ml-4 text-lg font-semibold">{message}</p>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-white focus:outline-none"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default Message;
