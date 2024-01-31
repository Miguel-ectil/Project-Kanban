'use client'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dados = [
  { id: "1", text: "Testar Navegadores" },
  { id: "2", text: "Atualizar Bibliotecas" },
  { id: "3", text: "Atualizar Bibliotecas" },
  { id: "4", text: "Implementar Animações" },
  { id: "5", text: "Final Project: App Development" },
];

const Card = ({ id, text, index, columnIndex, moveCard }: any) => {
  return (
    <motion.div
      initial={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      animate={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      exit={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(event, info) => moveCard({ id, index, columnIndex, dragDistance: info.point.x })}
      className="border-[#4E4563] bg-[#4E4563] text-white rounded-lg px-4 py-2 m-2"
    >
      {text}
    </motion.div>
  );
};

export default function Home() {
  const [columns, setColumns] = useState({
    requested: {
      name: "Requested",
      items: [],
    },
    toDo: {
      name: "To do",
      items: dados,
    },
    inProgress: {
      name: "Doing",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  });

  const moveCard = ({ id, index, columnIndex, dragDistance }: any) => {
    if (Math.abs(dragDistance) > 100) {
      setColumns((prevColumns: any) => {
        const updatedColumns = { ...prevColumns };
        const sourceItems = [...updatedColumns[Object.keys(columns)[columnIndex]].items];
        const [movedCard] = sourceItems.splice(index, 1);
  
        const destColumnIndex = (dragDistance > 0 ? columnIndex + 1 : columnIndex - 1 + Object.keys(columns).length) % Object.keys(columns).length;
        const destColumnName = Object.keys(columns)[destColumnIndex];
  
        if (movedCard) {
          // Verifica se o item já não está presente na coluna de destino
          const isDuplicate = updatedColumns[destColumnName].items.some((item: any) => item.id === id);
  
          if (!isDuplicate) {
            updatedColumns[Object.keys(columns)[columnIndex]].items = sourceItems;
            updatedColumns[destColumnName].items = [
              ...updatedColumns[destColumnName].items,
              { id, text: movedCard.text },
            ];
          }
        }
  
        return updatedColumns;
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-32 px-4">
      <div className="grid grid-cols-4 z-10 gap-8">
        {Object.entries(columns).map(([columnName, column], colIndex) => (
          <div key={columnName} className="border-[#4E4563] bg-[#2C243B] rounded-lg px-4 py-2">
            <strong className="text-white text-xl">{column.name}</strong>
            <div>
              {column.items.map((card: any, index: any) => (
                <Card
                  key={card.id}
                  id={card.id}
                  text={card.text}
                  index={index}
                  columnIndex={colIndex}
                  moveCard={moveCard}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
