// NewCard.js
'use client'
import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function NewCard({ onClose }: any) {
  const cancelButtonRef = useRef(null);

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h1" className="text-base font-semibold leading-6 text-[#48409E]">
                        New Card
                      </Dialog.Title>
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
                          Titulo da task
                        </label>
                        <input 
                          type="text" 
                          placeholder='Digite aqui o titulo da task'
                          className='border p-2 rounded-lg flex w-full'
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="Descrição">
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
                        <label className="block text-gray-700 text-sm font-bold mb-1 mt-2" htmlFor="Descrição">
                          Data Final
                        </label>
                        <div className='flex space-x-16'>
                          <input 
                            type="date" 
                            placeholder='Selecione a data de entrega'
                            className='border p-2 rounded-lg flex '
                          />
                          <div>
                            <div className='flex space-x-2 mt-2'>
                              <p className="p-2 border rounded-3xl text-sm text-gray-500">
                                HIGH
                              </p>
                              <p className="p-2 border rounded-3xl text-sm text-gray-500">
                                MEDIUM
                              </p>
                              <p className="p-2 border rounded-3xl text-sm text-gray-500">
                                LOW
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-3xl bg-[#48409E] px-12 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#554cb4] sm:ml-3 sm:w-auto"
                    // onClick={onClose} 
                  >
                    CRIAR
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-3xl px-6 py-2 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset sm:mt-0 sm:w-auto border border-red-600"
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
