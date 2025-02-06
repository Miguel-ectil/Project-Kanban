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
  finalDate: string;
  priority: string;
  index: number;
  columnIndex: number;
  moveCard: (params: any) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  title,
  Description,
  finalDate,
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
        }, 5000);
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
  };

  const renderPriorityBadge = () => {
    const priorityColors: Record<string, string> = {
      HIGH: 'red',
      MEDIUM: 'orange',
      LOW: 'green',
      Finalizado: 'hidden'
    };
    if (finalDate === 'Finalizado') {
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
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-gray-200 p-4 rounded-lg text-center text-black w-1/3">
            <p className="text-lg mb-4">Tem certeza que deseja excluir esta tarefa?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-1.5 rounded-lg w-24">Sim</button>
              <button onClick={cancelDelete} className="bg-gray-500 text-white px-4 py-1.5 rounded-lg">Cancelar</button>
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
        className="border-[#4E4563] bg-[#FFFFFF] text-black rounded-lg px-4 py-2.5 m-2 overflow-hidden cursor-grab"
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
            <div className="absolute top-0 right-0 mt-8 bg-white shadow-lg rounded-lg p-2 w-36">
              <ul>
                <li className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={openEditModal}>Editar</li>
                <li className="cursor-pointer text-red-500 hover:text-red-700 mt-2" onClick={() => setShowConfirmation(true)}>Deletar</li>
              </ul>
            </div>
          )}

          <p className="text-sm">{Description}</p>
          <div className="flex justify-between items-start mt-1">
            <div className="flex space-x-2">
              {priority === 'HIGH' && (
                <>
                  <BiAlarm size={24} className="mt-1.5 text-red-500" />
                  <p className="mt-2 text-red-500"><strong>{finalDate}</strong></p>
                </>
              )}
              {finalDate === 'Finalizado' && (
                <>
                  <BiCheckCircle size={24} className="mt-1.5 text-green-500" />
                  <p className="mt-2 text-green-500"><strong>{finalDate}</strong></p>
                </>
              )}
              {finalDate !== 'Finalizado' && priority !== 'HIGH' && (
                <>
                  <BiAlarm size={24} className="mt-1.5" />
                  <p className="mt-2 "><strong>{finalDate}</strong></p>
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
            finalDate={finalDate} 
            priority={priority}
          />
        )}
      </motion.div>
    </>
  );
};

export default KanbanCard;
