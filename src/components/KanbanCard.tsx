import React from 'react';
import { motion } from 'framer-motion';
import { BiAlarm, BiCheckCircle } from 'react-icons/bi';

interface KanbanCardProps {
  id: string;
  title: string;
  text: string;
  finalDate: string;
  priority: string;
  index: number;
  columnIndex: number;
  moveCard: (params: any) => void;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  id,
  title,
  text,
  finalDate,
  priority,
  index,
  columnIndex,
  moveCard
}) => {
  const renderPriorityBadge = () => {
    const priorityColors: Record<string, string> = {
      HIGH: 'red',
      MEDIUM: 'yellow',
      LOW: 'green',
      Finalizado: 'hidden'
    };
    if (finalDate === 'Finalizado') {
      return null;
    }

    return (
      <p className={`mt-2 border border-${priorityColors[priority]}-500 text-${priorityColors[priority]}-500 px-2 py-0 text-sm rounded-2xl`}>
        {priority}
      </p>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.05 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={(event, info) => moveCard({ id, index, columnIndex, dragDistance: info.offset.x })}
      className="border-[#4E4563] bg-[#4E4563] text-white rounded-lg px-4 py-2 m-2 overflow-hidden cursor-grab"
    >
      <div>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm">{text}</p>
        <div className="flex justify-between items-start mt-1">
          <div className='flex space-x-2'>
            {priority === 'HIGH' && (
              <>
                <BiAlarm size={24} className='mt-1.5 text-red-500'/>
                <p className="mt-2 text-red-500"><strong>{finalDate}</strong></p>
              </>
            )}
            {finalDate === 'Finalizado' && (
              <>
                <BiCheckCircle size={24} className='mt-1.5 text-green-500'/>
                <p className="mt-2 text-green-500"><strong>{finalDate}</strong></p>
              </>
            )}
            {finalDate !== 'Finalizado' && priority !== 'HIGH' && (
              <>
                <BiAlarm size={24} className='mt-1.5'/>
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
