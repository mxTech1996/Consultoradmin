// components/InteractiveServices.js

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaGavelSolid } from 'react-icons/lia';
import { FaArrowRight } from 'react-icons/fa';
import { dataSite } from '@/data';

// Datos de los servicios para mantener el código limpio
const legalServices = dataSite.services;

const InteractiveServices = () => {
  // 'hoveredIndex' guarda el índice del servicio sobre el que se está haciendo hover
  // Se inicializa en 'null' porque al principio no hay ninguno.
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const descriptionVariants = {
    hidden: { opacity: 0, height: 0, y: 10, marginTop: '0px' },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      marginTop: '0.5rem', // Corresponde a 'mt-2' en Tailwind
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: 10,
      marginTop: '0px',
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
  };

  return (
    <section id='services' className='bg-white py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          className='flex items-center space-x-2 text-sm text-gray-600 mb-12'
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <span className='text-red-600'>
            <LiaGavelSolid />
          </span>
          <span>We provide a comprehensive range of legal services.</span>
        </motion.div>

        <div className='space-y-4'>
          {legalServices.map((service, index) => (
            <div
              key={index}
              className='border-b border-gray-200'
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className='flex justify-between items-start py-6'>
                <img
                  src={service.image}
                  alt={service.title}
                  className='w-24 h-24 object-cover rounded-lg mb-4 mr-20'
                />
                <div className='flex-1 pr-8'>
                  {/* image */}

                  <h3 className='text-2xl lg:text-3xl font-bold text-gray-900'>
                    {service.title}
                  </h3>

                  {/* AnimatePresence permite animar la salida de un componente */}
                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.p
                        className='text-gray-600 overflow-hidden'
                        variants={descriptionVariants}
                        initial='hidden'
                        animate='visible'
                        exit='exit'
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <a
                  href='#learn-more'
                  className='flex items-center space-x-3 px-6 py-3 bg-gray-100 rounded-full text-gray-800 font-semibold transition-colors hover:bg-gray-200'
                >
                  {/* <span>Learn more</span> */}
                  <span className='text-red-500'>
                    <FaArrowRight size={12} />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveServices;
