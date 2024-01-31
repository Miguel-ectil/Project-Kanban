'use client'
import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSpring, animated } from "react-spring";

const ItemType = "CARD";

const Card = ({ id, text, index, moveCard }: any) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: () => {
      moveCard({ sourceIndex: index });
    },
  });

  const style = useSpring({
    opacity: isDragging ? 0.7 : 1,
    boxShadow: isDragging ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transform: isDragging ? "scale(0.98)" : "scale(1)",
  });

  return (
    <animated.div
      ref={(node) => drag(drop(node))}
      style={{ ...style, cursor: "grab" }}
      className="border-[#4E4563] bg-[#4E4563] text-white rounded-lg px-4 py-2 m-2"
    >
      {text}
    </animated.div>
  );
};

const dados = [
  { id: "1", text: "Testar Navegadores" },
  { id: "2", text: "Atualizar Bibliotecas" },
  { id: "3", text: "Atualizar Bibliotecas" },
  { id: "4", text: "Implementar Animações" },
  { id: "5", text: "Final Project: App Development" },
];

export default function Home() {
  const [columns, setColumns] = useState({
    requested: {
      name: "Requested",
      items: []
    },
    toDo: {
      name: "To do",
      items: dados
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

  const moveCard = (result: any) => {
    if (!result.destination) return;
  
    const fromIndex = result.source.index;
    const toIndex = result.destination.index;
    const sourceColumnId = result.source.droppableId;
    const destColumnId = result.destination.droppableId;
  
    setColumns((prevColumns: any) => {
      const updatedColumns = { ...prevColumns };
      const sourceItems = [...updatedColumns[sourceColumnId].items];
      const destItems = [...updatedColumns[destColumnId].items];
      const [movedCard] = sourceItems.splice(fromIndex, 1);
  
      // Remover da coluna de origem apenas se a coluna de destino for diferente
      if (sourceColumnId !== destColumnId) {
        updatedColumns[sourceColumnId].items = sourceItems;
        destItems.splice(toIndex, 0, { id: movedCard.id, text: movedCard.text });
        updatedColumns[destColumnId].items = destItems;
      } else {
        // Se a coluna de origem for igual à coluna de destino, apenas reordenar os itens
        destItems.splice(toIndex, 0, movedCard);
        updatedColumns[destColumnId].items = destItems;
      }
  
      return updatedColumns;
    });
  };  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen flex-col items-center justify-between py-32 px-4">
        <div className="grid grid-cols-4 z-10 gap-8">
          {Object.entries(columns).map(([columnName, column], colIndex) => (
            <div key={columnName} className="border-[#4E4563] bg-[#2C243B] rounded-lg px-4 py-2">
              <strong className="text-white text-xl">{column.name}</strong>
              <div>
                {column.items.map((card: any, index: any) => (
                  <Card key={card.id} id={card.id} text={card.text} index={index} moveCard={moveCard} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
