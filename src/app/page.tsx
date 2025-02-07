'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import KanbanCard from '@/components/KanbanCard';
import { motion } from 'framer-motion';
import Message from '@/context/ToastContext';
import Cookies from 'js-cookie';

type ColumnType = {
  name: string;
  items: any[];
};

const Home = () => {
  const [dadosKanban, setDadosKanban] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); 
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const [columns, setColumns] = useState<{
    pendente: ColumnType;
    fazendo: ColumnType;
    aprovacao: ColumnType;
    finalizado: ColumnType;
  }>({
    pendente: { name: 'Fazer', items: [] },
    fazendo: { name: 'Fazendo', items: [] },
    aprovacao: { name: 'Aprovação', items: [] },
    finalizado: { name: 'Feito', items: [] },
  });

  const getDadosKanban = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/tasks`);
  
        if (response.data.length === 0) {
          setMessage("Nenhuma tarefa encontarda.\n por favor comece cadastrando uma tarefa.");
          setMessageType("info");
        } else {
          setDadosKanban(response.data);
          setLoading(false)
          setMessage(""); 
        }
    } catch (error: any) {
      setMessage("Houve uma falha ao tentar trazer as tarefas!");
      setMessageType("error");
    } 
  };

  useEffect(() => {
    getDadosKanban();
  }, []);

  useEffect(() => {
    if (dadosKanban.length > 0) {
      const colunasAtualizadas: any = {
        pendente: { name: 'Fazer', items: [] },
        fazendo: { name: 'Fazendo', items: [] },
        aprovacao: { name: 'Aprovação', items: [] },
        finalizado: { name: 'Feito', items: [] },
      };

      dadosKanban.forEach((item) => {
        switch (item.status) {
          case 'pendente':
            colunasAtualizadas.pendente.items.push(item);
            break;
          case 'fazendo':
            colunasAtualizadas.fazendo.items.push(item);
            break;
          case 'aprovacao':
            colunasAtualizadas.aprovacao.items.push(item);
            break;
          case 'finalizado':
            colunasAtualizadas.finalizado.items.push(item);
            break;
          default:
            break;
        }
      });

      setColumns(colunasAtualizadas);
    }
  }, [dadosKanban]);

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, index) => (
      <motion.div
        key={index}
        className="bg-gray-300 animate-pulse rounded-lg p-4 h-24 my-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      />
    ));
  };
 
  const moveCard = async ({ id, index, columnIndex, dragDistance }: any) => {
    console.log("Movendo card", { id, index, columnIndex, dragDistance });
  
    const columnNames: ('pendente' | 'fazendo' | 'aprovacao' | 'finalizado')[] = ['pendente', 'fazendo', 'aprovacao', 'finalizado'];
    const currentColumn = columnNames[columnIndex];
  
    let newStatus = "";
    if (dragDistance > 100 && columnIndex < columnNames.length - 1) {
      newStatus = columnNames[columnIndex + 1];
    } else if (dragDistance < -100 && columnIndex > 0) {
      newStatus = columnNames[columnIndex - 1];
    } else {
      return; // Se não houver mudança válida, sai da função
    }
  
    const updatedColumns = { ...columns };
    const itemToMove = updatedColumns[currentColumn].items.splice(index, 1)[0];
  
    updatedColumns[newStatus as keyof typeof columns].items.push({ ...itemToMove, status: newStatus });
  
    console.log("Tarefa movida:", { id: itemToMove.id, status: newStatus });
  
    // Atualiza a lista de tarefas no cookie
    const savedTasks = JSON.parse(Cookies.get('kanbanTasks') || '[]');
    const updatedTasks = [
      ...savedTasks.filter((task: any) => task.id !== itemToMove.id),
      { id: itemToMove.id, status: newStatus }
    ];
    Cookies.set('kanbanTasks', JSON.stringify(updatedTasks), { expires: 7 });
  
    setColumns(updatedColumns);
  
    try {
      const data = { 
        status: newStatus
      };
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      await axios.put(`${apiUrl}/update-task/${itemToMove.id}`, data);
  
      console.log("Status atualizado no backend:", { id, newStatus });
    } catch (error) {
      console.error("Erro ao atualizar status no backend:", error);
      setMessage("Falha ao atualizar a tarefa no servidor.");
      setMessageType("error");
    }
  };
  
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-24 w-full">
      {message && <Message type={messageType} message={message} />}
      <motion.div
        className="grid w-full  sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {Object.entries(columns).map(([columnName, column], colIndex) => (
          <motion.div
            key={columnName}
            className="border-[#4E4563] bg-[#F2F2F2] rounded-lg px-4 py-4 w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1.5, scale: 1 }}
            transition={{ duration: 0.3, delay: colIndex * 0.2 }}
          >
            <strong className="text-black text-xl ml-2">{column.name}</strong>
            <div>
              {loading
                ? renderSkeletons()
                : column.items.map((card: any, index: any) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <KanbanCard
                        id={card.id}
                        title={card.title}
                        Description={card.description}
                        finalDate={card.final_date}
                        priority={card.priority}
                        index={index}
                        columnIndex={colIndex}
                        moveCard={moveCard}                    
                    />
                    </motion.div>
                  ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
