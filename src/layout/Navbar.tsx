// Header.js
'use client'
import React, { useState } from 'react';
import NewCard from '@/components/newCard';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='fixed flex w-full items-center justify-end bg-gradient-to-t from-transparent bg-[#48409E]  '>
      <button
        className="flex hover:bg-[#aea7f3] bg-[#BFB9FF]  border-[#BFB9FF] rounded-lg cursor-pointer hover:shadow-lg m-5 text-white px-2 py-2"
        onClick={handleNewCardClick}
      >
        <strong>+ Novo Card</strong>
      </button>
      {isModalOpen && <NewCard onClose={() => setIsModalOpen(true)} />}
    </div>
  );
}
