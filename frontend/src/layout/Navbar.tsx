'use client'
import React, { useState } from 'react';
import NewCard from '@/components/newCard';
import Image from 'next/image';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className='fixed flex w-full items-center justify-between bg-gradient-to-t from-transparent bg-[#48409E] px-4'>
      <Image 
        width={70} height={70} 
        src='/3d_avatar_21.svg' alt={'meu logo'}
        className='mt-1 mb-1 ml-2.5'
      >
      </Image>
      <button
        className="flex hover:bg-[#aea7f3] bg-[#BFB9FF]  border-[#BFB9FF] rounded-lg cursor-pointer hover:shadow-lg mr-2 text-white px-2.5 py-2"
        onClick={handleNewCardClick}
      >
        <strong>+ Novo Card</strong>
      </button>
      {isModalOpen && <NewCard onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
