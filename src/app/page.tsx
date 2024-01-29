import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="flex min-h-screen flex-col items-center justify-between py-32 px-4">
      <div className="grid grid-cols-4 z-10 gap-8">
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          <strong className="text-xl">
            To do
          </strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 cursor-grabbing'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          <strong className="text-xl">
            Doing
          </strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 text-lg cursor-grabbing'>
            Atualizar Bibliotecas
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          <strong className="text-xl">
            QA
          </strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 text-lg cursor-grabbing'>
          Atualizar Bibliotecas
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          <strong className="text-xl">
            Done
          </strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 text-lg cursor-grabbing'>
            Final Project: App Development
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
