const Navbar = () => {
  return (
    <nav className="bg-secondary text-fifth p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-4xl font-poppins font-bold">Stuition</div>
        <div className="hidden md:flex space-x-6">
            <a href="#section1" className="font-medium relative px-5 py-2 border border-black transition-transform duration-300 ease-out hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[5px_5px_0_rgba(0,0,0,1)]">Section 1</a>
            <a href="#section2" className="font-medium relative px-5 py-2 border border-black transition-transform duration-300 ease-out hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[5px_5px_0_rgba(0,0,0,1)]">Section 2</a>
            <a href="#section3" className="font-medium relative px-5 py-2 border border-black transition-transform duration-300 ease-out hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-[5px_5px_0_rgba(0,0,0,1)]">Section 3</a>
        </div>


        <button className="md:hidden p-2 text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
