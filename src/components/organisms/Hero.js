// components/HeroSection.js

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';
import { FaArrowRight, FaPlus } from 'react-icons/fa';

// Importa la imagen desde tu carpeta public
import { dataSite } from '@/data';

const HeroSection = () => {
  // Variantes de animación para el contenedor de texto (anima a sus hijos en secuencia)
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre la animación de cada hijo
      },
    },
  };

  // Variantes para los elementos de texto (aparecen desde abajo)
  const textItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  // Variantes para los iconos de cruz (aparecen con un efecto de escala)
  const crossVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -45 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className='bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-12 md:py-24'>
        {/* --- Columna de Texto (Izquierda) --- */}
        <motion.div
          className='flex flex-col justify-center text-center md:text-left'
          variants={textContainerVariants}
          initial='hidden'
          animate='visible'
        >
          <motion.h1
            className='text-4xl lg:text-6xl font-bold text-gray-800 leading-tight'
            variants={textItemVariants}
          >
            {dataSite.subtitle}
          </motion.h1>
          <motion.p
            className='mt-4 text-gray-600 max-w-md mx-auto md:mx-0'
            variants={textItemVariants}
          >
            {dataSite.description}
          </motion.p>

          <motion.div
            className='mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start'
            variants={textItemVariants}
          >
            <a
              href='/more-information'
              className='inline-flex items-center justify-center px-6 py-4 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition-colors'
            >
              <FiPhone className='mr-2' />
              Contact us now
            </a>
            <a
              href='#about'
              className='inline-flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-colors'
            >
              Know us
              <FaArrowRight className='ml-2 text-red-500' size={12} />
            </a>
          </motion.div>
        </motion.div>

        {/* --- Columna de Imagen (Derecha) --- */}
        <motion.div
          className='relative w-full h-80 md:h-full'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src={dataSite.image_hero}
            alt='Paramedic team responding to an emergency'
            layout='fill'
            objectFit='cover'
            className='rounded-lg'
            priority // Carga la imagen de manera prioritaria por ser parte del "hero"
          />
          {/* Iconos de cruz superpuestos y animados */}
          <motion.div
            className='absolute top-5 right-16 text-red-500'
            variants={crossVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 0.8 }}
          >
            <FaPlus size={24} />
          </motion.div>
          <motion.div
            className='absolute top-1/2 right-5 text-red-500'
            variants={crossVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.0 }}
          >
            <FaPlus size={16} />
          </motion.div>
          <motion.div
            className='absolute bottom-10 left-5 text-red-500'
            variants={crossVariants}
            initial='hidden'
            animate='visible'
            transition={{ delay: 1.2 }}
          >
            <FaPlus size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
