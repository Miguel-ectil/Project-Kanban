import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-4 z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          TO do
          <div className='border bg-red-800 rounded-lg px-4 py-2'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          Doing
          <div className='border bg-red-800 rounded-lg px-4 py-2'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          QA
          <div className='border bg-red-800 rounded-lg px-4 py-2'>
            Testar Navegadores
          </div>
        </div>
        <div className='border bg-[#F2F2F2] rounded-lg px-4 py-2'>
          Done
          <div className='border bg-red-800 rounded-lg px-4 py-2'>
            Testar Navegadores
          </div>
        </div>
      </div>
    </main>
  );
}
