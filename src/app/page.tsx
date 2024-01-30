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
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        // Evitar chamadas múltiplas durante o hover
        if (draggedItem.index !== index - 1 && draggedItem.index !== index + 1) {
          moveCard(draggedItem.index, index, true);
          draggedItem.index = index;
        }
      }
    },
  });

  const style = useSpring({
    opacity: isDragging ? 0.5 : 1,
    transform: isDragging ? "scale(0.95)" : "scale(1)",
  });

  return (
    <animated.div
      ref={(node) => drag(drop(node))}
      style={{ ...style, cursor: "grab" }}
      className="border-[#4E4563] bg-[#4E4563] text-white rounded-lg px-4 py-2"
    >
      {text}
    </animated.div>
  );
};

const dados = [
  { id: 1, text: "Testar Navegadores" },
  { id: 2, text: "Atualizar Bibliotecas" },
  { id: 3, text: "Atualizar Bibliotecas" },
  { id: 4, text: "Final Project: App Development" },
];

export default function Home() {
  const [columns, setColumns] = useState({
    requested: {
      name: "Requested",
      items: dados
    },
    toDo: {
      name: "To do",
      items: [],
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
    const isSameColumn = result.source.droppableId === result.destination.droppableId;

    setColumns((prevColumns) => {
      const updatedColumns = { ...prevColumns };
      const sourceColumn = updatedColumns[result.source.droppableId];
      const destColumn = updatedColumns[result.destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [movedCard] = sourceItems.splice(fromIndex, 1);

      if (isSameColumn) {
        destItems.splice(toIndex, 0, movedCard);
      } else {
        destItems.push({ id: Date.now(), text: movedCard.text });
      }

      return {
        ...updatedColumns,
        [result.source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [result.destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen flex-col items-center justify-between py-32 px-4">
        <div className="grid grid-cols-4 z-10 gap-8">
          {Object.keys(columns).map((columnName, colIndex) => (
            <div key={columnName} className="border-[#4E4563] bg-[#2C243B] rounded-lg px-4 py-2">
              <strong className="text-white text-xl">{columns[columnName].name}</strong>
              {columns[columnName].items.map((card, index) => (
                <Card key={card.id} id={card.id} text={card.text} index={index} moveCard={moveCard} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
