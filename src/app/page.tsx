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
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
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
      className="border bg-[#FFFFFF] rounded-lg px-4 py-2"
    >
      {text}
    </animated.div>
  );
};

export default function Home() {
  const [cards, setCards] = useState([
    { id: 1, text: "Testar Navegadores" },
    { id: 2, text: "Atualizar Bibliotecas" },
    { id: 3, text: "Atualizar Bibliotecas" },
    { id: 4, text: "Final Project: App Development" },
  ]);

  const moveCard = (fromIndex: number, toIndex: number) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    setCards(updatedCards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex min-h-screen flex-col items-center justify-between py-32 px-4">
        <div className="grid grid-cols-4 z-10 gap-8">
          {cards.map((card, index) => (
            <div key={index} className="border bg-[#F2F2F2] rounded-lg px-4 py-2">
              <strong className="text-xl">{index === 0 ? "To do" : index === 1 ? "Doing" : index === 2 ? "QA" : "Done"}</strong>
              <Card id={card.id} text={card.text} index={index} moveCard={moveCard} />
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
