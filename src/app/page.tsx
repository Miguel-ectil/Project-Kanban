import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          <strong>To do</strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 cursor-grabbing'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
        <strong>Doing</strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 cursor-grabbing'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
        <strong>QA</strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 cursor-grabbing'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
        <strong>Done</strong>
          <div className='border bg-[#FFFFFF] rounded-lg px-4 py-2 cursor-grabbing'>
            Testar Navegadores
          </div>
        </div>
      </div>
    </main>
  );
}
