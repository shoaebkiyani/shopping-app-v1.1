import {useState} from 'react';

import logo from '../../assets/logo.svg'

import {AiOutlineClose, AiOutlineMenu, AiOutlineSearch} from 'react-icons/ai';
import {BsFillCartFill} from 'react-icons/bs'
import {TbTruckDelivery} from 'react-icons/tb'
import {FiSmartphone, FiLogIn} from 'react-icons/fi'
import {SiGnuprivacyguard} from 'react-icons/si'

function Navbar() {

  const [navState, setNavState] = useState(false);

  return (
    <nav className='max-w-[1640px] mx-auto flex justify-center align-middle p-4 h-14 bg-blue-900 md:space-x-20'>
        {/* Left side */}
        <div className='flex items-center xs:space-x-2 sm:space-x-2 md:space-x-20 lg:space-x-20'>
          <div className='flex items-center text-white'>
              <img src={logo} alt="logo" className='cursor-pointer h-8 w-8 mx-2' />
              <h1 className='cursor-pointer xs:hidden'><span className='bg-rose-600 text-black p-1 rounded-md'>Mobile</span> Store</h1>
          </div>

        {/* Search Input */}
        <div className='px-3 xs:w-[200px] sm:w-[300px] lg:w-[500px] flex rounded-full items-center  bg-gray-300'>
          <AiOutlineSearch size={20} />
          <input className='w-full focus:outline-none p-2 bg-transparent' type="text" placeholder='Search' />
        </div>

        {/* Cart */}
        <button className='text-white md:flex items-center rounded-full flex'>
          <BsFillCartFill size={20} className="mr-2" />
        </button>

        {/* Menu Bars */}
        <div onClick={()=> setNavState(!navState)} className="cursor-pointer text-white">
          <AiOutlineMenu size={30} />
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Overlay */}
      {navState ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 right-0'></div> : ''}
      
        {/* Side Drawer Menu */}
        <div className={navState ? 'fixed top-0 right-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300'}>
          <AiOutlineClose size={30} onClick={()=>setNavState(!navState)} className='absolute left-4 top-4 cursor-pointer' />
          <nav>
            <ul className='flex flex-col mt-14 mx-8 p-4 text-gray-800'>
              <li className='text-xl py-4 flex'><FiSmartphone size={25} className='mr-4' /> Mobile Phones</li>
              <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Orders</li>
              <li className='text-xl py-4 flex'><FiLogIn size={25} className='mr-4' />Login</li>
              <li className='text-xl py-4 flex'><SiGnuprivacyguard size={25} className='mr-4' />Register</li>
            </ul>
          </nav>
        </div>
    </nav>
  )
}
export default Navbar