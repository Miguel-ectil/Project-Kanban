// NewCard.js
'use client'
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';


export default function NewCard({ onClose }: any) {
  const cancelButtonRef = useRef(null);
  const [titleTask, setTitleTask] = useState("")
  const [description, setDescription] = useState("")
  const [finalDate, setFinalDate] = useState("")
  const [priority, setPriority] = useState("LOW")
  const [errors, setErrors] = useState({ title: "", description: "", finalDate: "" });

  const priorityValue = (value: string) => {
    setPriority(value)
  }

  const validateForm = () => {
    let newErrors = { title: "", description: "", finalDate: "" };
    
    if (!titleTask.trim()) newErrors.title = "O título é obrigatório.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (!finalDate) newErrors.finalDate = "A data final é obrigatória.";
  
    setErrors(newErrors);
  
    return Object.values(newErrors).every((error) => error === "");
  };

  const postCrateTask = async () => {
    try {
      if (validateForm()) {
        const data = {
          title: titleTask,
          description: description,
          finalDate: finalDate,
          priority: priority
        };
        const response = await axios.post('http://localhost:4000/create-task', data);
      
        console.log('Tarefa criada com sucesso:', response.data);
      }
    } catch (error: any) {
      console.log('Erro ao criar nova Tarefa', error.message)
    }
  }

  useEffect(() => {
    // console.log(titleTask, '\n', description, '\n', finalDate)
    console.log(priority); // Será executado sempre que priority for alterado
  }, [priority]);

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
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

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
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
                          value={titleTask}
                          onChange={(e) => setTitleTask(e.target?.value)}
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
                          value={description}
                          onChange={(e) => setDescription(e.target?.value)}
                          className='border p-2 rounded-lg w-full text-black bg-white'
                          placeholder='Digite a descrição'
                          // cols="46" rows="2"
                        >
                        </textarea>
                        {errors.description && <p className="text-red-500 text-xs ml-1">{errors.description}</p>}

                        <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
                          <div className="mb-4 md:mb-0">
                            <label 
                              className="block text-gray-700 text-sm font-bold mb-1 mt-2" 
                              htmlFor="Descrição"
                            >
                              Data final 
                            </label>
                            <div className="relative w-[16rem]">
                            <input
                              value={finalDate}
                              onChange={(e) => setFinalDate(e.target?.value)}
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
                                  ${priority === "HIGH" ? "bg-[#FF7979] text-white" : ""}`
                                }
                                onClick={() => priorityValue("HIGH")}>
                                HIGH
                              </button>
                              <button 
                                type='button'
                                className={`px-4 py-1 border rounded-2xl text-xs
                                 border-[#FFBA53] text-[#FFBA53] hover:bg-[#FFBA53] hover:text-[#FFFF]
                                  ${priority === "MEDIUM" ? "bg-[#FFBA53] text-white" : ""}`
                                }
                                onClick={() => priorityValue("MEDIUM")}>
                                MEDIUM
                              </button>
                              <button 
                                type='button'
                                className={`px-4 py-1 border rounded-2xl text-xs
                                 border-[#2BA700] text-[#2BA700] hover:bg-[#2BA700] hover:text-[#FFFF]
                                 ${priority === "LOW" ? "bg-[#2BA700] text-white" : ""}`
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
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-3xl bg-[#48409E] px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#554cb4] sm:ml-4 sm:w-auto"
                    onClick={postCrateTask} 
                  >
                    CRIAR
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl px-8 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto border 
                    hover:bg-red-100 border-red-600"
                    onClick={onClose} // Chame a função onClose ao clicar no botão "Cancelar"
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
  );
}
