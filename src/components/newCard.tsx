'use client'
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Message from '@/context/ToastContext';

interface NewCardProps {
  onClose: () => void;
  id?: string;
  titleTask?: string;
  description?: string;
  finalDate?: string;
  priority?: string;
}
export default function NewCard({ onClose, id, titleTask, description, finalDate, priority }: NewCardProps) {
  const cancelButtonRef = useRef(null);
  const [idTask, setIdTask] = useState(id);
  const [title, setTitle] = useState(titleTask || ''); 
  const [desc, setDesc] = useState(description || ''); 
  const [date, setDate] = useState(finalDate || ''); 
  const [taskPriority, setTaskPriority] = useState(priority || 'LOW');
  const [status, setStatus] = useState("pendente");
  const [errors, setErrors] = useState({ title: "", description: "", finalDate: "" });
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  const priorityValue = (value: string) => {
    setTaskPriority(value);
  };

  const validateForm = () => {
    let newErrors = { title: "", description: "", finalDate: "" };
    
    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!desc.trim()) newErrors.description = "A descrição é obrigatória."; 
    if (!date) newErrors.finalDate = "A data final é obrigatória.";
  
    setErrors(newErrors);
  
    return Object.values(newErrors).every((error) => error === "");
  };

  const postCreateTask = async () => {
    try {
      if (validateForm()) {
        const data = {
          title: title,
          description: desc,
          finalDate: date, 
          priority: taskPriority, 
        };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.post(`${apiUrl}/create-task`, data);

          setMessage('Tarefa cadastrada com sucesso!');
          setMessageType('success');
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
      }
    } catch (error: any) {
      setMessage('Houve alguma falha ao tentar cadastrar a tarefa!');
      setMessageType('error')
    } finally {
      setTimeout(() => {
        onClose();
      }, 1000)
    }
  };
  
  const PutEditTask = async () => {
    try {
      if (validateForm()) {
        const data = {
          title: title,
          description: desc,
          finalDate: date, 
          priority: taskPriority, 
        };
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.put(`${apiUrl}/update-task/${idTask}`, data);
      
        // setMessage('Tarefa atualizada com sucesso!');
        // setMessageType('success')
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error: any) {
      console.log(error)
      // setMessage('Houve alguma falha ao tentar atualizar a tarefa!');
      // setMessageType('error')
    } finally {
      setTimeout(() => {
        onClose();
      }, 4000)
    }
  };

  return (
    <>
    {message && <Message type={messageType} message={message} />}
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="flex h-full items-center justify-center text-center sm:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className=""> {/*sm:flex sm:items-start*/}
                    <div className="mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h1" className="text-2xl font-semibold leading-6 text-[#48409E]">
                        New Card
                      </Dialog.Title>
                      <div className="mt-6">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                          Título da task
                        </label>
                        <input 
                          value={title}
                          onChange={(e) => setTitle(e.target?.value)}
                          type="text"
                          required
                          placeholder='Digite aqui o título da task'
                          className='border p-2 rounded-lg flex w-full text-black bg-white'
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.title}</p>}

                        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="Descrição">
                          Descrição
                        </label>
                        <textarea 
                          name="Descrição"
                          id="Descrição"
                          aria-required
                          value={desc}
                          onChange={(e) => setDesc(e.target?.value)}
                          className='border p-2 rounded-lg w-full text-black bg-white'
                          placeholder='Digite a descrição'
                        />
                        {errors.description && <p className="text-red-500 text-xs ml-1">{errors.description}</p>}

                        <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
                          <div className="mb-4 md:mb-0">
                            <label 
                              className="block text-gray-700 text-sm font-bold mb-1 mt-2" 
                              htmlFor="Descrição"
                            >
                              Data final 
                            </label>
                            <div className="relative w-[18rem]">
                            <input
                              value={date}
                              onChange={(e) => setDate(e.target?.value)}
                              type="date"
                              required
                              className="text-sm text-black border p-2 rounded-lg w-full bg-white px-2.5 appearance-none"
                            />
                            <img
                              src="/icons/Vector.svg"
                              alt="Ícone de calendário"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                            />
                          </div>
                          {errors.finalDate && <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.finalDate}</p>}
                          </div>
                          <div className='mt-4'>
                            <p className='text-xs text-black mb-1'>Priority</p>
                            <div className='space-x-3'>
                              <button
                                type='button'
                                className={`px-4 py-1 border rounded-2xl text-xs
                                 border-[#FF7979] text-[#FF7979] hover:bg-[#FF7979] hover:text-[#FFFF] 
                                  ${taskPriority === "HIGH" ? "bg-[#FF7979] text-white" : ""}` // Corrigido para `taskPriority`
                                }
                                onClick={() => priorityValue("HIGH")}>
                                HIGH
                              </button>
                              <button 
                                type='button'
                                className={`px-4 py-1 border rounded-2xl text-xs
                                 border-[#FFBA53] text-[#FFBA53] hover:bg-[#FFBA53] hover:text-[#FFFF]
                                  ${taskPriority === "MEDIUM" ? "bg-[#FFBA53] text-white" : ""}` // Corrigido para `taskPriority`
                                }
                                onClick={() => priorityValue("MEDIUM")}>
                                MEDIUM
                              </button>
                              <button 
                                type='button'
                                className={`px-4 py-1 border rounded-2xl text-xs
                                 border-[#2BA700] text-[#2BA700] hover:bg-[#2BA700] hover:text-[#FFFF]
                                 ${taskPriority === "LOW" ? "bg-[#2BA700] text-white" : ""}` // Corrigido para `taskPriority`
                                } 
                                onClick={() => priorityValue("LOW")}>
                                LOW
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-2.5 sm:flex sm:flex-row-reverse sm:px-6">
                  {idTask ? (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-3xl bg-[#2BA700] px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#41832b] sm:ml-4 sm:w-auto transition hover:scale-90"
                      onClick={PutEditTask} 
                    >
                      Editar
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-3xl bg-[#48409E] px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#554cb4] sm:ml-4 sm:w-auto transition hover:scale-90"
                      onClick={postCreateTask}
                    >
                      CRIAR
                    </button>
                  )}

                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl px-8 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto border 
                    hover:bg-red-100 border-red-600 transition hover:scale-90"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    CANCELAR
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
    </>
  );
}
