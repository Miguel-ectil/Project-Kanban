// NewCard.js
'use client'
import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RxValue } from 'react-icons/rx';

export default function NewCard({ onClose }: any) {
  const cancelButtonRef = useRef(null);
  const [priority, setPriority] = useState("")

  const priorityValue = (value: any) => {
    setPriority(value)
    // console.log(priority)
  }

  useEffect(() => {
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                        <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="username">
                          Task title
                        </label>
                        <input 
                          type="text" 
                          placeholder='Digite aqui o titulo da task'
                          className='border p-2 rounded-lg flex w-full'
                        />
                        <label className="block text-gray-700 text-xs font-bold mb-1 mt-2" htmlFor="Descrição">
                          Description
                        </label>
                        <textarea 
                          name="Descrição"
                          id=""
                          className='border p-2 rounded-lg w-full'
                          placeholder='Digite a descrição'
                          // cols="46" rows="2"
                        >

                        </textarea>
                        <div className='flex justify-between'>
                          <div>
                            <label 
                              className="block text-gray-700 text-sm font-bold mb-1 mt-2" 
                              htmlFor="Descrição"
                            >
                              Final date
                            </label>
                            <input 
                              type="date" 
                              placeholder='Selecione a data de entrega'
                              className='text-xs border p-2 rounded-lg flex w-[14rem] '
                            />
                          </div>
                          <div>
                            <p className='text-xs mt-3.5 mb-1'>Priority</p>
                            <div className='flex space-x-3'>
                              <button className="px-4 py-1 border rounded-2xl text-xs border-[#FF7979] text-[#FF7979] hover:bg-[#FF7979] hover:text-[#FFFF]" onClick={() => priorityValue("HIGH")}>
                                HIGH
                              </button>
                              <button className="px-4 py-1 border rounded-2xl text-xs border-[#FFBA53] text-[#FFBA53] hover:bg-[#FFBA53] hover:text-[#FFFF]" onClick={() => priorityValue("MEDIUM")}>
                                MEDIUM
                              </button>
                              <button className="px-4 py-1 border rounded-2xl text-xs border-[#2BA700] text-[#2BA700] hover:bg-[#2BA700] hover:text-[#FFFF]" onClick={() => priorityValue("LOW")}>
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
                    // onClick={onClose} 
                  >
                    CREATE
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl px-8 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto border border-red-600"
                    onClick={onClose} // Chame a função onClose ao clicar no botão "Cancelar"
                    ref={cancelButtonRef}
                  >
                    CANCEL
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
