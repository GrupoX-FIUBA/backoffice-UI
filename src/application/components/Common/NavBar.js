import React from 'react'

const NavBar = ({ handlerMenu }) => {
  return (
    <header className="grid grid-cols-12 fixed top-0 w-screen z-20 md:py-2 bg-black">

      <div className="col-span-7 md:col-span-4 col-start-1 text-white pl-4">
        <svg onClick={() => handlerMenu()} xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <img src="./logo.png" className="inline-block my-4 md:my-0 h-9" alt=""/>
      </div>

    </header>
  );
}

export default NavBar;