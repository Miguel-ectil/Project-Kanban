import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiAlarm, BiCheckCircle, BiDotsVertical } from 'react-icons/bi';

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

  const handleMenuClick = () => {
    setShowMenu(!showMenu); // Alterna entre mostrar e esconder o menu
  };

  const handleEdit = () => {
    console.log('Editar card', id);
    // Implementar lógica de edição
  };

  const handleDelete = () => {
    console.log('Deletar card', id);
    // Implementar lógica de exclusão
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: -100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: -100 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1.1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(event, info) => moveCard({ id, index, columnIndex, dragDistance: info.offset.x })}
      className="border-[#4E4563] bg-[#FFFFFF] text-black rounded-lg px-4 py-2.5 m-2 overflow-hidden cursor-grab"
    >
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-2">{title}</h2>
          <BiDotsVertical
            size={24}
            className="cursor-pointer"
            onClick={handleMenuClick}
          />
        </div>

        {showMenu && (
          <div className="absolute top-0 right-0 mt-8 bg-white shadow-lg rounded-lg p-2 w-36">
            <ul>
              <li className="cursor-pointer text-blue-500 hover:text-blue-700" onClick={handleEdit}>Editar</li>
              <li className="cursor-pointer text-red-500 hover:text-red-700 mt-2" onClick={handleDelete}>Deletar</li>
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
    </motion.div>
  );
};

export default KanbanCard;
