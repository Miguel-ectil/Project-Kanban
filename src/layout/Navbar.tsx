
export default function Header() {
  return (
    <div
      className='fixed top-0 z-50  w-full items-center justify-between bg-gradient-to-t from-transparent bg-slate-500 to-black p-2 px-4 transition-all lg:px-16 lg:py-4'
  >
    <button
        className="flex ustify-start gap-1.5 hover:bg-[#c8020288] bg-[#c80202a7] border-2 border-red-900 rounded-lg group cursor-pointer hover:shadow-lg m-5 text-white px-1 py-0.5"
    //   onClick={handleLogoutClick}
    >
        <strong>SAIR</strong>
    </button>
    </div>
  )
}