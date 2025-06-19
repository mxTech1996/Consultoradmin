'use client';

import { MdKeyboardArrowDown } from 'react-icons/md';
import { BsCart } from 'react-icons/bs';
import { FiPhone } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { dataSite } from '@/data';
import { useCart } from 'ecommerce-mxtech';

const Navbar = () => {
  const { products } = useCart();
  return (
    <header className='w-full bg-white'>
      {/* Barra superior con la dirección */}
      <div className='border-b'>
        <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-end py-2'>
            <p className='text-sm text-red-600'>{dataSite.address}</p>
          </div>
        </div>
      </div>

      {/* Barra de navegación principal */}
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          {/* Sección de Emergencia */}
          <div className='flex items-center space-x-4'>
            <div className='flex items-center space-x-1'>
              <span className='text-red-600'>
                <FaPlus size={10} />
              </span>
              {/* <span className='font-bold text-gray-800'>EMERGENCY</span> */}
            </div>
            <div className='hidden md:flex items-center'>
              <p className='text-sm text-gray-600'>
                <a href='tel:3165550116' className='text-red-600 font-medium'>
                  {dataSite.telephone}
                </a>
              </p>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className='hidden lg:flex items-center space-x-6 text-gray-700'>
            <a
              href='/#testimonials'
              className='flex items-center hover:text-red-600'
            >
              Testimonials
            </a>
            <a href='/#about' className='flex items-center hover:text-red-600'>
              About us
            </a>
            <a href='/#services' className='hover:text-red-600'>
              Services
            </a>
            <a href='/#products' className='hover:text-red-600'>
              Products
            </a>
          </div>

          {/* Iconos y Botón de Contacto */}
          <div className='flex items-center space-x-5'>
            <a href='/my-cart' className='flex items-center text-gray-700'>
              <BsCart size={20} />
              <span className='ml-1'>({products.length})</span>
            </a>
            <a
              href='/more-information'
              className='flex items-center px-5 py-3 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-700 transition-colors'
            >
              <FiPhone size={16} className='mr-2' />
              Contact us
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
