// components/Testimonials.js

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiaGavelSolid } from 'react-icons/lia';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { dataSite } from '@/data';

// La data que proporcionaste
const references = dataSite.references;

// Función para obtener las iniciales de un nombre
const getInitials = (name) => {
  const words = name.split(' ');
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // Navegación con bucle: si llega al final, vuelve al principio, y viceversa.
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % references.length);
  };

  const handlePrev = () => {
    setIndex(
      (prevIndex) => (prevIndex - 1 + references.length) % references.length
    );
  };

  // Determina qué testimonios mostrar. Mostramos uno a la vez para máxima compatibilidad.
  const currentTestimonial = references[index];

  const variants = {
    enter: {
      x: 100,
      opacity: 0,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      x: -100,
      opacity: 0,
    },
  };

  return (
    <section className='bg-white py-20 lg:py-28'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center mb-4'>
          <div>
            <div className='flex items-center space-x-2 text-sm text-gray-600 mb-2'>
              <span className='text-red-600'>
                <LiaGavelSolid />
              </span>
              <span>Testimonials</span>
            </div>
            <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 leading-tight'>
              Don&apos;t take our word for it!
              <br />
              Hear it from our clients.
            </h2>
          </div>
          <div className='hidden sm:flex items-center space-x-2'>
            <button
              onClick={handlePrev}
              className='p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
              aria-label='Previous testimonial'
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className='p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors'
              aria-label='Next testimonial'
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor del carrusel */}
      <div className='relative mt-12 h-96 flex items-center justify-center overflow-hidden'>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className='w-full max-w-2xl mx-auto px-4 absolute'
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className='bg-slate-50 p-8 rounded-lg shadow-sm text-center'>
              <div className='flex justify-center mb-4'>
                {currentTestimonial.image ? (
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className='w-16 h-16 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold'>
                    {getInitials(currentTestimonial.name)}
                  </div>
                )}
              </div>
              <blockquote className='text-gray-700 italic'>
                &quot;{currentTestimonial.description}&quot;
              </blockquote>
              <p className='mt-6 font-bold text-gray-900'>
                {currentTestimonial.name}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navegación para móviles */}
      <div className='sm:hidden flex justify-center items-center space-x-4 mt-8'>
        <button
          onClick={handlePrev}
          className='p-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors'
          aria-label='Previous testimonial'
        >
          <FiChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className='p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors'
          aria-label='Next testimonial'
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
