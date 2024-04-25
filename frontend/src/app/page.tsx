'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanCard from '@/components/KanbanCard'; // Atualize o caminho conforme necessário

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

const Home = () => {
  const [dadosKanban, setDadosKanban] = useState<any[]>([]);

  useEffect(() => {
    const getDadosKanban = async () => {
      try {
        const response = await axios.get('http://localhost:4000/data-kanban');
        setDadosKanban(response.data);
      } catch (error: any) {
        console.error('Erro ao obter dados do Kanban:', error.message);
      }
    };

    getDadosKanban();
  }, []);

  useEffect(() => {
    // Distribui os itens nas colunas apropriadas com base no status
    const distribuirItensNasColunas = () => {
      const colunasAtualizadas: any = {};
      colunasAtualizadas['toDo'] = { name: 'To do', items: [] };
      colunasAtualizadas['doing'] = { name: 'Doing', items: [] };
      colunasAtualizadas['inProgress'] = { name: 'QA', items: [] };
      colunasAtualizadas['done'] = { name: 'Done', items: [] };

      dadosKanban.forEach((item) => {
        switch (item.status) {
          case 'toDo':
            colunasAtualizadas['toDo'].items.push(item);
            break;
          case 'doing':
            colunasAtualizadas['doing'].items.push(item);
            break;
          case 'inProgress':
            colunasAtualizadas['inProgress'].items.push(item);
            break;
          case 'done':
            colunasAtualizadas['done'].items.push(item);
            break;
          default:
            break;
        }
      });

      setColumns(colunasAtualizadas);
    };

    distribuirItensNasColunas();
  }, [dadosKanban]);

  const [columns, setColumns] = useState({
    toDo: { name: 'To do', items: [] },
    doing: { name: 'Doing', items: [] },
    inProgress: { name: 'QA', items: [] },
    done: { name: 'Done', items: [] },
  });

  const moveCard = ({ id, index, columnIndex, dragDistance }: any) => {
    // Verificar se o card foi arrastado horizontalmente para além de um limite mínimo
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
  const { setTheme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-32 px-32">
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 flex-col sm:flex-row sm:items-baseline">
        {Object.entries(columns).map(([columnName, column], colIndex) => (
          <div key={columnName} className="border-[#4E4563] bg-[#dbdbdb] rounded-lg px-2 py-2">
            <strong className="text-black text-xl ml-2">{column.name}</strong>
            <div>
              {column.items.map((card: any, index: any) => (
                <KanbanCard
                  key={card.id}
                  id={card.id}
                  title={card.title}
                  Description={card.Description}
                  finalDate={card.finalDate}
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
      <button className='text-black'>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      <button className='text-black border p-2 rounded-lg' onClick={() => setTheme("light")}>
          Light
      </button>
      <button className='text-black border p-2 rounded-lg' onClick={() => setTheme("dark")}>
        Dark
      </button>
      <button className='text-black border p-2 rounded-lg' onClick={() => setTheme("system")}>
        System
      </button>
    </div>
  );
};

export default Home;
