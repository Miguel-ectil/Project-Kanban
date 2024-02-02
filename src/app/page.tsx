'use client'
import { useState } from "react";
import { motion } from "framer-motion";

const Card = ({ id, title, text, footer, priority, index, columnIndex, moveCard }: any) => {
  return (
    <motion.div
      initial={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      animate={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      exit={{ opacity: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", scale: 1 }}
      drag="x"
      dragConstraints={{ left: -Infinity, right: Infinity }}
      dragElastic={1}
      onDragEnd={(event, info) => moveCard({ id, index, columnIndex, dragDistance: info.offset.x })}
      className="border-[#4E4563] bg-[#4E4563] text-white rounded-lg px-4 py-2 m-2 overflow-hidden"
    >
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{text}</p>
        <div className="flex justify-between items-start mt-1">
          <p className="mt-2"><strong>{footer}</strong></p>
          <p className="border px-2 py-0.5 rounded-2xl">{priority}</p>
        </div>
      </div>
    </motion.div>
  );
};

const dados = [
  {
    id: "1",
    title: "Testar Navegadores",
    text: "Verificar e garantir a compatibilidade da aplicação em diferentes navegadores.",
    footer: "25/11/2023",
    priority: "HIGH",
  },
  {
    id: "2",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "3",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "4",
    title: "Final Project : App development",
    text: "Business Web Development.",
    footer: "Finalizado",
    // priority: "HIGH",
  },
  {
    id: "5",
    title: "Atualizar Bibliotecas",
    text: "Manter as libs atualizadas para garantir segurança e aproveitar novos recursos.",
    footer: "25/12/2023",
    priority: "LOW",
  },
  {
    id: "6",
    title: "Implementar Animações",
    text: "Adicionar efeitos visuais e transiçõespara melhorar a experiência do usuário..",
    footer: "25/12/2023",
    priority: "MEDIUM",
  },
];

const Home = () => {
  const [columns, setColumns] = useState({
    toDo: { name: "To do", items: dados },
    doing: { name: "Doing", items: [] },
    inProgress: { name: "QA", items: [] },
    done: { name: "Done", items: [] },
  });

  const moveCard = ({ id, index, columnIndex, dragDistance }: any) => {
    if (Math.abs(dragDistance) > 100) {
      setColumns((prevColumns: any) => {
        const updatedColumns = { ...prevColumns };
        const sourceColumn = updatedColumns[Object.keys(updatedColumns)[columnIndex]];
        const sourceItems = [...sourceColumn.items];
        const [movedCard] = sourceItems.splice(index, 1);

        let destColumnIndex = columnIndex;

        // Atualizado para permitir o movimento entre colunas sem considerar a direção do arrasto
        destColumnIndex = (columnIndex + Math.sign(dragDistance) + Object.keys(updatedColumns).length) % Object.keys(updatedColumns).length;

        const destColumnName = Object.keys(updatedColumns)[destColumnIndex];

        if (movedCard) {
          const destColumn = updatedColumns[destColumnName];
          const isDuplicate = destColumn.items.some((item: any) => item.id === id);

          if (!isDuplicate) {
            const updatedSourceColumn = { ...sourceColumn, items: sourceItems };
            const updatedDestColumn = { ...destColumn, items: [...destColumn.items, movedCard] };

            updatedColumns[Object.keys(updatedColumns)[columnIndex]] = updatedSourceColumn;
            updatedColumns[destColumnName] = updatedDestColumn;
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
                title={card.title}
                text={card.text}
                footer={card.footer}
                priority={card.priority}
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
};

export default Home;