import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [openedMenu, setOpenedMenu] = useState(false)
  const toggleMenu = () => setOpenedMenu(!openedMenu)
  return (
    <nav className="bg-blue-500 p-6 fixed w-full">
      <div className="container flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/">
            <span className="font-semibold text-xl tracking-tight">Order App</span>
          </Link>
        </div>
        <div className="block lg:hidden" onClick={toggleMenu}>
          <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white focus:outline-none">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
          </button>
        </div>
        <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto  ${openedMenu ? '' : 'hidden'}`}>
          <div className="text-sm lg:flex-grow">
          </div>
          <div>
            <Link to="/order">
              <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0">History Order</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar