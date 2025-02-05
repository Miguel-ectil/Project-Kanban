'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanCard from '@/components/KanbanCard'; 

const Home = () => {
  const [dadosKanban, setDadosKanban] = useState<any[]>([]);

  useEffect(() => {
    const getDadosKanban = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Carrega a URL da API do .env
        const response = await axios.get(`${apiUrl}/tasks`);

        if (response.data) {
          setDadosKanban(response.data);
        }
      } catch (error: any) {
        console.error('Erro ao obter dados do Kanban:', error.message);
      }
    };

    getDadosKanban();
  }, []); 

  useEffect(() => {
    const distribuirItensNasColunas = () => {
      const colunasAtualizadas: any = {
        toDo: { name: 'Pendente', items: [] },
        doing: { name: 'Fazendo', items: [] },
        inProgress: { name: 'Aprovação', items: [] },
        done: { name: 'Finalizado', items: [] },
      };

      dadosKanban.forEach((item) => {
        switch (item.status) {
          case 'pendente':
            colunasAtualizadas['toDo'].items.push(item);
            break;
          case 'fazendo':
            colunasAtualizadas['doing'].items.push(item);
            break;
          case 'aprovacao':
            colunasAtualizadas['inProgress'].items.push(item);
            break;
          case 'finalizado':
            colunasAtualizadas['done'].items.push(item);
            break;
          default:
            break;
        }
      });

      setColumns(colunasAtualizadas);
    };

    if (dadosKanban.length > 0) {
      distribuirItensNasColunas();
    }
  }, [dadosKanban]);

  const [columns, setColumns] = useState({
    toDo: { name: 'Pendente', items: [] },
    doing: { name: 'Fazendo', items: [] },
    inProgress: { name: 'Aprovação', items: [] },
    done: { name: 'Finalizado', items: [] },
  });

  const moveCard = ({ id, index, columnIndex, dragDistance }: any) => {
    if (Math.abs(dragDistance) > 100) {
      setColumns((prevColumns: any) => {
        const updatedColumns = { ...prevColumns };
        const sourceColumn = updatedColumns[Object.keys(updatedColumns)[columnIndex]];
        const sourceItems = [...sourceColumn.items];
        const [movedCard] = sourceItems.splice(index, 1);

        let destColumnIndex = columnIndex;
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
    <div className="flex min-h-screen flex-col items-center justify-between py-32">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 flex-col sm:flex-row sm:items-baseline">
        {Object.entries(columns).map(([columnName, column], colIndex) => (
          <div key={columnName} className="border-[#4E4563] bg-[#F2F2F2] rounded-lg px-2 py-2">
            <strong className="text-black text-xl ml-2">{column.name}</strong>
            <div>
              {column.items.map((card: any, index: any) => (
                <KanbanCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  Description={card.description}
                  finalDate={card.final_date}  
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
