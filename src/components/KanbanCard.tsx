import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiAlarm, BiCheckCircle, BiDotsVerticalRounded } from 'react-icons/bi';
import NewCard from './newCard';
import axios from 'axios';
import Message from '@/context/ToastContext';

interface KanbanCardProps {
  id: string;
  title: string;
  Description: string;
  final_date: string;
  priority: string;
  index: number;
  columnIndex: number;
  moveCard: (params: any) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  title,
  Description,
  final_date,
  priority,
  index,
  columnIndex,
  moveCard
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleDelete = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.delete(`${apiUrl}/delete-task/${id}`);
      
      if (response) {
        setShowConfirmation(false);
        setMessage('Tarefa excluida com sucesso!');
        setMessageType('success')
        setTimeout(() => {
          window.location.reload();
        }, 4010);
      }
    } catch (error: any) {
      setShowConfirmation(false);
      setMessage('Houve alguma falha ao tentar excluir a tarefa!');
      setMessageType('error')
    }
  };
  const cancelDelete = () => {
    setShowConfirmation(false);
  };
  
  const openEditModal = () => {
    setIsModalOpen(true);
    handleMenuClick()
  };
  const openDellMessage = () => {
    setShowConfirmation(true)
    handleMenuClick()
  };

  const renderPriorityBadge = () => {
    const priorityColors: Record<string, string> = {
      HIGH: 'red',
      MEDIUM: 'orange',
      LOW: 'green',
      Finalizado: 'hidden'
    };
    if (final_date === 'Finalizado') {
      return null;
    }

    const style = {
      border: `1px solid ${priorityColors[priority]}`
    };

    return (
      <p style={style} className={`mt-2 border border-${priorityColors[priority]}-500 text-${priorityColors[priority]}-500 px-2 py-0 text-sm rounded-2xl`}>
        {priority}
      </p>
    );
  };

  return (
    <>
      {message && <Message type={messageType} message={message} />}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate-fade-in px-4">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center text-black w-full max-w-md border border-blue-500">
            <p className="text-lg md:text-xl font-semibold mb-4 text-gray-800">
              Tem certeza que deseja excluir esta tarefa?
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleDelete} 
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg w-28 transition-all duration-300"
              >
                Sim
              </button>
              <button 
                onClick={cancelDelete} 
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg w-28 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.4, y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.5, y: -100 }}
        whileHover={{ scale: 0.98 }}
        whileTap={{ scale: 1 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={(event, info) => moveCard({ id, index, columnIndex, dragDistance: info.offset.x })}
        className="border-[#4E4563] bg-[#FFFFFF] text-black rounded-lg px-4 py-3.5 m-2 overflow-hidden cursor-grab"
      >
        <div className="relative">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-2">{title}</h2>
            <BiDotsVerticalRounded 
              size={24}
              className="cursor-pointer"
              onClick={handleMenuClick}
            />
          </div>

          {showMenu && (
            <div className="absolute top-0 right-0 mt-8 bg-gray-200 shadow-lg rounded-lg p-1 w-36">
              <ul>
                <li className="cursor-pointer text-blue-500 hover:text-white hover:bg-[#4379dde0] border rounded-md px-2 py-0.5" onClick={openEditModal}>Editar</li>
                <li className="cursor-pointer text-red-500 hover:text-white hover:bg-[#d44242d3] border rounded-md px-2 py-0.5" onClick={openDellMessage}>Excluir</li>
              </ul>
            </div>
          )}

          <p className="text-sm">{Description}</p>
          <div className="flex justify-between items-start mt-1">
            <div className="flex space-x-2">
              {priority === 'HIGH' && (
                <>
                  <BiAlarm size={24} className="mt-1.5 text-red-500" />
                  <p className="mt-2 text-red-500"><strong>{final_date}</strong></p>
                </>
              )}
              {final_date === 'Finalizado' && (
                <>
                  <BiCheckCircle size={24} className="mt-1.5 text-green-500" />
                  <p className="mt-2 text-green-500"><strong>{final_date}</strong></p>
                </>
              )}
              {final_date !== 'Finalizado' && priority !== 'HIGH' && (
                <>
                  <BiAlarm size={24} className="mt-1.5" />
                  <p className="mt-2 "><strong>{final_date}</strong></p>
                </>
              )}
            </div>
            {renderPriorityBadge()}
          </div>
        </div>
        {isModalOpen && (
          <NewCard
            onClose={() => setIsModalOpen(false)} // Fecha o modal quando o onClose for chamado
            id={id} 
            titleTask={title} 
            description={Description} 
            final_date={final_date} 
            priority={priority}
          />
        )}
      </motion.div>
    </>
  );
};

export default KanbanCard;
